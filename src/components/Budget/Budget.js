import React from 'react';

import WindowBox from '../WindowBox/WindowBox';
import Summary from '../Summary/Summary';
import Entries from '../Entries/Entries';

// Format negative numbers as numbers enclosed in parentheses.
const formatNegativeValues = (formattedBudget) => {
  const entries = Object.entries(formattedBudget);

  const formattedNegativeValues = entries.map((entry) =>
    entry[1].startsWith('-')
      ? [entry[0], entry[1].replace('-', '(').concat(')')]
      : entry
  );

  return Object.fromEntries(formattedNegativeValues);
};

/**
 *
 * @param {object} budget The budget to be formatted (values should be numbers).
 * @param {object} formatter The formatter instantiated with the Intl.NumberFormat() constructor.
 * @returns Formatted budget.
 */
const formatCurrency = (budget, formatter) => {
  return {
    projectedMonthlyIncome: formatter.format(budget.projectedMonthlyIncome),
    actualMonthlyIncome: formatter.format(budget.actualMonthlyIncome),
    projectedBalance: formatter.format(budget.getProjectedBalance()),
    actualBalance: formatter.format(budget.getActualBalance()),
    differenceBalance: formatter.format(budget.getDifferenceBalance()),
    projectedCost: formatter.format(budget.getProjectedCost()),
    actualCost: formatter.format(budget.getActualCost()),
    differenceCost: formatter.format(budget.getDifferenceCost()),
  };
};

// formatBudget formats negative values in pre-formatted budget.
const formatBudget = (budget, formatter) => {
  return formatNegativeValues(formatCurrency(budget, formatter));
};

/**
 *
 * @param {object} entries The entries to be formatted.
 * @param {*} formatter The formatter instantiated with the Intl.NumberFormat() constructor.
 * @returns Formatted entries.
 */
const formatEntries = (entries, formatter) => {
  if (entries.length === 0) return [];
  return entries.map((entry) => {
    return {
      id: entry.id,
      category: entry.category,
      projectedCost: formatter.format(entry.projectedCost),
      actualCost: formatter.format(entry.actualCost),
      difference: formatter.format(entry.getDifference()),
    };
  });
};

const Budget = ({
  budget,
  handleFocusOutBudgetName,
  handleFocusActualMonthlyIncome,
  handleFocusProjectedMonthlyIncome,
  handleFocusOutProjectedMonthlyIncome,
  handleFocusOutActualMonthlyIncome,
  inputCategory,
  handleEntryCategoryInputChange,
  handleEntryCategoryInputKeyDown,
  handleAddEntry,
  handleDeleteEntry,
  handleFocusOutEntryCategory,
  handleFocusOutProjectedCost,
  handleFocusOutActualCost,
  handleUserClickedDeleteBudget,
  clickedDeleteBudget,
  handleDeleteBudget,
  formatter,
}) => {
  const formattedBudget = formatBudget(budget, formatter);
  const formattedEntries = formatEntries(budget.entries, formatter);

  return (
    <div className="Budget flex justify-center items-start mt4 ph4">
      <WindowBox classlist="mh3 flex-grow-1">
        <Entries
          budget={budget}
          formattedEntries={formattedEntries}
          handleFocusOutBudgetName={handleFocusOutBudgetName}
          inputCategory={inputCategory}
          handleEntryCategoryInputChange={handleEntryCategoryInputChange}
          handleEntryCategoryInputKeyDown={handleEntryCategoryInputKeyDown}
          handleAddEntry={handleAddEntry}
          handleDeleteEntry={handleDeleteEntry}
          handleFocusOutEntryCategory={handleFocusOutEntryCategory}
          handleFocusOutProjectedCost={handleFocusOutProjectedCost}
          handleFocusOutActualCost={handleFocusOutActualCost}
          handleUserClickedDeleteBudget={handleUserClickedDeleteBudget}
          clickedDeleteBudget={clickedDeleteBudget}
          handleDeleteBudget={handleDeleteBudget}
        />
      </WindowBox>

      <WindowBox classlist="mh3">
        <Summary
          budget={budget}
          formattedBudget={formattedBudget}
          handleFocusActualMonthlyIncome={handleFocusActualMonthlyIncome}
          handleFocusProjectedMonthlyIncome={handleFocusProjectedMonthlyIncome}
          handleFocusOutProjectedMonthlyIncome={
            handleFocusOutProjectedMonthlyIncome
          }
          handleFocusOutActualMonthlyIncome={handleFocusOutActualMonthlyIncome}
        />
      </WindowBox>
    </div>
  );
};

export default Budget;
