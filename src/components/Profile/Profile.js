import React from 'react';

import WindowBox from '../WindowBox/WindowBox';

const Profile = ({
  user,
  inputName,
  handleNameInputChange,
  handleNameChange,
  handleBackgroundChange,
  backgrounds,
  maxBudgets,
}) => {
  return (
    <div className="flex justify-center mt4 ph4">
      <WindowBox classlist="mw7 tc">
        <h1 className="window-title tc text-break">{user.name}</h1>

        <h2 className="window-body tc o-80 text-break mb5">
          {user.budgets.length}/{maxBudgets} budgets
        </h2>

        <h2 className="window-body mb3">Change name</h2>
        <div className="flex justify-center">
          <input
            onChange={handleNameInputChange}
            className="input br3 pv1 ph3 mr3 w-100"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputName}
          />
          <button
            onClick={handleNameChange}
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
              className="button bg--accent-dark mr3 mb3 pv2 ph3"
            >
              {background.name}
            </button>
          ))}

          <h2 className="window-body o-80 tc mt5">
            Member since {new Date().toLocaleDateString()}
          </h2>
        </div>
      </WindowBox>
    </div>
  );
};

export default Profile;
