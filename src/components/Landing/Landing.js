import React from 'react';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

const Landing = ({ route, handleRouteChange }) => {
  return (
    <div className="pv5 ph4">
      <section className="pt6">
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
