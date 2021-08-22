import React from 'react';

import SignInWrapper from '../SignInWrapper/SignInWrapper';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

import './Landing.scss';

const Landing = ({
  handleRouteChange,
  route,
  useDarkLanding,
  handleDisplayNameInputChange,
  handleUsernameInputChange,
  handlePasswordInputChange,
  handleNewPasswordInputChange,
  handleKeyDown,
  handleSignUp,
  handleSignIn,
  windowMessageCode,
  input,
  getPasswordInputStyle,
}) => {
  const { displayName, newPassword, ...signInInput } = input;

  return (
    <div
      className={`landing flex flex-column justify-center ph4 pv6 ${
        useDarkLanding ? 'clr-dark' : 'clr-light'
      }`}
    >
      <section className="landing-text pt4">
        <h1 className="fs-heading fw6 tc mb2">
          Budgeting doesn't have to be hard.
        </h1>
        <h2 className="fs-subheading fw3 tc mb5">
          Sign up or sign in to save your budgets and access them at any time.
        </h2>
      </section>

      <SignInWrapper handleRouteChange={handleRouteChange}>
        {route === 'signup' ? (
          <SignUp
            handleRouteChange={handleRouteChange}
            handleDisplayNameInputChange={handleDisplayNameInputChange}
            handleUsernameInputChange={handleUsernameInputChange}
            handleNewPasswordInputChange={handleNewPasswordInputChange}
            handleKeyDown={handleKeyDown}
            handleSignUp={handleSignUp}
            windowMessageCode={windowMessageCode}
            input={input}
            getPasswordInputStyle={getPasswordInputStyle}
          />
        ) : route === 'signin' ? (
          <SignIn
            handleRouteChange={handleRouteChange}
            handleUsernameInputChange={handleUsernameInputChange}
            handlePasswordInputChange={handlePasswordInputChange}
            handleKeyDown={handleKeyDown}
            handleSignIn={handleSignIn}
            windowMessageCode={windowMessageCode}
            input={signInInput}
          />
        ) : null}
      </SignInWrapper>
    </div>
  );
};

export default Landing;
