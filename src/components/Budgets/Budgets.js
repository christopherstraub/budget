import React from 'react';

import Message from '../Message/Message';
import WindowBox from '../WindowBox/WindowBox';

const Budgets = ({
  user,
  handleAddBudget,
  handleViewBudget,
  handleSaveBudgets,
  messageCode,
}) => {
  return (
    <div className="flex justify-center pv5 ph4">
      <WindowBox>
        {messageCode === 'deleted-budget' ? (
          <div className="mb4">
            <Message message="Budget deleted." />
          </div>
        ) : null}

        {user.budgets.length === 0 ? (
          <h1 className="window-title tc mb5 text-break">
            {user.name}, you don't have any budgets.
          </h1>
        ) : user.budgets.length === 1 ? (
          <h1 className="window-title tc mb4 text-break">
            {user.name}, here's your budget.
          </h1>
        ) : (
          <h1 className="window-title tc mb4 text-break">
            {user.name}, here are your
            <span className="clr-accent-light b">
              {' '}
              {user.budgets.length}
            </span>{' '}
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
                  className="budget-name tc dim pointer mv4 text-break"
                >
                  {budget.name}
                </li>
              ))}
        </ul>

        <div className="flex justify-center pt3">
          <button
            onClick={handleAddBudget}
            className="button bg--accent-dark pv2 ph4 w-33 mr2"
            style={{ width: 'max-content' }}
          >
            CREATE NEW BUDGET
          </button>
          <button
            onClick={handleSaveBudgets}
            className="button bg--green pv2 ph4 w-33 ml2"
            style={{ width: 'max-content' }}
          >
            SAVE BUDGETS
          </button>
        </div>
        <div className="mw7">
          {messageCode === 'created-budget' ? (
            <div className="mt4">
              <Message message="Budget created." />
            </div>
          ) : messageCode === 'saved-budgets' ? (
            <div className="mt4">
              <Message message="Budgets saved." />
            </div>
          ) : messageCode === 'max-budgets' ? (
            <div className="mt4">
              <Message message="Maximum number of budgets created. You're an excellent financial planner!" />
            </div>
          ) : null}
        </div>
      </WindowBox>
    </div>
  );
};

export default Budgets;
