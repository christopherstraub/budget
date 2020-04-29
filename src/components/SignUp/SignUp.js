import React from 'react';

import '../../base/loginBox.scss';

const SignUp = ({ handleRouteChange }) => {
  return (
    <div className="flex justify-center">
      <div className="login-box tc pt5 ph5 pb3">
        <h1 className="logo login tc mb4">CSBudget</h1>
        <input
          className="pa3 mv2 br3 w-100 placeholder"
          type="text"
          id="name"
          name="name"
          placeholder="Name"
        />
        <input
          className="pa3 mv2 br3 w-100 placeholder"
          type="text"
          id="email"
          name="email"
          placeholder="Email"
        />
        <input
          className="pa3 mv2 br3 w-100 placeholder"
          type="text"
          id="password"
          name="password"
          placeholder="Password"
        />
        <input
          // onClick={() => handleRouteChange('signup')} ATTEMPT TO SIGN UP USER
          className="pa3 mv2 br3 w-100 login-button-text white"
          type="submit"
          value="Sign up"
        />
        <p
          onClick={() => handleRouteChange('signin')}
          className="login-button-text pointer mt2 mb5 dim"
        >
          Sign in
        </p>
        <p
          onClick={() => handleRouteChange('create')}
          className="continue-as-guest pointer dim"
        >
          Continue as guest
        </p>
      </div>
    </div>
  );
};

export default SignUp;
