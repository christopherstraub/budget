import React from 'react';

import Message from '../Message/Message';

import EditableLabel from 'react-inline-editing';

const formatterUnitedStatesDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const formatBudget = (budget, formatter) => {
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

const Create = ({
  budget,
  handleCategoryInputChange,
  handleAddEntry,
  inputCategory,
  handleUserClickedDeleteBudget,
  userClickedDeleteBudget,
  handleDeleteBudget,
  handleFocusOutBudgetName,
  handleFocusBudgetMonthlyIncome,
  handleFocusOutBudgetMonthlyIncome,
  messageCode,
}) => {
  const formattedBudget = formatBudget(budget, formatterUnitedStatesDollar);
  const formattedEntries = formatEntries(
    budget.entries,
    formatterUnitedStatesDollar
  );

  console.log(budget);

  return (
    <div className="Create flex items-start justify-center">
      <div className="window-box mw7 mh3 mb5 relative">
        {messageCode === 'updated-income' ? (
          <Message message="Income updated." />
        ) : messageCode === 'invalid-income' ? (
          <Message message="Income invalid." invalid={true} />
        ) : null}
        <EditableLabel
          value="test"
          text={budget.name}
          labelClassName="overview-box-title flex justify-start text-break"
          inputClassName="window-body mb2 ph2 br3 mb4"
          inputMaxLength={50}
          inputPlaceHolder="Budget name"
          onFocusOut={(text) => handleFocusOutBudgetName(text, budget.id)}
        />
        <p className="window-body o-80 flex justify-center items-center mb4 edit">
          Click field to edit
        </p>
        <h2 className="number-label edit flex items-center">
          Projected Monthly Income
        </h2>
        <EditableLabel
          text={formattedBudget.projectedMonthlyIncome}
          labelClassName="number mb4 flex justify-center text-break"
          inputClassName="window-body tc mt2 mb4 ph2 br3"
          inputMaxLength={50}
          inputPlaceHolder="Projected monthly income"
          onFocus={(text) => handleFocusBudgetMonthlyIncome(text, 'projected')}
          onFocusOut={(text) =>
            handleFocusOutBudgetMonthlyIncome(text, budget.id, 'projected')
          }
        />
        <h2 className="number-label edit flex items-center">
          Actual Monthly Income
        </h2>
        <EditableLabel
          text={formattedBudget.actualMonthlyIncome}
          labelClassName="number mb4 flex justify-center text-break"
          inputClassName="window-body tc mt2 mb4 ph2 br3"
          inputMaxLength={50}
          inputPlaceHolder="Actual monthly income"
          onFocus={(text) => handleFocusBudgetMonthlyIncome(text, 'actual')}
          onFocusOut={(text) =>
            handleFocusOutBudgetMonthlyIncome(text, budget.id, 'actual')
          }
        />
        <h2 className="number-label">Projected Balance</h2>
        <h1 className="number mb4 tc">{formattedBudget.projectedBalance}</h1>
        <h2 className="number-label">Actual Balance</h2>
        <h1 className="number mb4 tc">{formattedBudget.actualBalance}</h1>
        <h2 className="number-label">Balance Difference</h2>
        <h1 className="number mb4 tc clr-red">
          {formattedBudget.differenceBalance}
        </h1>
        <h2 className="number-label">Projected Cost</h2>
        <h1 className="number mb4 tc">{formattedBudget.projectedCost}</h1>
        <h2 className="number-label">Actual Cost</h2>
        <h1 className="number mb4 tc">{formattedBudget.actualCost}</h1>
        <h2 className="number-label">Cost Difference</h2>
        <h1 className="number tc clr-green">
          {formattedBudget.differenceCost}
        </h1>
      </div>
      <div className="window-box flex-grow-1 mh3">
        <h1 className="entries-box-title  tc">
          Entries ({budget.entries.length})
        </h1>
        <h3 className="white window-body o-80 flex justify-center items-center mb5">
          Click any cell to edit
        </h3>
        <div className="add-entry flex justify-center">
          <input
            onChange={handleCategoryInputChange}
            className="placeholder br3 pv3 ph3 mr3 w-33"
            type="text"
            id="name"
            name="name"
            placeholder="Category of entry"
            value={inputCategory}
          />
          <button onClick={handleAddEntry} className="button bg--blue pv3 ph4">
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
              onClick={() => handleDeleteBudget(budget.id)}
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
