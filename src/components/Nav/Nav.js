import React from 'react';

const Nav = ({ handleRouteChange }) => {
  return (
    <nav>
      <ul className="navi list pl0 flex justify-center pt5">
        <li
          onClick={() => handleRouteChange('create')}
          className="navi__item pointer br-pill dim mh4"
        >
          CREATE
        </li>
        <li
          onClick={() => handleRouteChange('budgets')}
          className="navi__item pointer br-pill dim mh4"
        >
          BUDGETS
        </li>
        <li
          onClick={() => handleRouteChange('profile')}
          className="navi__item pointer br-pill dim mh4"
        >
          PROFILE
        </li>
        <li
          onClick={() => handleRouteChange('about')}
          className="navi__item pointer br-pill dim mh4"
        >
          ABOUT
        </li>
        <li
          onClick={() => handleRouteChange('signin')} //DONT FORGET TO SIGN USER OUT
          className="navi__item pointer br-pill dim mh4"
        >
          SIGN OUT
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
