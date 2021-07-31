import React from 'react';

const SignUp = ({ handleRouteChange }) => {
  return (
    <>
      <div className="relative">
        <input
          className="input input-decorated br3 pt4 ph3 pb2 mv2 w-100"
          type="text"
          id="display-name"
          name="display-name"
          required
        />
        <span className="floating-label clr-dark-accent fs-body">
          Display Name
        </span>
      </div>
      <div className="relative">
        <input
          className="input input-decorated br3 pt4 ph3 pb2 mv2 w-100"
          type="text"
          id="username"
          name="username"
          required
        />
        <span className="floating-label clr-dark-accent fs-body">Username</span>
      </div>
      <div className="relative">
        <input
          className="input input-decorated br3 pt4 ph3 pb2 mv2 w-100"
          type="password"
          id="password"
          name="password"
          required
        />
        <span className="floating-label clr-dark-accent fs-body">Password</span>
      </div>
      <button
        onClick={() => handleRouteChange('budget')}
        className="button-transparent selection-transparent clr-light fs-body fw7 bg--dark border-0 br3 pv3 ph3 mv3 w-100"
      >
        Sign Up
      </button>
      <button
        onClick={() => handleRouteChange('signin')}
        className="clr-light fs-body fw3 bg-transparent border-0 pointer mt2 mb6 underline-hover"
      >
        Have an account? <span className="fw6">Sign in</span>.
      </button>
    </>
  );
};

export default SignUp;
