import React from 'react';

const Profile = ({
  handleBackgroundChange,
  backgrounds,
  user,
  handleNameInputChange,
  handleNameChange,
  inputName,
}) => {
  return (
    <div className="flex justify-center">
      <div className="window-box mw7">
        <h1 className="window-title tc">{user.name}</h1>
        <p className="window-body tc o-80">
          {user.budgets.length} saved budgets
        </p>
        <p className="window-body">Change name:</p>
        <div className="flex">
          <input
            onChange={handleNameInputChange}
            className="placeholder br2 pv1 ph3 mr3 w-100"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputName}
          />
          <button
            onClick={handleNameChange}
            className="button bg--green pv1 ph3"
          >
            SAVE
          </button>
        </div>
        <div className="mt4">
          <p className="window-body dib mr3">Change background: </p>

          {backgrounds.map((background, index) => (
            <button
              key={index}
              onClick={handleBackgroundChange}
              className="button bg--blue mr3 mb3 pv1 ph3"
            >
              {background.name}
            </button>
          ))}

          <p className="window-body tc mt5">
            Member since {user.joined.toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
