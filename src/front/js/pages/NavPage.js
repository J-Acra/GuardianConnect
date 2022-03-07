import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const NavPage = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <Link to={"/user/create"}>
        <button>User Create</button>
      </Link>
      <Link to={"/user/home"}>
        <button>Dashboard</button>
      </Link>
      <Link to={"/user/login"}>
        <button>User Login</button>
      </Link>
      <Link to={"/"}>
        <button>LandingPage</button>
      </Link>
    </div>
  );
};
