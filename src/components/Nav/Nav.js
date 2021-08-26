import React from 'react';

import './Nav.scss';

const Nav = ({
  route,
  handleRouteChange,
  isLoggedIn,
  isGuest,
  handleToggledExpandNav,
  toggledExpandNav,
}) =>
  isLoggedIn ? (
    <nav
      className={`flex justify-between pv2 ph5 bg--window-box
    ${toggledExpandNav ? 'expand' : ''}
    `}
    >
      <div className="flex items-center">
        <button
          onClick={() => handleRouteChange('budget')}
          className="clr-light fs-subtitle ff-logo bg-transparent bn ttc selection-transparent pointer relative mr4"
        >
          CSBudget
        </button>
        <button
          className="toggle-expand dn absolute pa0 bg-transparent bn hover-opacity selection-transparent"
          onClick={handleToggledExpandNav}
        >
          <span className="bar w-100 bg--light br4"></span>
          <span className="bar w-100 bg--light br4"></span>
          <span className="bar w-100 bg--light br4"></span>
        </button>
        <button
          onClick={() => handleRouteChange('budget')}
          className={`clr-light fs-subheading fw3 bg-transparent bn ttc pointer mr4 hover-opacity selection-transparent 
          ${route === 'budget' ? 'selected clr-accent-light' : ''}
          `}
        >
          view budget
        </button>
        <button
          onClick={() => handleRouteChange('saved-budgets')}
          className={`clr-light fs-subheading fw3 bg-transparent bn ttc pointer mr4 hover-opacity selection-transparent
          ${route === 'saved-budgets' ? 'selected clr-accent-light' : ''}
          `}
        >
          saved budgets
        </button>
        <button
          onClick={() => handleRouteChange('profile')}
          className={`clr-light fs-subheading fw3 bg-transparent bn ttc pointer hover-opacity selection-transparent
          ${route === 'profile' ? 'selected clr-accent-light' : ''}
          `}
        >
          profile
        </button>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => handleRouteChange('about')}
          className={`clr-light fs-subheading fw3 bg-transparent bn ttc pointer hover-opacity selection-transparent
          ${route === 'about' ? 'selected clr-accent-light' : ''}
          `}
        >
          about
        </button>
        {isGuest ? (
          <button
            onClick={() => handleRouteChange('sign-up')}
            className="clr-light fs-subheading fw3 bg-transparent bn ttc pointer ml4 hover-opacity selection-transparent"
          >
            sign up
          </button>
        ) : (
          <button
            onClick={() => handleRouteChange('sign-in')}
            className="clr-light fs-subheading fw3 bg-transparent bn ttc pointer ml4 hover-opacity selection-transparent"
          >
            sign out
          </button>
        )}
      </div>
    </nav>
  ) : null;

export default Nav;
