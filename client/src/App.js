import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React from "react";
import { css } from "styled-components/macro"; //eslint-disable-line

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ComponentRenderer from "ComponentRenderer.js";
import MainLandingPage from "MainLandingPage.js";
import ThankYouPage from "ThankYouPage.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "pages/Signup";
import Login from "pages/Login";
import PrivateRoute from "routes/PrivateRoute";
import Dashboard from "pages/Dashboard";
import AddText from "pages/AddText";
import EditText from "pages/EditText";
import Navbar from "components/headers/Navbar";


export default function App() {
 


  return (
    <Router>
    <Navbar/>
      <ToastContainer />
      <Switch>
        
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/login" exact component={Login}></Route>
        <PrivateRoute path="/dashboard" exact component={Dashboard}></PrivateRoute>
        <PrivateRoute path="/addText" exact component={AddText}></PrivateRoute>
        <PrivateRoute path="/editText/:id" exact component={EditText}></PrivateRoute>
        
        
      </Switch>
    </Router>
  );
}

// export default EventLandingPage;
// export default HotelTravelLandingPage;
// export default AgencyLandingPage;
// export default SaaSProductLandingPage;
// export default RestaurantLandingPage;
// export default ServiceLandingPage;
// export default HostingCloudLandingPage;

// export default LoginPage;
// export default SignupPage;
// export default PricingPage;
// export default AboutUsPage;
// export default ContactUsPage;
// export default BlogIndexPage;
// export default TermsOfServicePage;
// export default PrivacyPolicyPage;

// export default MainLandingPage;
