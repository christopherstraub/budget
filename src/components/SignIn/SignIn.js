import React from 'react';

import '../../base/loginBox.scss';

const SignIn = ({ handleRouteChange }) => {
  return (
    <div className="flex justify-center">
      <div className="login-box tc pt5 ph5 pb4">
        <h1 className="logo login tc mb4">CSBudget</h1>
        <input
          className="placeholder pa3 mv2 br3 w-100"
          type="text"
          id="email"
          name="email"
          placeholder="Email"
        />
        <input
          className="placeholder pa3 mv2 br3 w-100"
          type="text"
          id="password"
          name="password"
          placeholder="Password"
        />
        <input
          // onClick={() => handleRouteChange('signin')} ATTEMPT TO SIGN IN USER
          className="pa3 mv2 br3 w-100 login-button-text"
          type="submit"
          value="Sign in"
        />
        <h2
          onClick={() => handleRouteChange('signup')}
          className="login-button-text pointer mt3 mb6 dim"
        >
          Sign up
        </h2>
        <h3
          onClick={() => handleRouteChange('create')}
          className="continue-as-guest pointer dim"
        >
          Continue as guest
        </h3>
      </div>
    </div>
  );
};

export default SignIn;
