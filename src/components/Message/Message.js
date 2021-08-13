import React from 'react';

/*  
Valid message codes:
App:
'user-logged-in'
Entries:
'budget-name-changed',
'projected-cost-invalid', 'actual-cost-invalid', 'budget-saved',
'budget-copy-created'
Summary:
'projected-monthly-income-updated', 'actual-monthly-income-updated'
Budgets:
'budget-deleted', 'budget-created', 'budgets-saved',
'budgets-created-many', 'budgets-max-allowed'
Profile:
'display-name-changed'
*/

const getMessage = (code, user, formattedBudget) => {
  switch (code) {
    case 'user-logged-in':
      return `Welcome, ${user.displayName}.`;
    case 'budget-name-changed':
      return 'Changed budget name.';
    case 'projected-monthly-income-updated':
      return `Projected monthly income updated to ${formattedBudget.projectedMonthlyIncome}.`;
    case 'actual-monthly-income-updated':
      return `Actual monthly income updated to ${formattedBudget.actualMonthlyIncome}.`;
    case 'projected-cost-invalid':
    case 'actual-cost-invalid':
      return `Invalid input.`;
    case 'budget-saved':
      return user.isGuest ? 'Sign in to save your budgets.' : 'Saved budget.';
    case 'budget-copy-created':
      return 'Created budget copy.';
    case 'budget-deleted':
      return 'Deleted budget.';
    case 'budget-created':
      return 'Created new budget.';
    case 'budgets-saved':
      return user.isGuest
        ? 'Sign in to save your budgets.'
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

const Message = ({ code, user, formattedBudget }) => (
  <span className="message fixed pointer-events-none clr-light fs-body bg--window-box tc mb0 pa4 br3 br--top">
    {getMessage(code, user, formattedBudget)}
  </span>
);

export default Message;
