import React from 'react';

import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo header__logo pointer absolute">CSBudget</h1>
      {/* IF LOGGED IN UNHIDE NAV */}
      <nav className="header__nav flex flex-wrap justify-center visible">
        <p className="header__nav__item mh3 pointer">CREATE</p>
        <p className="header__nav__item mh3 pointer">SAVED</p>
        <p className="header__nav__item mh3 pointer">PROFILE</p>
        <p className="header__nav__item mh3 pointer">ABOUT</p>
      </nav>
    </header>
  );
};

export default Header;
