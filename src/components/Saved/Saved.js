import React from 'react';
import Message from '../Message/Message';

const Saved = ({ user, messageCode, handleViewBudget, handleAddBudget }) => {
  return (
    <div className="flex justify-center">
      <div className="window-box mw8 w-100">
        {messageCode === 'deleted-budget' ? (
          <Message message="Budget deleted." />
        ) : messageCode === 'created-budget' ? (
          <Message message="Budget created." />
        ) : null}
        <h1 className="window-title tc mb5">
          {user.name}, you have
          <span className="clr-blue b"> {user.budgets.length}</span> saved
          budgets.
        </h1>
        <ul className="ul">
          {user.budgets.length === 0
            ? null
            : user.budgets.map((budget, index) => (
                <li
                  key={index}
                  onClick={() => handleViewBudget(index)}
                  className="overview-box-title tc text-break dim pointer"
                >
                  {budget.name}
                </li>
              ))}
        </ul>
        <div className="flex justify-center">
          <button
            onClick={handleAddBudget}
            className="button bg--green pa3 mt4"
          >
            CREATE NEW BUDGET
          </button>
        </div>
      </div>
    </div>
  );
};

export default Saved;
