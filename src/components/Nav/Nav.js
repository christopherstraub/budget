import React from 'react';

import './Nav.scss';

const Nav = ({ loggedIn }) => {
  return (
    <nav>
      <ul className="navi ul flex justify-center pt5">
        <li className="navi__item pointer br-pill dim">CREATE</li>
        <li className="navi__item pointer br-pill dim">SAVED</li>
        <li className="navi__item pointer br-pill dim">PROFILE</li>
        <li className="navi__item pointer br-pill dim">ABOUT</li>
        <li className="navi__item pointer br-pill dim">
          {loggedIn ? 'SIGN OUT' : 'SIGN IN'}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
