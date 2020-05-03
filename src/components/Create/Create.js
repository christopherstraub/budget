import React from 'react';

import WindowBox from '../WindowBox/WindowBox';
import Overview from '../Overview/Overview';
import Entries from '../Entries/Entries';

import './Create.scss';

const formatterUnitedStatesDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const formatNegativeValues = (formattedBudget) => {
  const entries = Object.entries(formattedBudget);

  const formattedNegativeValues = entries.map((entry) =>
    entry[1].startsWith('-')
      ? [entry[0], entry[1].replace('-', '(').concat(')')]
      : entry
  );

  return Object.fromEntries(formattedNegativeValues);
};

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

const formatBudget = (budget, formatter) => {
  return formatNegativeValues(formatCurrency(budget, formatter));
};

const formatEntries = (entries, formatter) => {
  if (entries.length === 0) {
    return [];
  } else {
    return entries.map((entry) => {
      return {
        category: entry.category,
        projectedCost: formatter.format(entry.projectedCost),
        actualCost: formatter.format(entry.actualCost),
        difference: formatter.format(entry.getDifference()),
      };
    });
  }
};

const Create = ({
  budget,
  handleCategoryInputChange,
  handleAddEntry,
  inputCategory,
  handleUserClickedDeleteBudget,
  userClickedDeleteBudget,
  handleDeleteBudget,
  handleFocusOutBudgetName,
  handleFocusActualMonthlyIncome,
  handleFocusProjectedMonthlyIncome,
  handleFocusOutProjectedMonthlyIncome,
  handleFocusOutActualMonthlyIncome,
  messageCode,
}) => {
  const formattedBudget = formatBudget(budget, formatterUnitedStatesDollar);
  const formattedEntries = formatEntries(
    budget.entries,
    formatterUnitedStatesDollar
  );

  return (
    <div className="Create flex justify-center items-start">
      <WindowBox classList="mh3" style={{ minWidth: '34rem' }}>
        <Overview
          budget={budget}
          formattedBudget={formattedBudget}
          handleFocusOutBudgetName={handleFocusOutBudgetName}
          handleFocusActualMonthlyIncome={handleFocusActualMonthlyIncome}
          handleFocusProjectedMonthlyIncome={handleFocusProjectedMonthlyIncome}
          handleFocusOutProjectedMonthlyIncome={
            handleFocusOutProjectedMonthlyIncome
          }
          handleFocusOutActualMonthlyIncome={handleFocusOutActualMonthlyIncome}
          messageCode={messageCode}
        />
      </WindowBox>

      <WindowBox classList="flex-grow-1 mh3">
        <Entries
          budget={budget}
          formattedEntries={formattedEntries}
          handleCategoryInputChange={handleCategoryInputChange}
          handleAddEntry={handleAddEntry}
          inputCategory={inputCategory}
          handleUserClickedDeleteBudget={handleUserClickedDeleteBudget}
          userClickedDeleteBudget={userClickedDeleteBudget}
          handleDeleteBudget={handleDeleteBudget}
        />
      </WindowBox>
    </div>
  );
};

export default Create;
