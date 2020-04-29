import React from 'react';

const Saved = ({ user }) => {
  return (
    <div className="flex justify-center">
      <div className="window-box mw7">
        <h1 className="window-title tc mb4">
          {user.name}, you have{' '}
          <span className="clr-blue b">{user.budgets.length}</span> saved
          budgets.
        </h1>
        <ul className="ul tc">
          {user.budgets.map((budget, index) => {
            return (
              <li key={index} className="mv2">
                <p className="window-body dib mr3">{budget.title}</p>
                <button className="button btn--bg-blue pv1 ph3 dim">
                  EDIT
                </button>
              </li>
            );
          })}
          <li>
            <button className="button btn--bg-green pv1 ph3 mt4 dim">
              CREATE NEW BUDGET
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Saved;
