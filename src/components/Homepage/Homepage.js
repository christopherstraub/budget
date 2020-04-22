import React from 'react';

const Homepage = () => {
  return (
    <header className="ph4">
      {/* IF SIGNED IN DISPLAY WELCOME */}
      {true ? (
        <div>
          <h1 className="title tc mb3">Budgeting has never been this easy.</h1>
          <h2 className="subtitle tc mb5">
            Sign in to save your work and come back any time.
          </h2>
        </div>
      ) : (
        <div>
          <h1 className="title tc mb3">This displays upon sign in.</h1>
        </div>
      )}
    </header>
  );
};

export default Homepage;
