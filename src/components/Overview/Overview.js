import React from 'react';

import Message from '../Message/Message';

import EditableLabel from 'react-inline-editing';

const classListIfNegative = (value) => {
  return value < 0 ? 'clr-red' : null;
};

const Overview = ({ budget, overview, messageCode }) => {
  return (
    <>
      <EditableLabel
        value="test"
        text={budget.name}
        labelClassName="overview-box-title flex justify-center text-break pointer mb4 edit"
        inputClassName="input-overview-box-title tc br3 ph2 mb4 w-100"
        inputHeight="1.5em"
        inputMaxLength={50}
        inputPlaceHolder="Budget name"
        onFocusOut={overview.handleFocusOutBudgetName}
      />
      <h3
        className="window-body o-80 flex justify-center items-center mb4 edit"
        style={{
          textShadow: '2px 1px 1px #302e2e',
        }}
      >
        Edit
      </h3>
      <h2 className="number-label edit lh-title">Projected Monthly Income</h2>
      <EditableLabel
        text={overview.formattedBudget.projectedMonthlyIncome}
        labelClassName={`number mb4 flex justify-end text-break pointer ${classListIfNegative(
          budget.projectedMonthlyIncome
        )}`}
        inputClassName="input-income tr br3 mt2 ph2 mb-input-income w-100"
        inputHeight="1.5em"
        inputMaxLength={50}
        inputPlaceHolder="Projected monthly income"
        onFocus={overview.handleFocusProjectedMonthlyIncome}
        onFocusOut={overview.handleFocusOutProjectedMonthlyIncome}
      />
      {messageCode === 'updated-projected-monthly-income' ? (
        <div className="mb4" style={{ marginTop: '-1rem' }}>
          <Message
            message={`Income updated to ${overview.formattedBudget.projectedMonthlyIncome}.`}
          />
        </div>
      ) : messageCode === 'invalid-projected-monthly-income' ? (
        <div className="mb4" style={{ marginTop: '-1rem' }}>
          <Message
            message={`Input invalid. Income still ${overview.formattedBudget.projectedMonthlyIncome}.`}
          />
        </div>
      ) : null}
      <h2 className="number-label edit lh-title">Actual Monthly Income</h2>
      <EditableLabel
        text={overview.formattedBudget.actualMonthlyIncome}
        labelClassName={`number mb4 flex justify-end text-break pointer ${classListIfNegative(
          budget.actualMonthlyIncome
        )}`}
        inputClassName="input-income tr br3 mt2 ph2 mb-input-income w-100"
        inputHeight="1.5em"
        inputMaxLength={50}
        inputPlaceHolder="Actual monthly income"
        onFocus={overview.handleFocusActualMonthlyIncome}
        onFocusOut={overview.handleFocusOutActualMonthlyIncome}
      />
      {messageCode === 'updated-actual-monthly-income' ? (
        <div className="mb4" style={{ marginTop: '-1rem' }}>
          <Message
            message={`Income updated to ${overview.formattedBudget.actualMonthlyIncome}.`}
          />
        </div>
      ) : messageCode === 'invalid-actual-monthly-income' ? (
        <div className="mb4" style={{ marginTop: '-1rem' }}>
          <Message
            message={`Input invalid. Income still ${overview.formattedBudget.actualMonthlyIncome}.`}
          />
        </div>
      ) : null}
      <h2 className="number-label lh-copy">Projected Balance</h2>
      <h1
        className={`number tr text-break mb4 ${classListIfNegative(
          budget.getProjectedBalance()
        )}`}
        style={{ lineHeight: '1.5' }}
      >
        {overview.formattedBudget.projectedBalance}
      </h1>
      <h2 className="number-label lh-copy">Actual Balance</h2>
      <h1
        className={`number tr text-break mb4 ${classListIfNegative(
          budget.getActualBalance()
        )}`}
        style={{ lineHeight: '1.5' }}
      >
        {overview.formattedBudget.actualBalance}
      </h1>
      <h2 className="number-label lh-copy">Balance Difference</h2>
      <h1
        className={`number tr text-break mb4 ${classListIfNegative(
          budget.getDifferenceBalance()
        )}`}
        style={{ lineHeight: '1.5' }}
      >
        {overview.formattedBudget.differenceBalance}
      </h1>
      <h2 className="number-label lh-copy">Projected Cost</h2>
      <h1
        className={`number tr text-break mb4 ${classListIfNegative(
          budget.getProjectedCost()
        )}`}
        style={{ lineHeight: '1.5' }}
      >
        {overview.formattedBudget.projectedCost}
      </h1>
      <h2 className="number-label lh-copy">Actual Cost</h2>
      <h1
        className={`number tr text-break mb4 ${classListIfNegative(
          budget.getActualCost()
        )}`}
        style={{ lineHeight: '1.5' }}
      >
        {overview.formattedBudget.actualCost}
      </h1>
      <h2 className="number-label lh-copy">Cost Difference</h2>
      <h1
        className={`number tr text-break ${classListIfNegative(
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
