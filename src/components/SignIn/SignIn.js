import React from 'react';

import '../../base/loginBox.scss';

const SignIn = () => {
  return (
    <div className="flex justify-center">
      <div className="login-box tc pt5 ph5 pb3">
        <h1 className="logo login tc mb4">CSBudget</h1>
        <input
          className="input input--login-box placeholder"
          type="text"
          id="email"
          name="email"
          placeholder="Email"
        />
        <input
          className="input input--login-box placeholder"
          type="text"
          id="password"
          name="password"
          placeholder="Password"
        />
        <input
          className="input input--login-box login-button-text b"
          type="submit"
          value="Sign in"
        />
        <p className="login-button-text pointer mt2 mb5 dim">Sign up</p>
        <p className="continue-as-guest pointer dim">Continue as guest</p>
      </div>
    </div>
  );
};

export default SignIn;
