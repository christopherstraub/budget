import React from 'react';

import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo logo-header pointer absolute">CSBudget</h1>
      {/* IF LOGGED IN DISPLAY NAV */}
      {true ? (
        <nav className="nav-header flex justify-center">
          <p className="nav-header__item mh4 pointer">CREATE</p>
          <p className="nav-header__item mh4 pointer">SAVED</p>
          <p className="nav-header__item mh4 pointer">PROFILE</p>
          <p className="nav-header__item mh4 pointer">ABOUT</p>
        </nav>
      ) : null}
    </header>
  );
};

export default Header;
