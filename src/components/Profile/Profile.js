import React from 'react';

const Profile = ({ handleBackgroundChange }) => {
  return (
    <div className="window-box mw7">
      <p className="window-body tc">Josh</p>
      <p className="window-body tc">3 saved budgets</p>
      <p className="window-body">Change name:</p>
      <div className="flex">
        <input
          className="placeholder br3 pv1 ph3 mr3 w-100"
          type="text"
          id="name"
          name="name"
          placeholder="Name"
        />
        <button className="button btn--bg-green button-text pv1 ph3">
          SAVE
        </button>
      </div>
      <div className="mt2">
        <p className="window-body dib mr3">Change background: </p>
        <button
          onClick={handleBackgroundChange}
          className="button btn--bg-blue button-text mr3 mb3 pv1 ph3"
        >
          ALPINE MOUNTAINS
        </button>
        <button className="button btn--bg-blue button-text mr3 mb3 pv1 ph3">
          MACHU PICCHU
        </button>
        <button className="button btn--bg-blue button-text mr3 mb3 pv1 ph3">
          YOSEMITE VALLEY
        </button>
        <p className="window-body tc mt5">Member since December 31, 2019</p>
      </div>
    </div>
  );
};

export default Profile;
