"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Complaint, School, School_Access, Child, Guardian, Black_list
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token,jwt_required,get_jwt_identity

api = Blueprint('api', __name__)


@api.route("/token", methods=["POST"])
def create_token():
    if request.json is None:
        return jsonify({"msg": "Body Empty!"}), 401
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        raise APIException("User Not Found!")
    data = School_Access.query.filter_by(user_id=user.id)
    roles = [{"school_id":sa.school_id, "role":sa.role} for sa in data]
    if not roles:
        roles = [{"role":None}]
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id, "roles":roles})

@api.route("/user", methods=["POST"])
def create_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User(email=email, password=password)
    db.session.add(user)
    db.session.commit()
    access_token = create_access_token(identity=user.id)
    return jsonify({**user.serialize(),"token":access_token,"roles":[{"role":None}]})

@api.route("/guardian", methods=["POST"])
@jwt_required()
def create_guardian():
    current_user_id=get_jwt_identity()
    user = User.query.get(current_user_id)
    check_guardian=Guardian.query.filter_by(user_id=current_user_id).first()
    if check_guardian is not None:
        raise APIException("Guardian Already Established!")
    first_name = request.json.get("firstName", None)
    last_name = request.json.get("lastName", None)
    seats_available = request.json.get("seats_available",None)
    payment_info = request.json.get("payment_info",None)
    address = request.json.get("address", None)
    phone = request.json.get("phone", None)
    guardian = Guardian(user_id=current_user_id,first_name=first_name, last_name=last_name, seats_available= seats_available,payment_info=payment_info, address=address, phone=phone)
    db.session.add(guardian)
    db.session.commit()
    return jsonify(guardian.serialize())

@api.route("/child", methods=["POST"])
@jwt_required()
def create_child():
    current_user_id=get_jwt_identity()
    user = User.query.get(current_user_id)
    guardian = Guardian.query.filter_by(user_id=current_user_id).first()
    if guardian is None:
        raise APIException ("Please register as a guardian first!")
    print(guardian.first_name,guardian.last_name)
    first_name = request.json.get("firstName", None)
    last_name = request.json.get("lastName", None)
    class_grade = request.json.get("classGrade",None)
    gender = request.json.get("gender",None)
    phone = request.json.get("phone", None)
    child = Child(first_name=first_name, last_name=last_name,class_grade=class_grade,gender=gender,phone=phone)
    db.session.add(child)
    added_child = Child.query.filter_by(first_name=first_name, last_name=last_name,class_grade=class_grade,gender=gender,phone=phone).first()
    if added_child is None:
        raise APIException ("Failed to add child!")
    print(added_child)
    guardian.children.append(added_child)
    db.session.add(guardian)
    db.session.commit()
    return jsonify(child.serialize()),200

@api.route("/guardian", methods=["GET"])
@jwt_required()
def get_self_guardian():
    current_user_id=get_jwt_identity()
    guardian = Guardian.query.filter_by(user_id=current_user_id).first()
    if guardian is None:
        raise APIException ("No Guardian Found")
    guardian = guardian.serialize()
    return jsonify(guardian)

@api.route("/child", methods=["GET"])
@jwt_required()
def get_children():
    current_user_id=get_jwt_identity()
    guardian = Guardian.query.filter_by(user_id=current_user_id).first()
    if guardian is None:
        raise APIException ("No Guardian Found")
    guardian = guardian.serialize()
    children = guardian["children"]
    if children is None:
        raise APIException ("No Children Found")
    return jsonify(children)


@api.route("/school/access", methods=["POST"])
@jwt_required()
def create_school_access():
    current_user_id=get_jwt_identity()
    user = User.query.get(current_user_id)
    guardian = Guardian.query.filter_by(user_id=current_user_id).first()
    if guardian is None:
        raise APIException("Register as a guardian before applying to school!")
    requested_school = request.json.get("schoolName", None)
    school = School.query.filter_by(school_name=requested_school).first()
    if school is None:
        raise APIException("School Does Not Exist!")
    check_access_true = School_Access.query.filter_by(user_id=current_user_id,accepted=True).first()
    if check_access_true is not None:
        raise APIException("You already belong to that school")
    check_access_false = School_Access.query.filter_by(user_id=current_user_id,accepted=False).first()
    if check_access_false is not None:
        raise APIException("You have a pending request, please be patient")
    school_access = School_Access(user_id=current_user_id,school_id=school.id,role="guardian")
    db.session.add(school_access)
    db.session.commit()
    return jsonify(school_access.serialize())

@api.route("/school_access/pending", methods=["GET"])
@jwt_required()
def get_pending_requests():
    current_user_id=get_jwt_identity()
    user = User.query.get(current_user_id)
    check_admin = School_Access.query.filter_by(user_id=current_user_id,role="admin").first()
    if check_admin is None:
        raise APIException("You Do Not Have Admin Rights!")
    requested_school = check_admin.school_id
    school_access_list = School_Access.query.filter_by(school_id=requested_school,accepted=False)
    pending_requests = []
    for items in school_access_list:
        if items is not None:
            items.serialize()
            pending_requests.append(items.serialize())
    people_requesting=[]
    for people in pending_requests:
        guardian = Guardian.query.filter_by(user_id=people["user_id"]).first()
        if guardian is not None:
            people_requesting.append({"first_name":guardian.first_name, "last_name":guardian.last_name,"phone":guardian.phone})
    if not people_requesting:
        return("You have no pending requests!")
    return jsonify(people_requesting)


@api.route("/school_access/accept", methods=["PUT"])
@jwt_required()
def accept_school_access():
    current_user_id=get_jwt_identity()
    user = User.query.get(current_user_id)
    check_admin = School_Access.query.filter_by(user_id=current_user_id,role="admin").first()
    if check_admin is None:
        raise APIException("You Do Not Have Admin Rights!")
    guardian_phone = request.json.get("phone", None)
    guardian = Guardian.query.filter_by(phone=guardian_phone).first()
    access_request = School_Access.query.filter_by(user_id=guardian.user_id).first()
    access_request.accepted=True
    db.session.add(access_request)
    db.session.commit()
    return ("Guardian Access Succesfully Granted")


@api.route("/user/schools", methods=["GET"])
@jwt_required()
def get_schools():
    current_user_id=get_jwt_identity()
    user = User.query.get(current_user_id)
    user_access = School_Access.query.filter_by(user_id=user.id,accepted=True)
    list_of_access = []
    for item in user_access:
        if item is not None:
            list_of_access.append(item.serialize())
    school_list = []
    for item in list_of_access:
        school = School.query.filter_by(id=item["school_id"]).first()
        school_list.append(school)
    school_name_id = []
    for item in school_list:
        name = item.school_name
        school_id = item.id
        school_name_id.append({"School_Name":name,"School_Id":school_id})
    return jsonify(school_name_id)


# @api.route("/guardian/school/<int:school_id>", methods=["GET"])
# @jwt_required()
# def get_guardians_for_school(school_id):
#     current_user_id=get_jwt_identity()
#     search_school = 
#     school = School.query.filter_by(school_name=search_school).first()
#     if school is None:
#         raise APIException("School Not Found!")
#     return (school)
#     # school_access_list = School_Access.query.filter_by(school_id=school.id)
    

@api.route("/school/<int:school_id>/complaint/<int:flagged_guardian_id>", methods=["POST"])
@jwt_required()
def create_complaint(flagged_guardian_id):
    current_user_id=get_jwt_identity()
    if current_user_id == flagged_guardian_id:
        raise APIException("Cannot Complain Against Self!")
    guardian= Guardian.query.get(flagged_guardian_id)
    if guardian is None:
        raise APIException("Guardian does not exist!")
    comment = request.json.get("comment")
    if comment is None:
        raise APIException("Comment does not exist!")
    check_complaint=Complaint.query.filter_by(flagged_guardian_id=flagged_guardian_id,flag_creator_id=current_user_id).first()
    if check_complaint is not None:
        raise APIException("Complaint against this guardian already exists!")
    complaint = Complaint(flagged_guardian_id=flagged_guardian_id,flag_creator_id=current_user_id,flag_comment=comment)
    db.session.add(complaint)
    db.session.commit()
    return ("Complaint Succesfully Filed!"),200


@api.route("/complaint", methods=["GET"])
@jwt_required()
def get_complaint():
    current_user_id=get_jwt_identity()
    check_admin = School_Access.query.filter_by(user_id=current_user_id,role="admin").first()
    if check_admin is None:
        raise APIException("You Do Not Have Admin Rights!")
    access_list = School_Access.query.filter_by(school_id=check_admin.school_id,accepted=True,role="guardian")
    serial_access=[item.serialize() for item in access_list]
    print(serial_access)
    serialized_access = [item.serialize() for item in access_list]
    guardian_list = []
    for item in serialized_access:
        guardian = Guardian.query.filter_by(user_id=item["user_id"]).first()
        guardian = guardian.serialize()
        guardian_list.append(guardian)
    complaint_list = []
    for item in guardian_list:
        complaints = Complaint.query.filter_by(flagged_guardian_id=item["id"])
        print("THIS IS COMPLAINTS!!!!!!!!!!!!!!!!!!!!",complaints)
        for complaint in complaints:
            complaint.serialize()
            complaint_list.append(complaint)
    if not complaint_list:
        raise APIException("No Complaints Found!")
    active_complaints=[]
    # for item in complaint_list:
    #     complaining_guardian = Guardian.query.filter_by(id=item.flag_creator_id).first()
    #     complaining_guardian=complaining_guardian = f'{complaining_guardian.first_name} {complaining_guardian.last_name}'
    #     complaint_guardian = Guardian.query.filter_by(id=item.flagged_guardian_id).first()
    #     complaint_guardian =complaint_guardian = f'{complaint_guardian.first_name} {complaint_guardian.last_name}'
    #     active_complaints.append({"complaining_guardian":complaining_guardian,"complaint_guardian":complaint_guardian,"Complaint":item.flag_comment})
    print(complaint_list)
    return ("")

@api.route("/school", methods=["POST"])
@jwt_required()
def create_school():
    current_user_id=get_jwt_identity()
    user = User.query.get(current_user_id)
    check_admin = School_Access.query.filter_by(user_id=current_user_id,role="admin").first()
    if check_admin is not None:
        raise APIException("Cannot Create Multiple Schools!")
    school_name= request.json.get("school_name", None)
    school_address= request.json.get("school_address", None)
    school_logo_url= request.json.get("school_logo_url", None)
    school = School(school_name=school_name,school_address=school_address,school_logo_url=school_logo_url)
    db.session.add(school)
    added_school = School.query.filter_by(school_name=school_name).first()
    if added_school is None:
        raise APIException("School registration failed!")
    school_id = added_school.id
    school_access = School_Access(user_id=current_user_id,school_id=school_id,role="admin",accepted=True)
    db.session.add(school_access)
    db.session.commit()
    return jsonify(school_access.serialize()),200