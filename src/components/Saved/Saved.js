import React from 'react';
import Message from '../Message/Message';

const Saved = ({ user, messageCode, handleViewBudget, handleAddBudget }) => {
  return (
    <div className="flex justify-center">
      <div className="window-box mw8">
        {messageCode === 'budget-deleted' ? (
          <Message message="Budget deleted." />
        ) : messageCode === 'budget-added' ? (
          <Message message="Budget added." />
        ) : null}
        <h1 className="window-title tc mb4">
          {user.name}, you have
          <span className="clr-blue b"> {user.budgets.length}</span> saved
          budgets.
        </h1>
        <ul className="ul tc">
          {user.budgets.map((budget, index) => (
            <li key={index} className="mv2">
              <p className="window-body dib mr3">{budget.title}</p>
              <button
                onClick={() => handleViewBudget(index)}
                className="button bg--blue pv1 ph3"
              >
                VIEW
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={handleAddBudget}
              className="button bg--green pv1 ph3 mt4"
            >
              CREATE NEW BUDGET
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Saved;
