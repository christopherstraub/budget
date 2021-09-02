import React from 'react';

const SignInWrapper = ({ handleRouteChange, children }) => {
  return (
    <div className="flex justify-center">
      <div
        className="bg--login-box br3 tc pt5 pb4 ph4 ba border-clr-dark"
        style={{ maxWidth: '30rem' }}
      >
        <h1 className="clr-light fs-heading ff-logo fw4 user-select-none tc mb4">
          CSBudget
        </h1>
        {children}
        <button
          onClick={() => handleRouteChange('budget')}
          className="clr-light fs-body fw3 bg-transparent bn pointer underline-hover mt6"
        >
          Continue as guest.
        </button>
      </div>
    </div>
  );
};

export default SignInWrapper;
