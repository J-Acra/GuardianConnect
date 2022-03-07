import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/landingPage.css";

export const LandingPage = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="landingPage position-relative container-fluid d-flex flex-column flex-md-row">
      <div className="guardianView position-relative h-100 d-inline-block w-100 w-md-50">
        <div className="splitText position-absolute top-50 start-50 translate-middle bg-dark px-5">
          <Link className="route" to="/user/login">
            <p className="text-center">Guardian</p>
          </Link>
        </div>
      </div>
      <div className=" schoolView position-relative h-100 d-inline-block w-100 w-md-50">
        <div className="splitText position-absolute top-50 start-50 translate-middle bg-dark px-5">
          <Link className="route" to="/user/login">
            <p className="text-center">Admin</p>
          </Link>
        </div>
      </div>
      <div className="centerImage position-absolute top-50 start-50 translate-middle text-dark text-center"></div>
    </div>
  );
};
