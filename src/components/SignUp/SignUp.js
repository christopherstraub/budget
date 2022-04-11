import React from 'react';
import { Helmet } from 'react-helmet';

import Spinner from '../Spinner/Spinner';

const SignUp = ({
  handleRouteChange,
  handleDisplayNameInputChange,
  handleUsernameInputChange,
  handleNewPasswordInputChange,
  handleEnterKey,
  handleSignUp,
  windowMessage,
  input,
  getPasswordInputStyle,
  loading,
}) => (
  <>
    <Helmet>
      <title>CSBudget</title>
    </Helmet>
    <div className="relative mb3">
      <input
        className={`input input-indicator br3 pt4 ph3 pb2 w-100
          ${input.displayName.empty ? 'empty' : ''}
          `}
        onChange={handleDisplayNameInputChange}
        onKeyDown={handleEnterKey(handleSignUp)}
        type="text"
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
        onKeyDown={handleEnterKey(handleSignUp)}
        type="text"
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
        onKeyDown={handleEnterKey(handleSignUp)}
        type="password"
        maxLength={input.newPassword.maxLength}
        required
      />
      <span className="floating-label">Password</span>
    </div>

    {windowMessage ? (
      <h6 className="clr-red fs-body fw4 mv4">{windowMessage}</h6>
    ) : null}

    <button
      onClick={loading ? null : handleSignUp}
      className={`bg--semi-transparent selection-transparent clr-light fs-body fw7 bg--dark bn br3 pa3 mb3 w-100
      ${loading ? '' : 'pointer hover-opacity-75'}`}
    >
      {loading ? <Spinner /> : 'Sign Up'}
    </button>
    <button
      onClick={() => handleRouteChange('sign-in')}
      className="clr-light fs-body fw3 bg-transparent bn pointer underline-hover"
    >
      Have an account? <span className="fw6">Sign in</span>.
    </button>
  </>
);

export default SignUp;
