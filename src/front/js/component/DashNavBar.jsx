import React, { useState, useEffect, useContext } from "react";
import propTypes from "prop-types";
import "../../styles/dashnav.css";

export const DashNavBar = (props) => {
  return (
    <>
      <nav className="navBar d-flex justify-content-between ">
        <p className="text-light mt-3">Welcome: {props.name}</p>
        <ul className="navBar-nav">{props.children}</ul>
      </nav>
    </>
  );
};
