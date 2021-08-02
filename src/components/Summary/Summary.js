import React from 'react';

import EditableLabel from 'react-inline-editing';

const getClassListIfNegative = (value) => {
  return value < 0 ? 'clr-red fw3' : '';
};

const Summary = ({
  budget,
  formattedBudget,
  handleFocusActualMonthlyIncome,
  handleFocusProjectedMonthlyIncome,
  handleFocusOutProjectedMonthlyIncome,
  handleFocusOutActualMonthlyIncome,
}) => {
  return (
    <>
      <div className="flex tr">
        <div style={{ width: '22rem' }}>
          <h2 className="clr-light-accent fs-subheading fw3 mb0">
            Total Projected Cost
          </h2>
          <h1 className="clr-light fs-subtitle ff-primary fw3 tr text-break mb5">
            {formattedBudget.projectedCost}
          </h1>

          <h2 className="clr-light-accent fs-subheading fw3 mb0">
            Total Actual Cost
          </h2>
          <h1 className="clr-light fs-subtitle ff-primary fw3 tr text-break mb5">
            {formattedBudget.actualCost}
          </h1>

          <h2 className="clr-light-accent fs-subheading fw3 mb0">
            Total Difference
          </h2>
          <h1 className="clr-light fs-subtitle ff-primary fw3 tr text-break mb0">
            {formattedBudget.differenceCost}
          </h1>
        </div>
        <div
          className="bg--light-accent br-pill mh4"
          style={{ width: '2px' }}
        ></div>
        <div style={{ width: '31.5rem' }}>
          <h2 className="clr-light-accent fs-subheading fw3 mb0 flex justify-end items-center">
            Projected Monthly Income
            <span className="material-icons user-select-none clr-accent-light ml2">
              edit
            </span>
          </h2>

          <div className="mb5">
            <EditableLabel
              text={formattedBudget.projectedMonthlyIncome}
              labelClassName={`clr-light fs-subtitle ff-primary fw3 text-break pointer lh-title ${
                budget.projectedMonthlyIncome === 0 ? 'empty-number-field' : ''
              }`}
              inputClassName="tr br3 mt2 ph3 w-100"
              inputHeight="4rem"
              inputMaxLength={50}
              inputPlaceHolder="Projected monthly income"
              onFocus={handleFocusProjectedMonthlyIncome}
              onFocusOut={handleFocusOutProjectedMonthlyIncome}
              labelStyle={{ lineHeight: '1.2rem' }}
            />
          </div>

          <h2 className="clr-light-accent fs-subheading fw3 mb0 flex justify-end items-center">
            Actual Monthly Income
            <span className="material-icons user-select-none clr-accent-light ml2">
              edit
            </span>
          </h2>
          <EditableLabel
            text={formattedBudget.actualMonthlyIncome}
            labelClassName={`clr-light fs-subtitle ff-primary fw3 mb5 text-break pointer lh-title ${
              budget.actualMonthlyIncome === 0 ? 'empty-number-field' : null
            }`}
            inputClassName="tr br3 mt2 ph3 mb5 w-100"
            inputHeight="4rem"
            inputMaxLength={50}
            inputPlaceHolder="Actual monthly income"
            onFocus={handleFocusActualMonthlyIncome}
            onFocusOut={handleFocusOutActualMonthlyIncome}
          />

          <h2 className="clr-light-accent fs-subheading fw3 mb0">
            Projected Balance
          </h2>
          <h1 className="clr-light fs-subtitle ff-primary fw3 tr text-break mb5">
            {formattedBudget.projectedBalance}
          </h1>

          <h2 className="clr-light-accent fs-subheading fw3 mb0">
            Actual Balance
          </h2>
          <h1 className="clr-light fs-subtitle ff-primary fw3 tr text-break mb5">
            {formattedBudget.actualBalance}
          </h1>

          <h2 className="clr-light-accent fs-subheading fw3 mb0">Difference</h2>
          <h1
            className={`clr-light fs-subtitle ff-primary fw3 tr text-break mb0 ${getClassListIfNegative(
              budget.getDifferenceBalance()
            )}`}
          >
            {formattedBudget.differenceBalance}
          </h1>
        </div>
      </div>
    </>
  );
};

export default Summary;
