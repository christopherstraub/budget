import React from 'react';

import WindowBox from '../WindowBox/WindowBox';

const SavedBudgets = ({
  user,
  handleAddBudget,
  handleViewBudget,
  handleSaveBudgets,
  currentBudgetIndex,
}) => {
  return (
    <div className="flex justify-center mt4 ph4 tc">
      <WindowBox classlist="mw9">
        {user.budgets.length === 0 ? (
          <h1 className="clr-light fs-subheading fw3 mb5 text-break">
            {user.displayName}, you don't have any budgets.
          </h1>
        ) : user.budgets.length === 1 ? (
          <h1 className="clr-light fs-subheading fw3 mb4 text-break">
            {user.displayName}, here's your budget.
          </h1>
        ) : (
          <h1 className="clr-light fs-subheading fw3 mb4 text-break">
            {user.displayName}, here are your
            <span className="clr-accent-light fw6">
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
                  key={budget.id}
                  onClick={() => handleViewBudget(index)}
                  className={`clr-light fs-subtitle fw3 hover-opacity pointer mv4 text-break
                  ${
                    index === currentBudgetIndex ? 'clr-accent-light fw6' : ''
                  }`}
                >
                  {budget.name}
                </li>
              ))}
        </ul>

        <div className="flex justify-center pt3">
          <button
            onClick={handleAddBudget}
            className="clr-light fs-body ff-mono selection-transparent hover-opacity fw3 br3 border-0 bg--accent-dark pv2 ph4 w-33 mr2"
            style={{ width: 'max-content' }}
          >
            NEW BUDGET
          </button>
          <button
            onClick={handleSaveBudgets}
            className="clr-light fs-body ff-mono selection-transparent hover-opacity fw3 br3 border-0 bg--green pv2 ph4 w-33 ml2"
            style={{ width: 'max-content' }}
          >
            SAVE BUDGETS
          </button>
        </div>
      </WindowBox>
    </div>
  );
};

export default SavedBudgets;
