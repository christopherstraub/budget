import React from 'react';

const Profile = ({ handleBackgroundChange, backgrounds }) => {
  return (
    <div className="flex justify-center">
      <div className="window-box mw7">
        <h1 className="window-title tc">Josh</h1>
        <p className="window-body tc">3 saved budgets</p>
        <p className="window-body">Change name:</p>
        <div className="flex">
          <input
            className="placeholder br2 pv1 ph3 mr3 w-100"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
          />
          <button className="button btn--bg-green pv1 ph3">SAVE</button>
        </div>
        <div className="mt2">
          <p className="window-body dib mr3">Change background: </p>

          {backgrounds.map((background, index) => (
            <button
              key={index}
              onClick={handleBackgroundChange}
              className="button btn--bg-blue mr3 mb3 pv1 ph3"
            >
              {background.name}
            </button>
          ))}

          <p className="window-body tc mt5">Member since December 31, 2019</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
