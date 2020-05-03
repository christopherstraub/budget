import React from 'react';

import Message from '../Message/Message';

import EditableLabel from 'react-inline-editing';

const classListIfNegative = (value) => {
  return value < 0 ? 'clr-red' : null;
};

const Overview = ({
  budget,
  formattedBudget,
  handleFocusOutBudgetName,
  handleFocusActualMonthlyIncome,
  handleFocusProjectedMonthlyIncome,
  handleFocusOutProjectedMonthlyIncome,
  handleFocusOutActualMonthlyIncome,
  messageCode,
}) => {
  return (
    <>
      <EditableLabel
        value="test"
        text={budget.name}
        labelClassName="overview-box-title flex justify-center text-break pointer mb4 edit"
        inputClassName="input-title tc ph2 br3 w-100 mb-input-title"
        inputMaxLength={50}
        inputPlaceHolder="Budget name"
        onFocusOut={handleFocusOutBudgetName}
      />
      <h3 className="window-body o-80 flex justify-center items-center mb4 edit">
        Edit
      </h3>
      <h2 className="number-label edit">Projected Monthly Income</h2>
      <EditableLabel
        text={formattedBudget.projectedMonthlyIncome}
        labelClassName={`number mb5 flex justify-end text-break pointer ${classListIfNegative(
          budget.projectedMonthlyIncome
        )}`}
        inputClassName="input-number tr mt2 ph2 br3 w-100 mb-input-number"
        inputMaxLength={50}
        inputPlaceHolder="Projected monthly income"
        onFocus={handleFocusProjectedMonthlyIncome}
        onFocusOut={handleFocusOutProjectedMonthlyIncome}
      />
      {messageCode === 'updated-projected-monthly-income' ? (
        <Message
          message={`Income updated to ${formattedBudget.projectedMonthlyIncome}.`}
        />
      ) : messageCode === 'invalid-projected-monthly-income' ? (
        <Message
          message={`Invalid input. Income still ${formattedBudget.projectedMonthlyIncome}.`}
        />
      ) : null}
      <h2 className="number-label edit flex items-center">
        Actual Monthly Income
      </h2>
      <EditableLabel
        text={formattedBudget.actualMonthlyIncome}
        labelClassName={`number mb5 flex justify-end text-break pointer ${classListIfNegative(
          budget.actualMonthlyIncome
        )}`}
        inputClassName="input-number tr mt2 ph2 br3 w-100 mb-input-number"
        inputMaxLength={50}
        inputPlaceHolder="Actual monthly income"
        onFocus={handleFocusActualMonthlyIncome}
        onFocusOut={handleFocusOutActualMonthlyIncome}
      />
      {messageCode === 'updated-actual-monthly-income' ? (
        <Message
          message={`Income updated to ${formattedBudget.actualMonthlyIncome}.`}
        />
      ) : messageCode === 'invalid-actual-monthly-income' ? (
        <Message
          message={`Invalid input. Income still ${formattedBudget.actualMonthlyIncome}.`}
        />
      ) : null}
      <h2 className="number-label">Projected Balance</h2>
      <h1
        className={`number tr mb5 ${classListIfNegative(
          budget.getProjectedBalance()
        )}`}
      >
        {formattedBudget.projectedBalance}
      </h1>
      <h2 className="number-label">Actual Balance</h2>
      <h1
        className={`number tr mb5 ${classListIfNegative(
          budget.getActualBalance()
        )}`}
      >
        {formattedBudget.actualBalance}
      </h1>
      <h2 className="number-label">Balance Difference</h2>
      <h1
        className={`number tr mb5 ${classListIfNegative(
          budget.getDifferenceBalance()
        )}`}
      >
        {formattedBudget.differenceBalance}
      </h1>
      <h2 className="number-label">Projected Cost</h2>
      <h1
        className={`number tr mb5 ${classListIfNegative(
          budget.getProjectedCost()
        )}`}
      >
        {formattedBudget.projectedCost}
      </h1>
      <h2 className="number-label">Actual Cost</h2>
      <h1
        className={`number tr mb5 ${classListIfNegative(
          budget.getActualCost()
        )}`}
      >
        {formattedBudget.actualCost}
      </h1>
      <h2 className="number-label">Cost Difference</h2>
      <h1
        className={`number tr ${classListIfNegative(
          budget.getDifferenceCost()
        )}`}
      >
        {formattedBudget.differenceCost}
      </h1>
    </>
  );
};

export default Overview;
