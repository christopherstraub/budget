import React from 'react';

const getPasswordInputStyle = (password) => {
  return password.value.length < password.minLength ||
    password.value.length > password.maxLength
    ? ''
    : 'valid';
};

const SignUp = ({
  handleRouteChange,
  handleDisplayNameInputChange,
  handleUsernameInputChange,
  handlePasswordInputChange,
  handleKeyDown,
  handleUserSignUp,
  landingMessageCode,
  input,
}) => {
  return (
    <>
      <div className="relative">
        <input
          className={`input input-decorated br3 bn pt4 ph3 pb2 mv2 w-100
          ${input.displayName.empty ? 'empty' : ''}
          `}
          onChange={handleDisplayNameInputChange}
          onKeyDown={handleKeyDown(handleUserSignUp)}
          type="text"
          id="display-name"
          name="display-name"
          required
        />
        <span className="floating-label">Display name</span>
      </div>
      <div className="relative">
        <input
          className={`input input-decorated br3 bn pt4 ph3 pb2 mv2 w-100
          ${input.username.empty ? 'empty' : ''}
          `}
          onChange={handleUsernameInputChange}
          onKeyDown={handleKeyDown(handleUserSignUp)}
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
          ${getPasswordInputStyle(input.password)}
          `}
          onChange={handlePasswordInputChange}
          onKeyDown={handleKeyDown(handleUserSignUp)}
          type="password"
          id="password"
          name="password"
          required
        />
        <span className="floating-label">Password</span>
      </div>

      {landingMessageCode === 'fields-empty' ? (
        <h6 className="clr-red fs-body mt3">Please fill out all fields.</h6>
      ) : landingMessageCode === 'password-length-invalid' ? (
        <h6 className="clr-red fs-body mt3">
          Password should be between {input.password.minLength} and{' '}
          {input.password.maxLength} characters.
        </h6>
      ) : null}

      <button
        onClick={handleUserSignUp}
        className="button-transparent selection-transparent clr-light fs-body fw7 bg--dark bn br3 pv3 ph3 mv3 w-100"
      >
        Sign Up
      </button>
      <button
        onClick={() => handleRouteChange('signin')}
        className="clr-light fs-body fw3 bg-transparent bn pointer mt2 underline-hover"
      >
        Have an account? <span className="fw6">Sign in</span>.
      </button>
    </>
  );
};

export default SignUp;
