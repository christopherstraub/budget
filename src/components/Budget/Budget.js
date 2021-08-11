import React from 'react';

import WindowBox from '../WindowBox/WindowBox';
import Summary from '../Summary/Summary';
import Entries from '../Entries/Entries';

const Budget = ({
  budget,
  currentBudgetIndex,
  formattedBudget,
  formattedEntries,
  isEditingBudgetName,
  editBudgetName,
  handleBudgetNameChange,
  handleFocusProjectedMonthlyIncome,
  handleFocusActualMonthlyIncome,
  handleFocusOutProjectedMonthlyIncome,
  handleFocusOutActualMonthlyIncome,
  inputEntryCategory,
  handleEntryCategoryInputChange,
  handleKeyDown,
  handleAddEntry,
  handleDeleteEntry,
  handleFocusOutEntryCategory,
  handleFocusOutProjectedCost,
  handleFocusOutActualCost,
  handleSaveBudget,
  handleCreateBudgetCopy,
  handleUserClickedDeleteBudget,
  handleDeleteBudget,
  clickedDeleteBudget,
  setMessage,
  clearMessage,
}) => {
  return (
    <div className="Budget flex justify-center items-start pa4">
      <WindowBox classlist="flex-grow-1 mh3">
        <Entries
          budget={budget}
          currentBudgetIndex={currentBudgetIndex}
          formattedEntries={formattedEntries}
          isEditingBudgetName={isEditingBudgetName}
          editBudgetName={editBudgetName}
          handleBudgetNameChange={handleBudgetNameChange}
          inputEntryCategory={inputEntryCategory}
          handleEntryCategoryInputChange={handleEntryCategoryInputChange}
          handleKeyDown={handleKeyDown}
          handleAddEntry={handleAddEntry}
          handleDeleteEntry={handleDeleteEntry}
          handleFocusOutEntryCategory={handleFocusOutEntryCategory}
          handleFocusOutProjectedCost={handleFocusOutProjectedCost}
          handleFocusOutActualCost={handleFocusOutActualCost}
          handleSaveBudget={handleSaveBudget}
          handleCreateBudgetCopy={handleCreateBudgetCopy}
          handleUserClickedDeleteBudget={handleUserClickedDeleteBudget}
          handleDeleteBudget={handleDeleteBudget}
          clickedDeleteBudget={clickedDeleteBudget}
          setMessage={setMessage}
          clearMessage={clearMessage}
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
