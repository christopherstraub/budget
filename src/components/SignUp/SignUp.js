import React from 'react';

const SignUp = ({
  handleRouteChange,
  handleDisplayNameInputChange,
  handleUsernameInputChange,
  handleNewPasswordInputChange,
  handleKeyDown,
  handleSignUp,
  windowMessageCode,
  input,
  getPasswordInputStyle,
}) => (
  <>
    <div className="relative mb3">
      <input
        className={`input input-indicator br3 pt4 ph3 pb2 w-100
          ${input.displayName.empty ? 'empty' : ''}
          `}
        onChange={handleDisplayNameInputChange}
        onKeyDown={handleKeyDown(handleSignUp)}
        type="text"
        name="new-display-name"
        maxLength={input.displayName.maxLength}
        required
      />
      <span className="floating-label">Display name</span>
    </div>
    <div className="relative mb3">
      <input
        className={`input input-indicator br3 pt4 ph3 pb2 w-100
          ${input.username.empty ? 'empty' : ''}
          `}
        onChange={handleUsernameInputChange}
        onKeyDown={handleKeyDown(handleSignUp)}
        type="text"
        name="new-username"
        maxLength={input.username.maxLength}
        required
      />
      <span className="floating-label">Username</span>
    </div>
    <div className="relative mb4">
      <input
        className={`input input-indicator br3 pt4 ph3 pb2 w-100
          ${input.newPassword.empty ? 'empty' : ''}
          ${getPasswordInputStyle(input.newPassword)}
          `}
        onChange={handleNewPasswordInputChange}
        onKeyDown={handleKeyDown(handleSignUp)}
        type="password"
        name="new-password"
        maxLength={input.newPassword.maxLength}
        required
      />
      <span className="floating-label">Password</span>
    </div>

    {windowMessageCode === 'fields-empty' ? (
      <h6 className="clr-red fs-body fw4 mv4">Please fill out all fields.</h6>
    ) : windowMessageCode === 'new-password-length-invalid' ? (
      <h6 className="clr-red fs-body fw4 mv4">
        Password should be between {input.newPassword.minLength} and{' '}
        {input.newPassword.maxLength} characters.
      </h6>
    ) : null}

    <button
      onClick={handleSignUp}
      className="bg--semi-transparent hover-opacity-75 selection-transparent clr-light fs-body fw7 bg--dark bn br3 pv3 ph3 mb3 w-100"
    >
      Sign Up
    </button>
    <button
      onClick={() => handleRouteChange('signin')}
      className="clr-light fs-body fw3 bg-transparent bn pointer underline-hover"
    >
      Have an account? <span className="fw6">Sign in</span>.
    </button>
  </>
);

export default SignUp;
