import React from 'react';

import WindowBox from '../WindowBox/WindowBox';
import Summary from '../Summary/Summary';
import Entries from '../Entries/Entries';

const Budget = ({
  budget,
  formattedBudget,
  formattedEntries,
  handleFocusOutBudgetName,
  handleFocusActualMonthlyIncome,
  handleFocusProjectedMonthlyIncome,
  handleFocusOutProjectedMonthlyIncome,
  handleFocusOutActualMonthlyIncome,
  inputEntryCategory,
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
}) => {
  return (
    <div className="Budget flex justify-center items-start pa4">
      <WindowBox classlist="flex-grow-1 mh3">
        <Entries
          budget={budget}
          formattedEntries={formattedEntries}
          handleFocusOutBudgetName={handleFocusOutBudgetName}
          inputEntryCategory={inputEntryCategory}
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
