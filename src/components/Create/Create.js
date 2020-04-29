import React from 'react';
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
  handleFocus,
  handleFocusOut,
}) => {
  const formattedBudget = formatBudget(budget, formatterUnitedStatesDollar);
  const formattedEntries = formatEntries(
    budget.entries,
    formatterUnitedStatesDollar
  );
  console.log(budget);
  return (
    <div className="Create flex items-start justify-center">
      <div className="window-box mw7 mh3 mb5">
        <EditableLabel
          text={budget.name}
          labelClassName="window-title edit flex justify-center text-break"
          inputClassName="placeholder br2 pv1 ph3 mr3 w-100 tc"
          inputMaxLength="50"
          inputPlaceHolder="Budget name"
          onFocus={handleFocus}
          onFocusOut={(text) => handleFocusOut(text, budget.id)}
          // emptyEdit= TEST EMPTY EDIT
        />
        <h1 className="window-title edit tc">{budget.name}</h1>
        <h3
          className="white o-80 flex justify-center items-center mb4 edit"
          style={{ fontSize: '1.8rem' }}
        >
          Click field to edit
        </h3>
        <h2 className="number-label">Projected Monthly Income</h2>
        <h1 className="number edit tc mb4">
          {formattedBudget.projectedMonthlyIncome}
        </h1>
        <h2 className="number-label">Actual Monthly Income</h2>
        <h1 className="number edit tc mb4">
          {formattedBudget.actualMonthlyIncome}
        </h1>
        <h2 className="number-label">Projected Balance</h2>
        <h1 className="number tc mb4">{formattedBudget.projectedBalance}</h1>
        <h2 className="number-label">Actual Balance</h2>
        <h1 className="number tc mb4">{formattedBudget.actualBalance}</h1>
        <h2 className="number-label">Balance Difference</h2>
        <h1 className="number tc clr-red">
          {formattedBudget.differenceBalance}
        </h1>
        <h2 className="number-label">Projected Cost</h2>
        <h1 className="number tc mb4">{formattedBudget.projectedCost}</h1>
        <h2 className="number-label">Actual Cost</h2>
        <h1 className="number tc mb4">{formattedBudget.actualCost}</h1>
        <h2 className="number-label">Cost Difference</h2>
        <h1 className="number tc clr-green">
          {formattedBudget.differenceCost}
        </h1>
      </div>
      <div className="window-box flex-grow-1 mh3">
        <h1 className="window-title tc">Entries ({budget.entries.length})</h1>
        <h3
          className="white o-80 flex justify-center items-center mb5"
          style={{ fontSize: '1.8rem' }}
        >
          Click any cell to edit
        </h3>
        <div className="add-entry flex justify-center">
          <input
            onChange={handleCategoryInputChange}
            className="placeholder br2 pv3 ph3 mr3 w-33"
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
              className="button bg--dark-red pv3 ph4 ml-auto"
            >
              CONFIRM DELETE
            </button>
          ) : (
            <button
              onClick={() => handleUserClickedDeleteBudget()}
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
