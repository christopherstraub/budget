import React from 'react';
import Nav from '../../components/Nav/Nav';

const Header = ({ isLoggedIn, handleRouteChange }) => {
  return (
    <header>
      <h1
        onClick={() =>
          isLoggedIn ? handleRouteChange('create') : handleRouteChange('signup')
        }
        className="logo header__logo selection-transparent absolute pointer"
      >
        CSBudget
      </h1>

      {isLoggedIn ? (
        <Nav isLoggedIn={isLoggedIn} handleRouteChange={handleRouteChange} />
      ) : null}
    </header>
  );
};

export default Header;
