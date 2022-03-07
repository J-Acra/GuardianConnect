import React, { useState, useEffect, useContext } from "react";
import SchoolHomeNavbar from "../component/SchoolHomeNavbar";
import "../../styles/index.css";
import "../../styles/SchoolHome.css";

import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const SchoolHome = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  return (
    <div className="SchoolHome">
      <SchoolHomeNavbar />
      <div className="box-modeling">
        <div>
          <div className="boxH box-1">
            <div>
              <h3>Search Guardians</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                dapibus est eget feugiat molestie. Integer nec dapibus enim, at
                suscipit lectus. Pellentesque habitant morbi tristique senectus
                et netus et malesuada fames ac turpis egestas. Vestibulum
                commodo, nisl eu pretium tristique, ante mi vestibulum lacus,
                vel aliquam sem mi ac velit. Quisque cursus hendrerit turpis non
                auctor. Duis quam dui, interdum porttitor sodales in, egestas ac
                nunc. Aenean vitae lacus mauris.
              </p>
              <button className="button button1 left">Press</button>
              <button className="button button1 right">Press</button>
            </div>
          </div>
          <div className="boxH box-2">
            <div>
              <h3>View Complaints</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                dapibus est eget feugiat molestie. Integer nec dapibus enim, at
                suscipit lectus. Pellentesque habitant morbi tristique senectus
                et netus et malesuada
              </p>
              <button className="button button3 left">Press</button>
              <button className="button button3 right">Press</button>
            </div>
          </div>
        </div>
        <div>
          <div className="boxH box-3">
            <h3>Edit School</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              dapibus est eget feugiat molestie. Integer nec dapibus enim, at
              suscipit lectus.
            </p>
            <button className="button button2 left">Press</button>
            <button className="button button2 right">Press</button>
          </div>
          <div className="boxH box-4">
            <h3>Request</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              dapibus est eget feugiat molestie. Integer nec dapibus enim, at
              suscipit lectus. Pellentesque habitant morbi tristique senectus et
              netus et malesuada fames ac turpis egestas. Vestibulum commodo,
              nisl eu pretium tristique, ante mi vestibulum lacus, vel aliquam
              sem mi ac velit.
            </p>
            <button className="button button4 left">Press</button>
            <button className="button button4 right">Press</button>
          </div>
        </div>
      </div>
    </div>
  );
};
