import React from 'react';

import WindowBox from '../WindowBox/WindowBox';

const SavedBudgets = ({
  user,
  handleCreateBudget,
  handleViewBudget,
  handleSaveBudgets,
  currentBudgetIndex,
  handleKeyDown,
  toggledExpandNav,
}) => {
  return (
    <div className="flex justify-center pa4 tc">
      <WindowBox classlist="mw7 w-100" toggledExpandNav={toggledExpandNav}>
        <div className="pv5 ph4">
          <h1 className="clr-light fs-subheading fw3 mb3 text-break">
            {user.budgets.length === 0 ? (
              `${user.displayName}, you don't have any budgets.`
            ) : user.budgets.length === 1 ? (
              `${user.displayName}, here's your budget.`
            ) : (
              <>
                {user.displayName}, here are your{' '}
                <span className="clr-accent-light fw6">
                  {' '}
                  {user.budgets.length}{' '}
                </span>
                budgets.
              </>
            )}
          </h1>

          <ul className="list pl0">
            {user.budgets.length === 0
              ? null
              : user.budgets.map((budget, index) => (
                  <li
                    key={budget.id}
                    onClick={() => handleViewBudget(index)}
                    tabIndex={0}
                    onKeyDown={handleKeyDown(() => handleViewBudget(index))}
                    className={`clr-light fs-subtitle fw3 hover-opacity pointer text-break mv3 ph1
                  ${
                    index === currentBudgetIndex ? 'clr-accent-light fw6' : ''
                  }`}
                  >
                    {budget.name}
                  </li>
                ))}
          </ul>

          <div className="flex mt5">
            <button
              onClick={handleCreateBudget}
              className="clr-light fs-body ff-mono fw3 ttc selection-transparent hover-opacity br3 bn bg--accent-dark pa3 mr2 w-100"
              style={{ width: 'max-content' }}
            >
              new budget
            </button>
            <button
              onClick={handleSaveBudgets}
              className="clr-light fs-body ff-mono fw3 ttc selection-transparent hover-opacity br3 bn bg--green pa3 ml2 w-100"
              style={{ width: 'max-content' }}
            >
              save budgets
            </button>
          </div>
        </div>
      </WindowBox>
    </div>
  );
};

export default SavedBudgets;
