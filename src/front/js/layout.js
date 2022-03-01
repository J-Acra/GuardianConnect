import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";


import { Home } from "./pages/home";
import { GuardianSignIn } from "./pages/GuardianSignIn.js";
import { GuardianSignup } from "./pages/GuardianSignup.jsx";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";

import { GuardianLogin } from "./pages/GuardianLogin";
import { GuardianHome } from "./pages/GuardianHome";
import { LandingPage } from "./pages/LandingPage";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Switch>
            <Route exact path="/">

              <Home />
            </Route>
            <Route exact path="/demo">
              <Demo />
            </Route>
            <Route exact path="/single/:theid">
              <Single />
            </Route>
            <Route exact path="/pages/GuardianSignIn">
              <GuardianSignIn />
            </Route>
            <Route exact path="/pages/Guardiansignup">
              <GuardianSignup />
            </Route>
            <Route exact path="/pages/landingpage">
              <LandingPage />
            </Route>
            <Route exact path="/guardian/login">
              <GuardianLogin />
            </Route>
            <Route exact path="/guardian/home">
              <GuardianHome />

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
