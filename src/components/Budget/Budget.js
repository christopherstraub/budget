import React from 'react';

import WindowBox from '../WindowBox/WindowBox';
import Summary from '../Summary/Summary';
import Entries from '../Entries/Entries';

const Budget = ({
  budget,
  currentBudgetIndex,
  formattedBudget,
  formattedEntries,
  editBudgetName,
  editProjectedMonthlyIncome,
  editActualMonthlyIncome,
  isEditingBudgetName,
  isEditingProjectedMonthlyIncome,
  isEditingActualMonthlyIncome,
  handleUpdateBudgetName,
  handleUpdateProjectedMonthlyIncome,
  handleUpdateActualMonthlyIncome,
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
  input,
  setTooltip,
  clearTooltip,
}) => (
  <div className="Budget flex justify-center items-start pa4">
    <WindowBox classlist="flex-grow-1 mh3">
      <Entries
        budget={budget}
        currentBudgetIndex={currentBudgetIndex}
        formattedEntries={formattedEntries}
        editBudgetName={editBudgetName}
        isEditingBudgetName={isEditingBudgetName}
        handleUpdateBudgetName={handleUpdateBudgetName}
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
        input={input}
        setTooltip={setTooltip}
        clearTooltip={clearTooltip}
      />
    </WindowBox>

    <WindowBox classlist="mh3">
      <Summary
        budget={budget}
        formattedBudget={formattedBudget}
        editProjectedMonthlyIncome={editProjectedMonthlyIncome}
        editActualMonthlyIncome={editActualMonthlyIncome}
        isEditingProjectedMonthlyIncome={isEditingProjectedMonthlyIncome}
        isEditingActualMonthlyIncome={isEditingActualMonthlyIncome}
        handleUpdateProjectedMonthlyIncome={handleUpdateProjectedMonthlyIncome}
        handleUpdateActualMonthlyIncome={handleUpdateActualMonthlyIncome}
        handleKeyDown={handleKeyDown}
        input={input}
        setTooltip={setTooltip}
        clearTooltip={clearTooltip}
      />
    </WindowBox>
  </div>
);

export default Budget;
