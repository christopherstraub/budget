import React from 'react';

const Nav = ({ handleRouteChange, loggedIn, isGuest, route }) => {
  return loggedIn ? (
    <nav className="flex justify-center ph5 bg--window-box">
      <div className="flex pv2 mb0 items-center ttc">
        <button
          onClick={() => handleRouteChange('budget')}
          className="clr-light fs-subtitle ff-logo bg-transparent border-0 ttc selection-transparent pointer relative mr4"
        >
          CSBudget
        </button>
        <button
          onClick={() => handleRouteChange('budget')}
          className={`clr-light fs-subheading fw3 bg-transparent border-0 ttc pointer mr4
          ${route === 'budget' ? 'selected clr-accent-light' : ''}
          `}
        >
          view budget
        </button>
        <button
          onClick={() => handleRouteChange('saved-budgets')}
          className={`clr-light fs-subheading fw3 bg-transparent border-0 ttc pointer mr4
          ${route === 'saved-budgets' ? 'selected clr-accent-light' : ''}
          `}
        >
          saved budgets
        </button>
        <button
          onClick={() => handleRouteChange('profile')}
          className={`clr-light fs-subheading fw3 bg-transparent border-0 ttc pointer
          ${route === 'profile' ? 'selected clr-accent-light' : ''}
          `}
        >
          profile
        </button>
      </div>
      <div className="flex pv2 items-center ml-auto mb0">
        <button
          onClick={() => handleRouteChange('about')}
          className={`clr-light fs-subheading fw3 bg-transparent border-0 ttc pointer
          ${route === 'about' ? 'selected clr-accent-light' : ''}
          `}
        >
          about
        </button>
        {isGuest ? (
          <button
            onClick={() => handleRouteChange('signup')}
            className="clr-light fs-subheading fw3 bg-transparent border-0 ttc pointer ml4"
          >
            sign up
          </button>
        ) : (
          <button
            onClick={() => handleRouteChange('signin')}
            className="clr-light fs-subheading fw3 bg-transparent border-0 ttc pointer ml4"
          >
            sign out
          </button>
        )}
      </div>
    </nav>
  ) : null;
};

export default Nav;
