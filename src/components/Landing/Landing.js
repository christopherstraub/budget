import React from 'react';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

const Landing = ({ route }) => {
  return (
    <div>
      <header class="pt5">
        <h1 className="title tc mb3">Budgeting has never been this easy.</h1>
        <h2 className="subtitle tc mb5">
          Sign in to save your work and come back any time.
        </h2>
      </header>
      {route === 'signin' ? <SignIn /> : route === 'signup' ? <SignUp /> : null}
    </div>
  );
};

export default Landing;
