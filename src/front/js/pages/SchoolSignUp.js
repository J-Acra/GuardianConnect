import React from "react";
import { Link } from "react-router-dom";

import "../../styles/SchoolSignUp.css";

export const SchoolSignUp = () => {
  return (
    <>
      <div className="container-schoolsignup ">
        <div className="text- form toblack">
          <h1>Join us</h1>
          <h5>Create your personal account</h5>
          <form action="/home">
            <p>
              <label className="toblack">Username</label>
              <br />
              <input type="text" name="first_name" required />
            </p>
            <p>
              <label className="toblack">Email address</label>
              <br />
              <input type="email" name="email" required />
            </p>
            <p>
              <label className="toblack">Password</label>
              <br />
              <input type="password" name="password" required />
            </p>
            <p>
              <input type="checkbox" name="checkbox" id="checkbox" required />{" "}
              <span className="toblack">
                I agree all statements in{" "}
                <a
                  href="https://google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  terms of service.
                </a>
              </span>
              
            </p>
            <p>
              <button id="sub_btn" type="submit">
                Register
              </button>
            </p>
          </form>
          <footer>
            <p className="tow">
              <Link to="/">Back to Homepage</Link>.
            </p>
          </footer>
        </div>
        <div className="information">
          <h1>Hello Friend</h1>
          <p>Enter your details and start journey with us.</p>
        </div>
      </div>
    </>
  );
};
