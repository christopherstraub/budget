import React from 'react';

import WindowBox from '../WindowBox/WindowBox';

const Profile = ({
  user,
  input,
  windowMessageCode,
  isGuest,
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
  <div className="flex justify-center pa4 tc">
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
          </div>

          <div className="mb4">
            <h2 className="clr-light fs-body fw3 mb3">Change display name</h2>
            <div className="flex">
              <div className="relative flex-grow-1">
                <input
                  className="input input-indicator br3 ph3 pb1 w-100"
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
            <div>
              <h2 className="clr-light fs-body fw3 mb3">Change password</h2>
              <div className="flex flex-column">
                <div className="relative mb3">
                  <input
                    className={`input input-indicator br3 ph3 pb1 w-100
                    ${input.password.empty ? 'empty' : ''}
                    `}
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
                    onChange={handleNewPasswordInputChange}
                    onKeyDown={handleKeyDown(handlePasswordChange)}
                    className={`input input-indicator br3 ph3 pb1 w-100
                  ${input.newPassword.empty ? 'empty' : ''}
                  ${getPasswordInputStyle(input.newPassword)}
                  `}
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

              {windowMessageCode === 'password-empty' ? (
                <h6 className="clr-red fs-body fw4 mt4 mb5">
                  Please enter current password.
                </h6>
              ) : windowMessageCode === 'new-password-empty' ? (
                <h6 className="clr-red fs-body fw4 mt4 mb5">
                  Please enter new password.
                </h6>
              ) : windowMessageCode === 'new-password-length-invalid' ? (
                <h6 className="clr-red fs-body fw4 mt4 mb5">
                  Password should be between {input.newPassword.minLength} and{' '}
                  {input.newPassword.maxLength} characters.
                </h6>
              ) : windowMessageCode === 'credentials-invalid' ? (
                <h6 className="clr-red fs-body fw4 mt4 mb5">
                  Current password invalid.
                </h6>
              ) : windowMessageCode === 'passwords-not-different' ? (
                <h6 className="clr-red fs-body fw4 mt4 mb5">
                  New password must be different from current password.
                </h6>
              ) : null}
            </div>
          )}

          <h2 className="clr-light-accent fs-body fw3 mt5 mb0">
            Member since {user.joinDate.toLocaleDateString()}
          </h2>
        </div>
      </WindowBox>
    </div>
  </div>
);

export default Profile;
