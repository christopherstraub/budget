import React from 'react';
import Nav from '../../components/Nav/Nav';

import './Header.scss';

const Header = ({ isLoggedIn, handleRouteChange }) => {
  return (
    <header>
      <h1
        onClick={() => handleRouteChange('create')}
        className="logo header__logo pointer absolute"
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
