import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/guardianLogin.css";
import { Link } from "react-router-dom";

export const UserLogin = () => {
  const history = useHistory();
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="guardianLogin container-fluid mx-auto">
      <div className="container-fluid card">
        <div className="container-fluid card-body">
          <form
            className="text-center"
            onSubmit={(e) => {
              actions.createNewSession(email, password).then((session) => {
                history.push("/");
              });
              e.preventDefault();
            }}
          >
            <h3 className="fw-normal mb-3 pb-3">Sign into your account</h3>
            <div className="mb-4">
              <input
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control form-control-lg"
                required
              />
              <label className="form-label">Email address</label>
            </div>
            <div className="mb-4">
              <input
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control form-control-lg"
                required
              />
              <label className="form-label">Password</label>
            </div>
            <div className="loginBtn">
              <button className="btn btn-dark">Submit</button>
            </div>
            <div className="d-inline-block text-center">
              <Link to={"/user/create"}>
                <p className="text-center">New Account!</p>
              </Link>
              <Link to={"/user/forgot"}>
                <p className="text-center">Forgot Password?</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
