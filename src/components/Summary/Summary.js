import React from 'react';

import './Summary.scss';

const getClassListIfNegative = (value) => (value < 0 ? 'clr-red fw3' : '');

const Summary = ({
  budget,
  formattedBudget,
  editProjectedMonthlyIncome,
  editActualMonthlyIncome,
  isEditingProjectedMonthlyIncome,
  isEditingActualMonthlyIncome,
  handleProjectedMonthlyIncomeChange,
  handleActualMonthlyIncomeChange,
  handleEnterKey,
  setTooltip,
  clearTooltip,
}) => {
  return (
    <div className="Summary pv5 ph4">
      <div className="flex flex-column items-center">
        <h3 className="clr-light-accent fs-subheading fw3 mb0 flex items-center">
          Projected Monthly Income
          <span
            className={`material-icons user-select-none pointer clr-accent-light hover-opacity ml2
              ${isEditingProjectedMonthlyIncome ? 'visibility-hidden' : ''}
              `}
            onClick={editProjectedMonthlyIncome}
            tabIndex="0"
            onKeyDown={handleEnterKey(editProjectedMonthlyIncome)}
            onMouseMove={(event) =>
              setTooltip('Edit projected monthly income', event)
            }
            onMouseLeave={clearTooltip}
          >
            edit
          </span>
        </h3>

        <div className="mb4 w-100">
          {isEditingProjectedMonthlyIncome ? (
            <input
              className="clr-light placeholder-light-accent bg-transparent fs-subtitle fw3 bn w-100 pv0 ph1 tc"
              onFocus={(event) =>
                (event.target.value = budget.projectedMonthlyIncome
                  ? budget.projectedMonthlyIncome
                  : '')
              }
              onBlur={handleProjectedMonthlyIncomeChange}
              type="number"
              placeholder="0"
              step={500}
              autoFocus={true}
            />
          ) : (
            <h2
              className="clr-light fs-subtitle fw3 bn w-100 pointer lh-copy mb0 tc"
              onClick={editProjectedMonthlyIncome}
            >
              {formattedBudget.projectedMonthlyIncome}
            </h2>
          )}
        </div>

        <h3 className="clr-light-accent fs-subheading fw3 mb0 flex items-center">
          Actual Monthly Income
          <span
            className={`material-icons user-select-none pointer clr-accent-light hover-opacity ml2
              ${isEditingActualMonthlyIncome ? 'visibility-hidden' : ''}
              `}
            onClick={editActualMonthlyIncome}
            tabIndex="0"
            onKeyDown={handleEnterKey(editActualMonthlyIncome)}
            onMouseMove={(event) =>
              setTooltip('Edit actual monthly income', event)
            }
            onMouseLeave={clearTooltip}
          >
            edit
          </span>
        </h3>

        <div className="mb4 w-100">
          {isEditingActualMonthlyIncome ? (
            <input
              className="clr-light placeholder-light-accent bg-transparent fs-subtitle fw3 bn w-100 pv0 ph1 tc"
              onFocus={(event) =>
                (event.target.value = budget.actualMonthlyIncome
                  ? budget.actualMonthlyIncome
                  : '')
              }
              onBlur={handleActualMonthlyIncomeChange}
              type="number"
              placeholder="0"
              step={500}
              autoFocus={true}
            />
          ) : (
            <h2
              className="clr-light fs-subtitle fw3 bn w-100 pointer lh-copy mb0 tc"
              onClick={editActualMonthlyIncome}
            >
              {formattedBudget.actualMonthlyIncome}
            </h2>
          )}
        </div>
      </div>

      <div className="flex tr">
        <div className="overflow-x-auto ph1" style={{ width: '22.2rem' }}>
          <h3 className="clr-light-accent fs-subheading fw3 mb0">
            Total Projected Cost
          </h3>
          <h2 className="clr-light fs-subtitle ff-primary fw3 mb4 lh-copy">
            {formattedBudget.projectedCost}
          </h2>

          <h3 className="clr-light-accent fs-subheading fw3 mb0">
            Total Actual Cost
          </h3>
          <h2 className="clr-light fs-subtitle ff-primary fw3 mb4 lh-copy">
            {formattedBudget.actualCost}
          </h2>

          <h3 className="clr-light-accent fs-subheading fw3 mb0">
            Total Difference
          </h3>
          <h2 className="clr-light fs-subtitle ff-primary fw3 mb0 lh-copy">
            {formattedBudget.differenceCost}
          </h2>
        </div>

        <div
          className="bg--light-accent br-pill mh4"
          style={{ width: '2px' }}
        ></div>

        <div className="overflow-x-auto ph1" style={{ width: '22.2rem' }}>
          <h3 className="clr-light-accent fs-subheading fw3 mb0">
            Projected Balance
          </h3>
          <h2 className="clr-light fs-subtitle ff-primary fw3 mb4 lh-copy">
            {formattedBudget.projectedBalance}
          </h2>

          <h3 className="clr-light-accent fs-subheading fw3 mb0">
            Actual Balance
          </h3>
          <h2 className="clr-light fs-subtitle ff-primary fw3 mb4 lh-copy">
            {formattedBudget.actualBalance}
          </h2>

          <h3 className="clr-light-accent fs-subheading fw3 mb0">Difference</h3>
          <h2
            className={`clr-light fs-subtitle ff-primary fw3 mb0 lh-copy
            ${getClassListIfNegative(budget.getDifferenceBalance())}`}
          >
            {formattedBudget.differenceBalance}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Summary;
