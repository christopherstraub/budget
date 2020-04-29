import React from 'react';

const Saved = ({ user, message }) => {
  return (
    <div className="flex justify-center">
      <div className="window-box mw7">
        {/* {message === 'budget-deleted' ? (
          <h1 className="window-body tc mb4">Successfully deleted budget.</h1>
        ) : null} */}
        <h1 className="window-title tc mb4">
          {user.name}, you have{' '}
          <span className="clr-blue b">{user.budgets.length}</span> saved
          budgets.
        </h1>
        <ul className="ul tc">
          {user.budgets.map((budget, index) => (
            <li key={index} className="mv2">
              <p className="window-body dib mr3">{budget.title}</p>
              <button className="button bg--blue pv1 ph3">VIEW</button>
            </li>
          ))}
          <li>
            <button className="button bg--green pv1 ph3 mt4">
              CREATE NEW BUDGET
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Saved;
