import React from 'react';

const SignIn = ({
  handleRouteChange,
  handleUsernameInputChange,
  handlePasswordInputChange,
  handleKeyDown,
  handleUserSignIn,
  landingMessageCode,
  input,
}) => {
  return (
    <>
      <div className="relative">
        <input
          className={`input input-decorated br3 bn pt4 ph3 pb2 mv2 w-100
          ${input.username.empty ? 'empty' : ''}
          `}
          onChange={handleUsernameInputChange}
          onKeyDown={handleKeyDown(handleUserSignIn)}
          type="text"
          id="username"
          name="username"
          required
        />
        <span className="floating-label">Username</span>
      </div>
      <div className="relative">
        <input
          className={`input input-decorated br3 bn pt4 ph3 pb2 mv2 w-100
          ${input.password.empty ? 'empty' : ''}
          `}
          onChange={handlePasswordInputChange}
          onKeyDown={handleKeyDown(handleUserSignIn)}
          type="password"
          id="password"
          name="password"
          required
        />
        <span className="floating-label">Password</span>
      </div>

      {landingMessageCode === 'fields-empty' ? (
        <h6 className="clr-red fs-body mt3">Username and password required.</h6>
      ) : landingMessageCode === 'username-empty' ? (
        <h6 className="clr-red fs-body mt3">Username required.</h6>
      ) : landingMessageCode === 'password-empty' ? (
        <h6 className="clr-red fs-body mt3">Password required.</h6>
      ) : landingMessageCode === 'credentials-invalid' ? (
        <h6 className="clr-red fs-body mt3">Invalid username or password.</h6>
      ) : null}

      <button
        onClick={handleUserSignIn}
        className="button-transparent selection-transparent clr-light fs-body fw7 bg--dark bn br3 pa3 mv3 w-100"
      >
        Sign In
      </button>
      <button
        onClick={() => handleRouteChange('signup')}
        className="clr-light fs-body fw3 bg-transparent bn pointer mt2 underline-hover"
      >
        Don't have an account? <span className="fw6">Sign up</span>.
      </button>
    </>
  );
};

export default SignIn;
