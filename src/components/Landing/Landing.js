import React from 'react';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

const Landing = ({ handleRouteChange, route, useDarkLanding }) => {
  return (
    <div className="landing ph4 pb4">
      <section className={`${useDarkLanding ? 'dark' : null}`}>
        <h1 className="title tc mb3">Budgeting doesn't have to be hard.</h1>
        <h2 className="subtitle tc mb5">
          Sign up or sign in to save your budgets and access them at any time.
        </h2>
      </section>

      {route === 'signin' ? (
        <SignIn handleRouteChange={handleRouteChange} />
      ) : route === 'signup' ? (
        <SignUp handleRouteChange={handleRouteChange} />
      ) : null}
    </div>
  );
};

export default Landing;
