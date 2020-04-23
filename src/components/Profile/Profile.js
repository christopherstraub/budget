import React from 'react';

const Profile = () => {
  return (
    <div className="window-box mw8">
      <p className="window-title">Josh</p>
      <p className="window-title">3 saved budgets</p>
      <p className="window-title">Change name:</p>
      <div className="flex">
        <input
          className="placeholder"
          type="text"
          id="name"
          name="name"
          placeholder="Name"
        />
        <button className="button btn--create-new-budget button-text ml3">
          SAVE
        </button>
      </div>
    </div>
  );
};

export default Profile;
