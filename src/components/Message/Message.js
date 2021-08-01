import React from 'react';

// VALID MESSAGE CODES
// App:
// 'user-logged-in'
// Entries:
// 'projected-cost-invalid', 'actual-cost-invalid'
// Summary:
// 'projected-monthly-income-invalid', 'actual-monthly-income-invalid',
// 'projected-monthly-income-updated', 'actual-monthly-income-updated'
// Budgets:
// 'budget-deleted', 'budget-created', 'budgets-saved',
// 'budgets-created-many', 'budgets-max-allowed'
// Profile:
// 'display-name-changed'

const getMessage = (messageCode, user, formattedBudget) => {
  switch (messageCode) {
    case 'user-logged-in':
      return `Welcome, ${user.displayName}.`;
    case 'projected-cost-invalid':
    case 'actual-cost-invalid':
    case 'projected-monthly-income-invalid':
    case 'actual-monthly-income-invalid':
      return `Invalid input.`;
    case 'projected-monthly-income-updated':
      return `Projected monthly income updated to ${formattedBudget.projectedMonthlyIncome}.`;
    case 'actual-monthly-income-updated':
      return `Actual monthly income updated to ${formattedBudget.actualMonthlyIncome}.`;
    case 'budget-deleted':
      return 'Budget deleted.';
    case 'budget-created':
      return 'Created new budget.';
    case 'budgets-saved':
      return user.isGuest
        ? 'Sign in to save your budgets!'
        : user.budgets.length === 0
        ? 'Saved budgets.'
        : user.budgets.length === 1
        ? 'Saved 1 budget.'
        : `Saved ${user.budgets.length} budgets.`;
    case 'budgets-created-many':
      return `${user.budgets.length} budgets! You're a savvy financial planner.`;
    case 'budgets-max-allowed':
      return "Maximum number of budgets created. That's a lot of budgets!";
    case 'display-name-changed':
      return `Display name changed successfully.`;
    default:
      return null;
  }
};

const Message = ({ messageCode, user, formatter }) => {
  const formattedProjectedMonthlyIncome =
    user.budgets.length > 0
      ? formatter.format(
          user.budgets[user.currentBudgetIndex].projectedMonthlyIncome
        )
      : null;
  const formattedActualMonthlyIncome =
    user.budgets.length > 0
      ? formatter.format(
          user.budgets[user.currentBudgetIndex].actualMonthlyIncome
        )
      : null;

  return messageCode === null ? null : (
    <h2 className="message clr-light fs-body bg--window-box tc mb0 pa4 br3 br--top">
      {getMessage(
        messageCode,
        user,
        formattedProjectedMonthlyIncome,
        formattedActualMonthlyIncome
      )}
    </h2>
  );
};

export default Message;
