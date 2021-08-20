import React from 'react';

import WindowBox from '../WindowBox/WindowBox';
import Summary from '../Summary/Summary';
import Entries from '../Entries/Entries';

import './Budget.scss';

const Budget = ({
  budget,
  formattedBudget,
  entries,
  formattedEntries,
  currentBudgetIndex,
  editBudgetName,
  editProjectedMonthlyIncome,
  editActualMonthlyIncome,
  isEditingBudgetName,
  isEditingProjectedMonthlyIncome,
  isEditingActualMonthlyIncome,
  handleUpdateBudgetName,
  handleUpdateProjectedMonthlyIncome,
  handleUpdateActualMonthlyIncome,
  handleAddEntryInputChange,
  handleKeyDown,
  handleAddEntry,
  handleDeleteEntry,
  editCategory,
  editProjectedCost,
  editActualCost,
  isEditingCategory,
  isEditingProjectedCost,
  isEditingActualCost,
  isEditingEntryId,
  handleUpdateCategory,
  handleUpdateProjectedCost,
  handleUpdateActualCost,
  handleSaveBudget,
  handleCreateBudgetCopy,
  handleUserClickedDeleteBudget,
  handleDeleteBudget,
  clickedDeleteBudget,
  input,
  setTooltip,
  clearTooltip,
  toggledExpandNav,
}) => (
  <div className="Budget flex items-start pa4">
    <WindowBox classlist="flex-grow-1 mh3" toggledExpandNav={toggledExpandNav}>
      <Entries
        budget={budget}
        entries={entries}
        formattedEntries={formattedEntries}
        currentBudgetIndex={currentBudgetIndex}
        editBudgetName={editBudgetName}
        isEditingBudgetName={isEditingBudgetName}
        handleUpdateBudgetName={handleUpdateBudgetName}
        handleAddEntryInputChange={handleAddEntryInputChange}
        handleKeyDown={handleKeyDown}
        handleAddEntry={handleAddEntry}
        handleDeleteEntry={handleDeleteEntry}
        editCategory={editCategory}
        editProjectedCost={editProjectedCost}
        editActualCost={editActualCost}
        isEditingCategory={isEditingCategory}
        isEditingProjectedCost={isEditingProjectedCost}
        isEditingActualCost={isEditingActualCost}
        isEditingEntryId={isEditingEntryId}
        handleUpdateCategory={handleUpdateCategory}
        handleUpdateProjectedCost={handleUpdateProjectedCost}
        handleUpdateActualCost={handleUpdateActualCost}
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

    <WindowBox classlist="mh3" toggledExpandNav={toggledExpandNav}>
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
        setTooltip={setTooltip}
        clearTooltip={clearTooltip}
      />
    </WindowBox>
  </div>
);

export default Budget;
