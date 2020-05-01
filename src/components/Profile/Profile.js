import React from 'react';
import Message from '../Message/Message';

const Profile = ({
  handleBackgroundChange,
  backgrounds,
  user,
  handleNameInputChange,
  handleNameChange,
  inputName,
  messageCode,
}) => {
  return (
    <div className="flex justify-center">
      <div className="window-box mw7">
        {messageCode === 'changed-name' ? (
          <Message message="Name changed." />
        ) : messageCode === 'changed-background' ? (
          <Message message="Background changed." />
        ) : null}
        <h1 className="window-title tc">{user.name}</h1>
        <h2 className="window-body tc o-80">
          {user.budgets.length} saved budgets
        </h2>
        <h2 className="window-body">Change name:</h2>
        <div className="flex">
          <input
            onChange={handleNameInputChange}
            className="placeholder br3 pv1 ph3 mr3 w-100"
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
          <h2 className="window-body dib mr3">Change background: </h2>

          {backgrounds.map((background, index) => (
            <button
              key={index}
              onClick={handleBackgroundChange}
              className="button bg--blue mr3 mb3 pv1 ph3"
            >
              {background.name}
            </button>
          ))}

          <h2 className="window-body tc mt5">
            Member since {user.joined.toLocaleDateString()}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
