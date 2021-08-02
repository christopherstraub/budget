import React from 'react';

const SignInWrapper = ({ handleRouteChange, children }) => {
  return (
    <div className="flex justify-center">
      <div
        className="bg--login-box br3 tc pt5 pb4 ph4 border--dark"
        style={{ maxWidth: '30rem' }}
      >
        <h1 className="clr-light ff-logo fs-heading user-select-none tc mb4">
          CSBudget
        </h1>

        {children}
        <button
          onClick={() => handleRouteChange('budget')}
          className="clr-light fs-body fw3 bg-transparent border-0 pointer underline-hover"
        >
          Continue as guest.
        </button>
      </div>
    </div>
  );
};

export default SignInWrapper;
