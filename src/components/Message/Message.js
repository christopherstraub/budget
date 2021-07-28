import React from 'react';

// VALID MESSAGE CODES
// Entries:
// 'projected-cost-updated', 'projected-cost-invalid',
// 'actual-cost-updated', 'actual-cost-invalid',
// Summary:
// 'projected-monthly-income-updated', 'projected-monthly-income-invalid',
// actual-monthly-income-updated', 'actual-monthly-income-invalid',
// Budgets:
// 'budget-deleted', 'budget-created', 'budgets-saved',
// 'budgets-max-allowed',
// Profile:
// 'name-changed', 'background-changed'

const getMessage = (
  messageCode,
  projectedMonthlyIncome,
  actualMonthlyIncome
) => {
  switch (messageCode) {
    case 'projected-monthly-income-updated':
      return `Income updated to ${projectedMonthlyIncome}.`;
    case 'projected-monthly-income-invalid':
      return `Input invalid. Income still ${projectedMonthlyIncome}.`;
    case 'actual-monthly-income-updated':
      return `Income updated to ${actualMonthlyIncome}.`;
    case 'actual-monthly-income-invalid':
      return `Input invalid. Income still ${actualMonthlyIncome}.`;
    case 'projected-cost-updated':
      return 'Projected cost updated.';
    case 'projected-cost-invalid':
      return 'Projected cost invalid.';
    case 'actual-cost-updated':
      return 'Actual cost updated.';
    case 'actual-cost-invalid':
      return 'Actual cost invalid.';
    case 'budget-deleted':
      return 'Budget deleted.';
    case 'budget-created':
      return 'Budget created.';
    case 'budgets-saved':
      return 'Budgets saved.';
    case 'budgets-max-allowed':
      return "Maximum number of budgets created. You're an excellent financial planner!";
    case 'name-changed':
      return 'Name changed.';
    case 'background-changed':
      return 'Background changed.';
    default:
      return null;
  }
};

const Message = ({
  messageCode,
  projectedMonthlyIncome,
  actualMonthlyIncome,
}) => {
  return messageCode === null ? null : (
    <h2 className="message bg--window-box tc text-break mb0 p-5 br3 br--top">
      {getMessage(messageCode, projectedMonthlyIncome, actualMonthlyIncome)}
    </h2>
  );
};

export default Message;
