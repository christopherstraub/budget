import React from 'react';

import './Nav.scss';

const Nav = ({ isLoggedIn, handleRouteChange }) => {
  return (
    <nav>
      <ul className="navi ul flex justify-center pt5">
        <li
          onClick={() => handleRouteChange('create')}
          className="navi__item pointer br-pill dim"
        >
          CREATE
        </li>
        <li
          onClick={() => handleRouteChange('saved')}
          className="navi__item pointer br-pill dim"
        >
          SAVED
        </li>
        <li
          onClick={() => handleRouteChange('profile')}
          className="navi__item pointer br-pill dim"
        >
          PROFILE
        </li>
        <li
          onClick={() => handleRouteChange('about')}
          className="navi__item pointer br-pill dim"
        >
          ABOUT
        </li>
        <li
          onClick={() => handleRouteChange('signin')} //DONT FORGET TO SIGN USER OUT
          className="navi__item pointer br-pill dim"
        >
          {isLoggedIn ? 'SIGN OUT' : 'SIGN IN'}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
