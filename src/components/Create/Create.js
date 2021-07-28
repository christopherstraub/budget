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

// formatCurrency returns an object with formatted values to be display in the Summary component.
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

// Format entries returns a formatted entries object. If no entries, returns an empty array.
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

const Create = ({
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
  userClickedDeleteBudget,
  handleDeleteBudget,
  formatter,
}) => {
  const formattedBudget = formatBudget(budget, formatter);
  const formattedEntries = formatEntries(budget.entries, formatter);

  return (
    <div className="Create flex justify-center items-start mt4 ph4">
      <WindowBox classlist="flex-grow-1 mh3">
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
          userClickedDeleteBudget={userClickedDeleteBudget}
          handleDeleteBudget={handleDeleteBudget}
        />
      </WindowBox>

      <WindowBox classList="mh3" style={{ maxWidth: '350px' }}>
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

export default Create;
