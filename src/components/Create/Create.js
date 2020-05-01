import React from 'react';

import Message from '../Message/Message';

import EditableLabel from 'react-inline-editing';

const formatterUnitedStatesDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const formatNegativeValues = (formattedBudget) => {
  const entries = Object.entries(formattedBudget);

  const formattedNegativeValues = entries.map((entry) =>
    entry[1].startsWith('-')
      ? [entry[0], entry[1].replace('-', '(').concat(')')]
      : entry
  );

  return Object.fromEntries(formattedNegativeValues);
};

const formatCurrency = (budget, formatter) => {
  return {
    projectedMonthlyIncome: formatter.format(budget.projectedMonthlyIncome),
    actualMonthlyIncome: formatter.format(budget.actualMonthlyIncome),
    projectedBalance: formatter.format(budget.getProjectedBalance()),
    actualBalance: formatter.format(budget.getActualBalance()),
    differenceBalance: formatter.format(budget.getDifferenceBalance()),
    projectedCost: formatter.format(budget.getProjectedCost()),
    actualCost: formatter.format(budget.getActualCost()),
    differenceCost: formatter.format(budget.getDifferenceCost()),
  };
};

const formatBudget = (budget, formatter) => {
  return formatNegativeValues(formatCurrency(budget, formatter));
};

const formatEntries = (entries, formatter) => {
  if (entries.length === 0) {
    return [];
  } else {
    return entries.map((entry) => {
      return {
        category: entry.category,
        projectedCost: formatter.format(entry.projectedCost),
        actualCost: formatter.format(entry.actualCost),
        difference: formatter.format(entry.getDifference()),
      };
    });
  }
};

const classIfNegative = (value) => {
  return value < 0 ? 'clr-red' : null;
};

const Create = ({
  budget,
  handleCategoryInputChange,
  handleAddEntry,
  inputCategory,
  handleUserClickedDeleteBudget,
  userClickedDeleteBudget,
  handleDeleteBudget,
  handleFocusOutBudgetName,
  handleFocusActualMonthlyIncome,
  handleFocusProjectedMonthlyIncome,
  handleFocusOutProjectedMonthlyIncome,
  handleFocusOutActualMonthlyIncome,
  messageCode,
}) => {
  const formattedBudget = formatBudget(budget, formatterUnitedStatesDollar);
  const formattedEntries = formatEntries(
    budget.entries,
    formatterUnitedStatesDollar
  );

  console.log(formattedBudget);

  return (
    <div className="Create flex items-start justify-center">
      <div className="window-box mw7 mh3">
        <EditableLabel
          value="test"
          text={budget.name}
          labelClassName="overview-box-title flex justify-start text-break mb4"
          inputClassName="window-body ph2 br3 mb5 w-100"
          inputMaxLength={50}
          inputPlaceHolder="Budget name"
          onFocusOut={handleFocusOutBudgetName}
        />
        <h3 className="window-body o-80 flex justify-center items-center mb4 edit">
          Edit
        </h3>
        <h2 className="number-label edit flex items-center">
          Projected Monthly Income
        </h2>
        <EditableLabel
          text={formattedBudget.projectedMonthlyIncome}
          labelClassName={`number mb5 flex justify-end text-break ${classIfNegative(
            budget.projectedMonthlyIncome
          )}`}
          inputClassName="window-body tr mt2 mb5 ph2 br3 w-100"
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
          labelClassName={`number mb5 flex justify-end text-break ${classIfNegative(
            budget.actualMonthlyIncome
          )}`}
          inputClassName="window-body tr mt2 mb5 ph2 br3 w-100"
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
          className={`number tr mb5 ${classIfNegative(
            budget.getProjectedBalance()
          )}`}
        >
          {formattedBudget.projectedBalance}
        </h1>
        <h2 className="number-label">Actual Balance</h2>
        <h1
          className={`number tr mb5 ${classIfNegative(
            budget.getActualBalance()
          )}`}
        >
          {formattedBudget.actualBalance}
        </h1>
        <h2 className="number-label">Balance Difference</h2>
        <h1
          className={`number tr mb5 ${classIfNegative(
            budget.getDifferenceBalance()
          )}`}
        >
          {formattedBudget.differenceBalance}
        </h1>
        <h2 className="number-label">Projected Cost</h2>
        <h1
          className={`number tr mb5 ${classIfNegative(
            budget.getProjectedCost()
          )}`}
        >
          {formattedBudget.projectedCost}
        </h1>
        <h2 className="number-label">Actual Cost</h2>
        <h1
          className={`number tr mb5 ${classIfNegative(budget.getActualCost())}`}
        >
          {formattedBudget.actualCost}
        </h1>
        <h2 className="number-label">Cost Difference</h2>
        <h1
          className={`number tr ${classIfNegative(budget.getDifferenceCost())}`}
        >
          {formattedBudget.differenceCost}
        </h1>
      </div>
      <div className="window-box flex-grow-1 mh3">
        <h1 className="entries-box-title tc mb5">
          Entries ({budget.entries.length})
        </h1>
        <h3 className="white window-body o-80 flex justify-center items-center mb5">
          Click cell to edit
        </h3>
        <div className="add-entry flex justify-center">
          <input
            onChange={handleCategoryInputChange}
            className="placeholder br3 pv2 ph3 mr3 w-33"
            type="text"
            id="name"
            name="name"
            placeholder="Category of entry"
            value={inputCategory}
          />
          <button onClick={handleAddEntry} className="button bg--blue pv2 ph4">
            ADD ENTRY
          </button>
        </div>
        <div className="table-responsive">
          <table className="bg-white mt4 table table-striped table-bordered table-hover">
            <thead className="entry-title">
              <tr>
                <th scope="col" style={{ minWidth: '220px' }}>
                  Category
                </th>
                <th scope="col" style={{ width: '189px' }}>
                  Projected Cost
                </th>
                <th scope="col" style={{ width: '189px' }}>
                  Actual Cost
                </th>
                <th scope="col" style={{ width: '189px' }}>
                  Difference
                </th>
              </tr>
            </thead>
            <tbody className="entry">
              {formattedEntries.map((entry, index) => (
                <tr key={index}>
                  <td className="text-break">{entry.category}</td>
                  <td className="tr">{entry.projectedCost}</td>
                  <td className="tr">{entry.actualCost}</td>
                  <td className="tr">{entry.difference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center pt5 pb3">
          <button className="button bg--green pv3 ph4">SAVE BUDGET</button>

          {userClickedDeleteBudget ? (
            <button
              onClick={handleDeleteBudget}
              onBlur={() => handleUserClickedDeleteBudget(false)}
              className="button bg--dark-red pv3 ph4 ml-auto"
            >
              CONFIRM DELETE
            </button>
          ) : (
            <button
              onClick={() => handleUserClickedDeleteBudget(true)}
              className="button bg--dark-red pv3 ph4 ml-auto"
            >
              DELETE BUDGET
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;
