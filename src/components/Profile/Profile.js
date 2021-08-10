import React from 'react';

import WindowBox from '../WindowBox/WindowBox';

const Profile = ({
  user,
  inputDisplayName,
  handleDisplayNameInputChange,
  handleDisplayNameChange,
  handleKeyDown,
  handleBackgroundChange,
  backgrounds,
  currentBackground,
  maxBudgets,
}) => {
  return (
    <div className="flex justify-center pa4 tc">
      <WindowBox classlist="mw7 w-100">
        <h1 className="fs-subheading fw3 text-break">{user.displayName}</h1>

        <h2 className="clr-light-accent fs-body fw3 text-break mb5">
          {user.budgets.length}/{maxBudgets} saved budgets
        </h2>

        <h2 className="clr-light fs-body fw3 mb3">Change display name</h2>
        <div className="flex">
          <div className="relative flex-auto">
            <input
              onChange={handleDisplayNameInputChange}
              onKeyDown={handleKeyDown(handleDisplayNameChange)}
              className="input br3 border--dark ph3 pb1 w-100"
              style={{ paddingTop: '15px' }}
              type="text"
              id="display-name"
              name="display-name"
              value={inputDisplayName}
              required
            />
            <span className="floating-label small">New display name</span>
          </div>
        </div>

        <div className="mt4">
          <h2 className="clr-light fs-body fw3 mb3">Backgrounds</h2>
          <div className="flex flex-wrap justify-center">
            {backgrounds.map((background, index) => (
              <button
                key={index}
                onClick={handleBackgroundChange}
                className={`clr-light fs-body ff-mono fw3 ttc selection-transparent hover-opacity br3 bn bg--accent-dark mr3 mb3 pa2
              ${background.name === currentBackground.name ? 'fw6' : ''}
              `}
              >
                {background.name}
              </button>
            ))}
          </div>

          <h2 className="clr-light-accent fs-body fw3 mt5 mb0">
            Member since {user.joined.toLocaleDateString()}
          </h2>
        </div>
      </WindowBox>
    </div>
  );
};

export default Profile;
