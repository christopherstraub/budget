import React from 'react';

import SignInWrapper from '../SignInWrapper/SignInWrapper';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

const Landing = ({
  handleRouteChange,
  route,
  useDarkLanding,
  handleDisplayNameInputChange,
  handleUsernameInputChange,
  handlePasswordInputChange,
  handleKeyDown,
  handleUserSignUp,
  handleUserSignIn,
  landingMessageCode,
  input,
}) => {
  const { displayName, ...signInInput } = input;

  return (
    <div
      className={`flex flex-column justify-center ph4 pb4 ${
        useDarkLanding ? 'clr-dark' : 'clr-light'
      }`}
      style={{ paddingTop: '10rem' }}
    >
      <section>
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
            handlePasswordInputChange={handlePasswordInputChange}
            handleKeyDown={handleKeyDown}
            handleUserSignUp={handleUserSignUp}
            landingMessageCode={landingMessageCode}
            input={input}
          />
        ) : route === 'signin' ? (
          <SignIn
            handleRouteChange={handleRouteChange}
            handleUsernameInputChange={handleUsernameInputChange}
            handlePasswordInputChange={handlePasswordInputChange}
            handleKeyDown={handleKeyDown}
            handleUserSignIn={handleUserSignIn}
            landingMessageCode={landingMessageCode}
            input={signInInput}
          />
        ) : null}
      </SignInWrapper>
    </div>
  );
};

export default Landing;
