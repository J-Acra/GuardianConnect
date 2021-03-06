import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { NavReuse } from "../component/NavReuse.jsx";
import { RideFeed } from "../component/RideFeed.jsx";

// Dashboard
export const Dashboard = (props) => {
  const history = useHistory();
  const { store, actions } = useContext(Context);
  const params = useParams();
  const logStatus = JSON.parse(localStorage.getItem("session"));

  if (logStatus === null) {
    history.push("/");
  }
  return (
    <div className="dashBody w-100">
      <NavReuse />
      <div className="dashBoardHome d-flex justify-content-center">
        <div className="col-10 mt-3">
          <div className="text-light fs-3 mb-3">Ride History</div>
          <RideFeed />
        </div>
      </div>
    </div>
  );
};
