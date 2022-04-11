import React from 'react';
import { Helmet } from 'react-helmet';

import WindowBox from '../WindowBox/WindowBox';
import Summary from '../Summary/Summary';
import Entries from '../Entries/Entries';

import './Budget.scss';

const Budget = ({
  budget,
  formattedBudget,
  entries,
  formattedEntries,
  editBudgetName,
  editProjectedMonthlyIncome,
  editActualMonthlyIncome,
  isEditingBudgetName,
  isEditingProjectedMonthlyIncome,
  isEditingActualMonthlyIncome,
  handleBudgetNameChange,
  handleProjectedMonthlyIncomeChange,
  handleActualMonthlyIncomeChange,
  handleAddEntryInputChange,
  handleEnterKey,
  handleAddEntry,
  handleDeleteEntry,
  editCategory,
  editProjectedCost,
  editActualCost,
  isEditingCategory,
  isEditingProjectedCost,
  isEditingActualCost,
  isEditingEntryId,
  handleCategoryChange,
  handleProjectedCostChange,
  handleActualCostChange,
  handleSaveBudget,
  handleCreateBudgetCopy,
  handleClickedDeleteBudget,
  handleDeleteBudget,
  clickedDeleteBudget,
  input,
  setTooltip,
  clearTooltip,
  toggledExpandNav,
}) => (
  <div className="Budget flex items-start pa4">
    <Helmet>
      <title>View Budget | CSBudget</title>
    </Helmet>
    <WindowBox classlist="flex-grow-1 mh3" toggledExpandNav={toggledExpandNav}>
      <Entries
        budget={budget}
        entries={entries}
        formattedEntries={formattedEntries}
        editBudgetName={editBudgetName}
        isEditingBudgetName={isEditingBudgetName}
        handleBudgetNameChange={handleBudgetNameChange}
        handleAddEntryInputChange={handleAddEntryInputChange}
        handleEnterKey={handleEnterKey}
        handleAddEntry={handleAddEntry}
        handleDeleteEntry={handleDeleteEntry}
        editCategory={editCategory}
        editProjectedCost={editProjectedCost}
        editActualCost={editActualCost}
        isEditingCategory={isEditingCategory}
        isEditingProjectedCost={isEditingProjectedCost}
        isEditingActualCost={isEditingActualCost}
        isEditingEntryId={isEditingEntryId}
        handleCategoryChange={handleCategoryChange}
        handleProjectedCostChange={handleProjectedCostChange}
        handleActualCostChange={handleActualCostChange}
        handleSaveBudget={handleSaveBudget}
        handleCreateBudgetCopy={handleCreateBudgetCopy}
        handleClickedDeleteBudget={handleClickedDeleteBudget}
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
        handleProjectedMonthlyIncomeChange={handleProjectedMonthlyIncomeChange}
        handleActualMonthlyIncomeChange={handleActualMonthlyIncomeChange}
        handleEnterKey={handleEnterKey}
        setTooltip={setTooltip}
        clearTooltip={clearTooltip}
      />
    </WindowBox>
  </div>
);

export default Budget;
