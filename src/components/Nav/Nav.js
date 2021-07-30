import React from 'react';

const Nav = ({ handleRouteChange, loggedIn, isGuest }) => {
  return loggedIn ? (
    <nav className="flex justify-center ph5 ttc bg--window-box">
      <ul className="list flex pv2 mb0 items-center">
        <li
          onClick={() => handleRouteChange('budget')}
          className="logo selection-transparent pointer relative mr4"
        >
          CSBudget
        </li>
        <li
          onClick={() => handleRouteChange('budget')}
          className="nav-item pointer dim mr4"
        >
          view budget
        </li>
        <li
          onClick={() => handleRouteChange('saved-budgets')}
          className="nav-item pointer dim mr4"
        >
          saved budgets
        </li>
        <li
          onClick={() => handleRouteChange('profile')}
          className="nav-item pointer dim"
        >
          profile
        </li>
      </ul>
      <ul className="list flex pv2 items-center ml-auto mb0">
        <li
          onClick={() => handleRouteChange('about')}
          className="nav-item pointer dim"
        >
          about
        </li>
        {isGuest ? (
          <li
            onClick={() => handleRouteChange('signup')}
            className="nav-item pointer dim ml4"
          >
            sign up
          </li>
        ) : (
          <li
            onClick={() => handleRouteChange('signin')}
            className="nav-item pointer dim ml4"
          >
            sign out
          </li>
        )}
      </ul>
    </nav>
  ) : null;
};

export default Nav;
