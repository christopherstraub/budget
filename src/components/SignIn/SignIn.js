import React from 'react';

const SignIn = ({ handleRouteChange }) => {
  return (
    <div className="flex justify-center">
      <div className="login-box bg--login-box br3 tc pt5 pb4">
        <h1 className="logo login selection-transparent tc mb4">CSBudget</h1>
        <div className="ph4">
          <input
            className="input br3 pa3 mv2 w-100"
            type="text"
            id="username"
            name="username"
            placeholder="Username"
          />
          <input
            className="input br3 pa3 mv2 w-100"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
          <input
            onClick={() => handleRouteChange('budget')}
            className="submit login-button-text outline-0 br3 pa3 mv3 w-100"
            type="submit"
            value="Sign In"
          />
          <h2
            onClick={() => handleRouteChange('signup')}
            className="continue-as-guest pointer mt3 mb6 dim"
          >
            Don't have an account? Sign up.
          </h2>
          <h3
            onClick={() => handleRouteChange('budget')}
            className="continue-as-guest pointer dim"
          >
            Continue as Guest
          </h3>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
