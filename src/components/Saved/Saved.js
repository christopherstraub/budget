import React from 'react';

import Message from '../Message/Message';
import WindowBox from '../WindowBox/WindowBox';

const Saved = ({ user, messageCode, handleViewBudget, handleAddBudget }) => {
  return (
    <div className="flex justify-center">
      <WindowBox classList="mw8 w-100">
        {messageCode === 'deleted-budget' ? (
          <div className="mb4">
            <Message message="Budget deleted." />
          </div>
        ) : null}

        {user.budgets.length === 0 ? (
          <h1 className="window-title tc mb4 text-break">
            {user.name}, you don't have any saved budgets. Try creating one!
          </h1>
        ) : user.budgets.length === 1 ? (
          <h1 className="window-title tc mb4 text-break">
            {user.name}, here is your saved budget.
          </h1>
        ) : (
          <h1 className="window-title tc mb4 text-break">
            {user.name}, here are your
            <span className="clr-blue b"> {user.budgets.length}</span> saved
            budgets.
          </h1>
        )}

        <ul className="list pl0">
          {user.budgets.length === 0
            ? null
            : user.budgets.map((budget, index) => (
                <li
                  key={index}
                  onClick={() => handleViewBudget(index)}
                  className="overview-box-title tc dim pointer mv4 text-break"
                >
                  {budget.name}
                </li>
              ))}
        </ul>
        <div className="flex justify-center">
          <button
            onClick={handleAddBudget}
            className="button bg--green pv3 ph4"
          >
            CREATE NEW BUDGET
          </button>
        </div>
        {messageCode === 'created-budget' ? (
          <div className="mt4">
            <Message message="Budget created." />
          </div>
        ) : null}
      </WindowBox>
    </div>
  );
};

export default Saved;
