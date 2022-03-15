import React from "react";
// import config from "../../config";
import SignupForm from "./SignupForm";

const Signup = () => {
  return (
    <React.Fragment>
      <div className="signup-content">
        <div className="progress">
          <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div className="container">
          <SignupForm />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signup;
