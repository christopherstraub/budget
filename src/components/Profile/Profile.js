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
    <div className="flex justify-center mt4 ph4 tc">
      <WindowBox classlist="mw7">
        <h1 className="fs-subheading fw3 text-break">{user.displayName}</h1>

        <h2 className="clr-light-accent fs-body fw3 text-break mb5">
          {user.budgets.length}/{maxBudgets} saved budgets
        </h2>

        <h2 className="clr-light fs-body fw3 mb3">Change display name</h2>
        <div className="flex justify-center">
          <div className="relative w-100">
            <input
              onChange={handleDisplayNameInputChange}
              className="input br3 pt4 ph3 pb2 w-100"
              type="text"
              id="display-name"
              name="display-name"
              value={inputDisplayName}
              required
            />
            <span className="floating-label clr-dark-accent fs-body">Name</span>
          </div>

          <button
            onClick={handleDisplayNameChange}
            className="clr-light fs-body ff-mono selection-transparent hover-opacity fw3 br3 border-0 bg--green pv2 ph4 ml3"
          >
            SAVE
          </button>
        </div>

        <div className="mt4">
          <h2 className="clr-light fs-body fw3 mb3">Backgrounds</h2>
          {backgrounds.map((background, index) => (
            <button
              key={index}
              onClick={handleBackgroundChange}
              className={`clr-light fs-body ff-mono selection-transparent hover-opacity fw3 br3 border-0 bg--accent-dark mr3 mb3 pv2 ph3
              ${background.name === currentBackground.name ? 'fw5' : ''}
              `}
            >
              {background.name}
            </button>
          ))}

          <h2 className="clr-light-accent fs-body fw3 mt5 mb0">
            Member since {user.joined.toLocaleDateString()}
          </h2>
        </div>
      </WindowBox>
    </div>
  );
};

export default Profile;
