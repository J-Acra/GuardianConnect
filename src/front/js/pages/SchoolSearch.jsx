import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { NavReuse } from "../component/NavReuse.jsx";
import "../../styles/searchGuard.css";
import { SchoolSearchBar } from "../component/SchoolSearchBar.jsx";

export const SchoolSearch = (props) => {
  //react declarations
  const history = useHistory();
  const { store, actions } = useContext(Context);
  const params = useParams();
  const logStatus = JSON.parse(localStorage.getItem("session"));

  const [state, setState] = useState("State");
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    actions.getSchools().then((payload) => setSchools(payload));
  }, []);

  return (
    <div className="dashBody w-100">
      <NavReuse />
      <div className="dashBoardHome">
        <div className="searchGuard-content">
          <div className="searchArea mt-3 container-fluid">
            <div className="text-light fs-3">Search For Schools to join!</div>
            <div className="mt-5">
              <SchoolSearchBar schools={schools} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
