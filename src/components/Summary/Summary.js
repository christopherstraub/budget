import React from 'react';

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
  setTooltip,
  clearTooltip,
}) => {
  return (
    <>
      <div className="flex tr">
        <div style={{ maxWidth: '31.2rem' }}>
          <h3 className="clr-light-accent fs-subheading fw3 mb0">
            Total Projected Cost
          </h3>
          <h2 className="clr-light fs-subtitle ff-primary fw3  overflow-x-auto mb4 lh-copy">
            {formattedBudget.projectedCost}
          </h2>

          <h3 className="clr-light-accent fs-subheading fw3 mb0">
            Total Actual Cost
          </h3>
          <h2 className="clr-light fs-subtitle ff-primary fw3  overflow-x-auto mb4 lh-copy">
            {formattedBudget.actualCost}
          </h2>

          <h3 className="clr-light-accent fs-subheading fw3 mb0">
            Total Difference
          </h3>
          <h2 className="clr-light fs-subtitle ff-primary fw3  overflow-x-auto mb0 lh-copy">
            {formattedBudget.differenceCost}
          </h2>
        </div>
        <div
          className="bg--light-accent br-pill mh4"
          style={{ width: '2px' }}
        ></div>
        <div style={{ width: '31.2rem' }}>
          <h3 className="clr-light-accent fs-subheading fw3 mb0 flex justify-end items-center">
            Projected Monthly Income
            <span
              className={`material-icons user-select-none pointer clr-accent-light hover-opacity ml2
              ${isEditingProjectedMonthlyIncome ? 'visibility-hidden' : ''}
              `}
              onClick={editProjectedMonthlyIncome}
              tabIndex="0"
              onKeyDown={handleKeyDown(editProjectedMonthlyIncome)}
              onMouseMove={(event) =>
                setTooltip('edit-projected-monthly-income', event)
              }
              onMouseLeave={clearTooltip}
            >
              edit
            </span>
          </h3>

          <div className="mb4">
            {isEditingProjectedMonthlyIncome ? (
              <input
                className="clr-light placeholder-light-accent bg-transparent fs-subtitle fw3 bn w-100 tc pv0 ph1"
                onFocus={(event) =>
                  (event.target.value = budget.projectedMonthlyIncome)
                }
                onBlur={handleUpdateProjectedMonthlyIncome}
                type="number"
                placeholder="0"
                step={500}
                autoFocus={true}
              />
            ) : (
              <h2
                className="clr-light fs-subtitle fw3 bn w-100 pointer lh-copy overflow-x-auto"
                onClick={editProjectedMonthlyIncome}
              >
                {formattedBudget.projectedMonthlyIncome}
              </h2>
            )}
          </div>

          <h3 className="clr-light-accent fs-subheading fw3 mb0 flex justify-end items-center">
            Actual Monthly Income
            <span
              className={`material-icons user-select-none pointer clr-accent-light hover-opacity ml2
              ${isEditingActualMonthlyIncome ? 'visibility-hidden' : ''}
              `}
              onClick={editActualMonthlyIncome}
              tabIndex="0"
              onKeyDown={handleKeyDown(editActualMonthlyIncome)}
              onMouseMove={(event) =>
                setTooltip('edit-actual-monthly-income', event)
              }
              onMouseLeave={clearTooltip}
            >
              edit
            </span>
          </h3>

          <div className="mb4">
            {isEditingActualMonthlyIncome ? (
              <input
                className="clr-light placeholder-light-accent bg-transparent fs-subtitle fw3 bn w-100 tc pv0 ph1"
                onFocus={(event) =>
                  (event.target.value = budget.actualMonthlyIncome)
                }
                onBlur={handleUpdateActualMonthlyIncome}
                type="number"
                placeholder="0"
                step={500}
                autoFocus={true}
              />
            ) : (
              <h2
                className="clr-light fs-subtitle fw3 bn w-100 pointer lh-copy overflow-x-auto"
                onClick={editActualMonthlyIncome}
              >
                {formattedBudget.actualMonthlyIncome}
              </h2>
            )}
          </div>

          <h3 className="clr-light-accent fs-subheading fw3 mb0">
            Projected Balance
          </h3>
          <h2 className="clr-light fs-subtitle ff-primary fw3  overflow-x-auto mb4 lh-copy">
            {formattedBudget.projectedBalance}
          </h2>

          <h3 className="clr-light-accent fs-subheading fw3 mb0">
            Actual Balance
          </h3>
          <h2 className="clr-light fs-subtitle ff-primary fw3  overflow-x-auto mb4 lh-copy">
            {formattedBudget.actualBalance}
          </h2>

          <h3 className="clr-light-accent fs-subheading fw3 mb0">Difference</h3>
          <h2
            className={`clr-light fs-subtitle ff-primary fw3  overflow-x-auto mb0 lh-copy
            ${getClassListIfNegative(budget.getDifferenceBalance())}`}
          >
            {formattedBudget.differenceBalance}
          </h2>
        </div>
      </div>
    </>
  );
};

export default Summary;
