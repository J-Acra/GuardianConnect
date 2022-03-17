import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Footer } from "./component/footer";

import { UserLogin } from "./pages/Login.js";
import { UserSignup } from "./pages/UserSignup.jsx";
import { Dashboard } from "./pages/Dashboard.js";
import { NavPage } from "./pages/NavPage";
import { LandingPage } from "./pages/LandingPage";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ModalView } from "./pages/ModalView";
import { Profile } from "./pages/Profile";
import { PlayGroundView } from "./pages/PlayGroundView.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GuardianSchedule } from "./pages/GuardianSchedule.jsx";
import { ProfileDetails } from "./pages/ProfileDetails.jsx";
import { GuardianDetails } from "./pages/GuardianDetails.jsx";
import { AdminDetails } from "./pages/AdminDetails.jsx";
import { GuardianSearch } from "./pages/GuardianSearch.jsx";
import { AddAChild } from "./pages/AddAChild.jsx";
import injectContext from "./store/appContext";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <ToastContainer />
          <Switch>
            <Route exact path="/nav">
              <NavPage />
            </Route>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/user/login">
              <UserLogin />
            </Route>
            <Route exact path="/user/create">
              <UserSignup />
            </Route>
            <Route exact path="/user/home">
              <Dashboard />
            </Route>
            <Route exact path="/user/details">
              <ProfileDetails />
            </Route>
            <Route exact path="/user/forgot">
              <ForgotPassword />
            </Route>
            <Route exact path="/modal">
              <ModalView />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/user/schedule">
              <GuardianSchedule />
            </Route>
            <Route exact path="/user/guardian">
              <GuardianDetails />
            </Route>
            <Route exact path="/user/admin">
              <AdminDetails />
            </Route>
            <Route exact path="/user/child">
              <AddAChild />
            </Route>
            <Route exact path="/user/play">
              <PlayGroundView />
            </Route>
            <Route exact path="/user/search">
              <GuardianSearch />
            </Route>
            <Route>
              <h1>Not found!</h1>
            </Route>
          </Switch>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
