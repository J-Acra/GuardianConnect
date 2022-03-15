import React, { useState, useEffect, useContext } from "react";
import propTypes from "prop-types";
import { DashNavBar } from "../component/DashNavBar.jsx";
import { DashNavItems } from "../component/DashNavItems.jsx";
import { DashDropDown } from "../component/DashDropDown.jsx";
import "../../styles/navReuse.css";
import { BsFlag } from "react-icons/bs";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { BsPerson } from "react-icons/bs";
import { GrHomeRounded } from "react-icons/gr";
import { Context } from "../store/appContext";

export const NavReuse = (props) => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  useEffect(() => {
    actions
      .getSelf()
      .then((payload) => setName(payload.first_name + " " + payload.last_name));
  }, []);
  return (
    <>
      {" "}
      <DashNavBar name={name}>
        <DashNavItems icon={<GrHomeRounded className="svg" />} />
        <DashNavItems icon={<BsFlag className="flag" />} />
        <DashNavItems icon={<RiMoneyDollarBoxLine className="tip" />} />

        <DashNavItems icon={<BsPerson className="person" />}>
          <DashDropDown></DashDropDown>
        </DashNavItems>
      </DashNavBar>
    </>
  );
};
