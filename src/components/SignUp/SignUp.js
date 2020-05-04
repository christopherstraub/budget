import React from 'react';

import '../../styles/loginBox.scss';

const SignUp = ({ handleRouteChange }) => {
  return (
    <div className="flex justify-center">
      <div className="login-box tc pt5 ph5 pb4">
        <h1 className="logo login tc mb4">CSBudget</h1>
        <input
          className="input br3 pa3 mv2 w-100"
          type="text"
          id="name"
          name="name"
          placeholder="Name"
        />
        <input
          className="input br3 pa3 mv2 w-100"
          type="text"
          id="email"
          name="email"
          placeholder="Email"
        />
        <input
          className="input br3 pa3 mv2 w-100"
          type="text"
          id="password"
          name="password"
          placeholder="Password"
        />
        <input
          onClick={() => handleRouteChange('create')}
          className="login-button-text outline-0 br3 pa3 mv2 w-100"
          type="submit"
          value="Sign up"
        />
        <h2
          onClick={() => handleRouteChange('signin')}
          className="login-button-text pointer mt3 mb6 dim"
        >
          Sign in
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

export default SignUp;
