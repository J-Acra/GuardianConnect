import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const LandingPage = () => {
  const { store, actions } = useContext(Context);

  return <div>LANDING</div>;
};