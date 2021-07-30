import React from 'react';

import WindowBox from '../WindowBox/WindowBox';

const Profile = ({
  user,
  inputDisplayName,
  handleDisplayNameInputChange,
  handleDisplayNameChange,
  handleBackgroundChange,
  backgrounds,
  currentBackground,
  maxBudgets,
}) => {
  return (
    <div className="flex justify-center mt4 ph4">
      <WindowBox classlist="mw7 tc">
        <h1 className="window-title tc text-break">{user.displayName}</h1>

        <h2 className="window-body tc o-80 text-break mb5">
          {user.budgets.length}/{maxBudgets} saved budgets
        </h2>

        <h2 className="window-body mb3">Change display name</h2>
        <div className="flex justify-center">
          <input
            onChange={handleDisplayNameInputChange}
            className="input br3 pv1 ph3 mr3 w-100"
            type="text"
            id="display-name"
            name="display-name"
            placeholder="Name"
            value={inputDisplayName}
          />
          <button
            onClick={handleDisplayNameChange}
            className="button bg--green pv2 ph4"
          >
            SAVE
          </button>
        </div>

        <div className="mt4">
          <h2 className="window-body mb3">Background</h2>
          {backgrounds.map((background, index) => (
            <button
              key={index}
              onClick={handleBackgroundChange}
              className={`button bg--accent-dark mr3 mb3 pv2 ph3
              ${background.name === currentBackground.name ? 'fw-bold' : null}
              `}
            >
              {background.name}
            </button>
          ))}

          <h2 className="window-body o-80 tc mt5">
            Member since {user.joined.toLocaleDateString()}
          </h2>
        </div>
      </WindowBox>
    </div>
  );
};

export default Profile;
