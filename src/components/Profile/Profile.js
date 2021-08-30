import React from 'react';

import WindowBox from '../WindowBox/WindowBox';

import './Profile.scss';

const Profile = ({
  user,
  input,
  windowMessage,
  isGuest,
  allFormatArgs,
  handleCurrencyChange,
  handleDisplayNameInputChange,
  handleDisplayNameChange,
  handlePasswordInputChange,
  handleNewPasswordInputChange,
  handlePasswordChange,
  handleKeyDown,
  handleBackgroundChange,
  backgrounds,
  currentBackground,
  maxBudgets,
  savedBudgets,
  toggledExpandNav,
  getPasswordInputStyle,
}) => (
  <div className="Profile flex justify-center pa4 tc">
    <div className="w-100" style={{ maxWidth: '42rem' }}>
      <WindowBox toggledExpandNav={toggledExpandNav}>
        <div className="pv5 ph4">
          <h1 className="fs-subheading fw3 text-break">{user.displayName}</h1>
          <h2 className="clr-light-accent fs-body fw3 text-break mb5">
            {user.budgets.length}/{maxBudgets} budgets ‧ {savedBudgets.length}{' '}
            saved
          </h2>

          <div className="mb4">
            <h2 className="clr-light fs-body fw3 mb3">Backgrounds</h2>
            <div
              className="flex flex-wrap justify-center"
              style={{ gap: '1rem' }}
            >
              {backgrounds.map((background, index) => (
                <button
                  key={index}
                  onClick={handleBackgroundChange}
                  className={`clr-light fs-body ff-mono fw3 ttc selection-transparent hover-opacity br3 bn bg--accent-dark pa2
                  ${background.name === currentBackground.name ? 'fw6' : ''}
                  `}
                >
                  {background.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb4">
            <label className="clr-light fs-body fw3 mb3" htmlFor="display-name">
              Change display name
            </label>
            <div className="flex">
              <div className="relative flex-grow-1">
                <input
                  className="input input-indicator br3 ph3 pb1 w-100"
                  id="display-name"
                  onChange={handleDisplayNameInputChange}
                  onKeyDown={handleKeyDown(handleDisplayNameChange)}
                  style={{ paddingTop: '15px' }}
                  type="text"
                  name="display-name"
                  value={input.displayName.value}
                  maxLength={input.displayName.maxLength}
                  required
                />
                <span className="floating-label small">New display name</span>
              </div>
            </div>
          </div>

          {isGuest ? null : (
            <div className="mb4">
              <label
                className="clr-light fs-body fw3 mb3"
                htmlFor={input.password.value ? 'new-password' : 'password'}
              >
                Change password
              </label>
              <div className="flex flex-column">
                <div className="relative mb3">
                  <input
                    className={`input input-indicator br3 ph3 pb1 w-100
                    ${input.password.empty ? 'empty' : ''}
                    `}
                    id="password"
                    onChange={handlePasswordInputChange}
                    onKeyDown={handleKeyDown(handlePasswordChange)}
                    style={{ paddingTop: '15px' }}
                    type="password"
                    name="password"
                    value={input.password.value}
                    maxLength={input.password.maxLength}
                    required
                  />
                  <span className="floating-label small">Current password</span>
                </div>

                <div className="relative">
                  <input
                    className={`input input-indicator br3 ph3 pb1 w-100
                  ${input.newPassword.empty ? 'empty' : ''}
                  ${getPasswordInputStyle(input.newPassword)}
                  `}
                    id="new-password"
                    onChange={handleNewPasswordInputChange}
                    onKeyDown={handleKeyDown(handlePasswordChange)}
                    style={{ paddingTop: '15px' }}
                    type="password"
                    name="new-password"
                    value={input.newPassword.value}
                    maxLength={input.newPassword.maxLength}
                    required
                  />
                  <span className="floating-label small">New password</span>
                </div>
              </div>

              {windowMessage ? (
                <h6 className="clr-red fs-body fw4 mt4 mb5">{windowMessage}</h6>
              ) : null}
            </div>
          )}

          <div className="mb5">
            <label
              className="clr-light fs-body fw3 mb3 db"
              htmlFor="currencies"
            >
              Change currency
            </label>
            <select
              className="clr-dark bg--light br3 bn pv3 ph2"
              id="currencies"
              onClick={handleCurrencyChange}
              onChange={handleCurrencyChange}
            >
              <option
                className="clr-dark fs-body"
                key={user.formatArgs.currency}
                value={user.formatArgs.currency}
              >
                Select currency
              </option>
              {allFormatArgs.map((args) => (
                <option
                  className={`clr-dark fs-body
                    ${args.currency === user.formatArgs.currency ? 'fw7' : ''}
                    `}
                  key={args.currency}
                  value={args.currency}
                >
                  {args.currency}
                </option>
              ))}
            </select>
          </div>

          <h2 className="clr-light-accent fs-body fw3 mb0">
            Member since {user.joinDate.toLocaleDateString()}
          </h2>
        </div>
      </WindowBox>
    </div>
  </div>
);

export default Profile;
