import React from 'react';

import Message from '../Message/Message';

import EditableLabel from 'react-inline-editing';

const classListIfNegative = (value) => {
  return value < 0 ? 'clr-red' : null;
};

const Overview = ({ budget, overview }) => {
  return (
    <>
      <EditableLabel
        value="test"
        text={budget.name}
        labelClassName="overview-box-title flex justify-center text-break pointer mb4 edit"
        inputClassName="input-title tc ph2 br3 w-100 mb-input-title"
        inputMaxLength={50}
        inputPlaceHolder="Budget name"
        onFocusOut={overview.handleFocusOutBudgetName}
      />
      <h3 className="window-body o-80 flex justify-center items-center mb4 edit">
        Edit
      </h3>
      <h2 className="number-label edit lh-title">Projected Monthly Income</h2>
      <EditableLabel
        text={overview.formattedBudget.projectedMonthlyIncome}
        labelClassName={`number mb4 flex justify-end text-break pointer ${classListIfNegative(
          budget.projectedMonthlyIncome
        )}`}
        inputClassName="input-number tr mt2 ph2 br3 w-100 mb-input-number"
        inputMaxLength={50}
        inputPlaceHolder="Projected monthly income"
        onFocus={overview.handleFocusProjectedMonthlyIncome}
        onFocusOut={overview.handleFocusOutProjectedMonthlyIncome}
      />
      {overview.messageCode === 'updated-projected-monthly-income' ? (
        <div style={{ marginTop: '-2rem' }}>
          <Message
            message={`Income updated to ${overview.formattedBudget.projectedMonthlyIncome}.`}
          />
        </div>
      ) : overview.messageCode === 'invalid-projected-monthly-income' ? (
        <div style={{ marginTop: '-2rem' }}>
          <Message
            message={`Invalid input. Income still ${overview.formattedBudget.projectedMonthlyIncome}.`}
          />
        </div>
      ) : null}
      <h2 className="number-label edit lh-title">Actual Monthly Income</h2>
      <EditableLabel
        text={overview.formattedBudget.actualMonthlyIncome}
        labelClassName={`number mb4 flex justify-end text-break pointer ${classListIfNegative(
          budget.actualMonthlyIncome
        )}`}
        inputClassName="input-number tr mt2 ph2 br3 w-100 mb-input-number"
        inputMaxLength={50}
        inputPlaceHolder="Actual monthly income"
        onFocus={overview.handleFocusActualMonthlyIncome}
        onFocusOut={overview.handleFocusOutActualMonthlyIncome}
      />
      {overview.messageCode === 'updated-actual-monthly-income' ? (
        <div style={{ marginTop: '-2rem' }}>
          <Message
            message={`Income updated to ${overview.formattedBudget.actualMonthlyIncome}.`}
          />
        </div>
      ) : overview.messageCode === 'invalid-actual-monthly-income' ? (
        <div style={{ marginTop: '-2rem' }}>
          <Message
            message={`Invalid input. Income still ${overview.formattedBudget.actualMonthlyIncome}.`}
          />
        </div>
      ) : null}
      <h2 className="number-label lh-copy">Projected Balance</h2>
      <h1
        className={`number tr mb4 ${classListIfNegative(
          budget.getProjectedBalance()
        )}`}
        style={{ lineHeight: '1.5' }}
      >
        {overview.formattedBudget.projectedBalance}
      </h1>
      <h2 className="number-label lh-copy">Actual Balance</h2>
      <h1
        className={`number tr mb4 ${classListIfNegative(
          budget.getActualBalance()
        )}`}
        style={{ lineHeight: '1.5' }}
      >
        {overview.formattedBudget.actualBalance}
      </h1>
      <h2 className="number-label lh-copy">Balance Difference</h2>
      <h1
        className={`number tr mb4 ${classListIfNegative(
          budget.getDifferenceBalance()
        )}`}
        style={{ lineHeight: '1.5' }}
      >
        {overview.formattedBudget.differenceBalance}
      </h1>
      <h2 className="number-label lh-copy">Projected Cost</h2>
      <h1
        className={`number tr mb4 ${classListIfNegative(
          budget.getProjectedCost()
        )}`}
        style={{ lineHeight: '1.5' }}
      >
        {overview.formattedBudget.projectedCost}
      </h1>
      <h2 className="number-label lh-copy">Actual Cost</h2>
      <h1
        className={`number tr mb4 ${classListIfNegative(
          budget.getActualCost()
        )}`}
        style={{ lineHeight: '1.5' }}
      >
        {overview.formattedBudget.actualCost}
      </h1>
      <h2 className="number-label lh-copy">Cost Difference</h2>
      <h1
        className={`number tr ${classListIfNegative(
          budget.getDifferenceCost()
        )}`}
        style={{ lineHeight: '1.5' }}
      >
        {overview.formattedBudget.differenceCost}
      </h1>
    </>
  );
};

export default Overview;
