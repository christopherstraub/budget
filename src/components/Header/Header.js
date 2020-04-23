import React from 'react';
import Nav from '../../components/Nav/Nav';

import './Header.scss';

const Header = ({ loggedIn }) => {
  return (
    <header>
      <h1 className="logo header__logo pointer absolute">CSBudget</h1>
      {loggedIn ? <Nav loggedIn={loggedIn} /> : null}
    </header>
  );
};

export default Header;
