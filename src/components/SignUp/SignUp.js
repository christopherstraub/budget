import React from 'react';

import '../../base/loginBox.scss';

const SignUp = () => {
  return (
    <div className="flex justify-center">
      <div className="login-box tc pt5 ph5 pb3">
        <h2 className="logo login tc mb5">CSBudget</h2>
        <input
          className="placeholder"
          type="text"
          id="name"
          name="name"
          placeholder="Name"
        />
        <input
          className="placeholder"
          type="text"
          id="email"
          name="email"
          placeholder="Email"
        />
        <input
          className="placeholder"
          type="text"
          id="password"
          name="password"
          placeholder="Password"
        />
        <input
          className="login-button-text b white"
          type="submit"
          value="Sign up"
        />
        <p className="login-button-text pointer mt2 mb5 dim">Sign in</p>
        <p className="continue-as-guest pointer dim">Continue as guest</p>
      </div>
    </div>
  );
};

export default SignUp;
