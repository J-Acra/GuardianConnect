import React from "react";
import { Link } from "react-router-dom";

import "../../styles/SchoolLogin.css";

export const SchoolLogin = () => {
  return (
    <div className="box SchoolLogin">
      <div className="text-center m-5-auto login-form toblack ">
        <h1>Sign in to us</h1>
        <form action="/home">
          <p className="toblack">
            <label>Username or email address</label>
            <br />
            <input type="text" name="first_name" required />
          </p>
          <p>
            <label className="toblack">Password</label>
            <Link to="/forget-password">
              <label className="right-label">Forget password?</label>
            </Link>
            <br />
            <input type="password" name="password" required />
          </p>
          <p>
            <button id="sub_btn" type="submit">
              Login
            </button>
          </p>
        </form>
        <footer>
          <p>
            First time? <Link to="/school/create">Create an account</Link>.
          </p>
          <p className="towhite">
            <Link to="/">Back to Homepage</Link>
          </p>
        </footer>
      </div>
      <div className="right-side">
        <h1>Hello</h1>
        <p>please enter your information to continue</p>
      </div>
    </div>
  );
};
