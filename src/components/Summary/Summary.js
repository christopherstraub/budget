import React from 'react';

import EditableLabel from 'react-inline-editing';

const getClassListIfNegative = (value) => {
  return value < 0 ? 'clr-red fw3' : '';
};

const Summary = ({
  budget,
  formattedBudget,
  editProjectedMonthlyIncome,
  editActualMonthlyIncome,
  isEditingProjectedMonthlyIncome,
  isEditingActualMonthlyIncome,
  handleUpdateProjectedMonthlyIncome,
  handleUpdateActualMonthlyIncome,
  handleKeyDown,
  input,
  setMessage,
  clearMessage,
  messageCode,
}) => {
  return (
    <>
      <div className="flex tr">
        <div style={{ maxWidth: '32rem' }}>
          <h2 className="clr-light-accent fs-subheading fw3 mb0">
            Total Projected Cost
          </h2>
          <h1 className="clr-light fs-subtitle ff-primary fw3 text-break mb5">
            {formattedBudget.projectedCost}
          </h1>

          <h2 className="clr-light-accent fs-subheading fw3 mb0">
            Total Actual Cost
          </h2>
          <h1 className="clr-light fs-subtitle ff-primary fw3 text-break mb5">
            {formattedBudget.actualCost}
          </h1>

          <h2 className="clr-light-accent fs-subheading fw3 mb0">
            Total Difference
          </h2>
          <h1 className="clr-light fs-subtitle ff-primary fw3 text-break mb0">
            {formattedBudget.differenceCost}
          </h1>
        </div>
        <div
          className="bg--light-accent br-pill mh4"
          style={{ width: '2px' }}
        ></div>
        <div style={{ width: '32rem' }}>
          <h2 className="clr-light-accent fs-subheading fw3 mb0 flex justify-end items-center">
            Projected Monthly Income
            <span
              className="material-icons user-select-none pointer clr-accent-light hover-opacity ml2"
              onClick={editProjectedMonthlyIncome}
              tabIndex="0"
              onKeyDown={handleKeyDown(editProjectedMonthlyIncome)}
              onMouseEnter={() => setMessage('edit-projected-monthly-income')}
              onMouseLeave={() => {
                if (messageCode === 'edit-projected-monthly-income')
                  clearMessage(0);
              }}
            >
              edit
            </span>
          </h2>

          <div className="mb5">
            {isEditingProjectedMonthlyIncome ? (
              <input
                className="clr-light bg-transparent fs-subtitle fw3 bn w-100 tc pv0 ph1 lh-title"
                onFocus={(event) =>
                  (event.target.value = budget.projectedMonthlyIncome)
                }
                onBlur={handleUpdateProjectedMonthlyIncome}
                type="number"
                min={input.income.min}
                max={input.income.max}
                placeholder="0"
                autoFocus={true}
              />
            ) : (
              <label
                className="clr-light fs-subtitle fw3 bn w-100 pointer text-break lh-title"
                onClick={editProjectedMonthlyIncome}
              >
                {formattedBudget.projectedMonthlyIncome}
              </label>
            )}
          </div>

          <h2 className="clr-light-accent fs-subheading fw3 mb0 flex justify-end items-center">
            Actual Monthly Income
            <span
              className="material-icons user-select-none pointer clr-accent-light hover-opacity ml2"
              onClick={editActualMonthlyIncome}
              tabIndex="0"
              onKeyDown={handleKeyDown(editActualMonthlyIncome)}
              onMouseEnter={() => setMessage('edit-actual-monthly-income')}
              onMouseLeave={() => {
                if (messageCode === 'edit-actual-monthly-income')
                  clearMessage(0);
              }}
            >
              edit
            </span>
          </h2>

          <div className="mb5">
            {isEditingActualMonthlyIncome ? (
              <input
                className="clr-light bg-transparent fs-subtitle fw3 bn w-100 tc pv0 ph1 lh-title"
                onFocus={(event) =>
                  (event.target.value = budget.actualMonthlyIncome)
                }
                onBlur={handleUpdateActualMonthlyIncome}
                type="number"
                min={input.income.min}
                max={input.income.max}
                placeholder="0"
                autoFocus={true}
              />
            ) : (
              <label
                className="clr-light fs-subtitle fw3 bn w-100 pointer text-break lh-title"
                onClick={editActualMonthlyIncome}
              >
                {formattedBudget.actualMonthlyIncome}
              </label>
            )}
          </div>

          <h2 className="clr-light-accent fs-subheading fw3 mb0">
            Projected Balance
          </h2>
          <h1 className="clr-light fs-subtitle ff-primary fw3 text-break mb5">
            {formattedBudget.projectedBalance}
          </h1>

          <h2 className="clr-light-accent fs-subheading fw3 mb0">
            Actual Balance
          </h2>
          <h1 className="clr-light fs-subtitle ff-primary fw3 text-break mb5">
            {formattedBudget.actualBalance}
          </h1>

          <h2 className="clr-light-accent fs-subheading fw3 mb0">Difference</h2>
          <h1
            className={`clr-light fs-subtitle ff-primary fw3 text-break mb0 ${getClassListIfNegative(
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
