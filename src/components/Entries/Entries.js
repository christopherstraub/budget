import React from 'react';

import garbage from '../../images/trash.svg';

const Entries = ({ budget, entries }) => {
  return (
    <>
      <h1 className="entries-box-title tc mb5">
        Entries ({budget.entries.length})
      </h1>
      <h3
        className="window-body o-80 flex justify-center items-center mb4"
        style={{
          textShadow: '2px 1px 1px #302e2e',
        }}
      >
        Click cell to edit
      </h3>
      <div className="add-entry flex justify-center">
        <input
          onChange={entries.handleCategoryInputChange}
          className="input br3 pv2 ph3 mr3 w-100"
          type="text"
          id="name"
          name="name"
          placeholder="Category of entry"
          value={entries.inputCategory}
        />
        <button
          onClick={entries.handleAddEntry}
          className="button bg--blue pv2 ph4 w-33"
        >
          ADD ENTRY
        </button>
      </div>
      <div className="table-responsive">
        <table className="bg-white mt4 table table-striped table-bordered table-hover">
          <thead className="entry-title">
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Projected Cost</th>
              <th scope="col">Actual Cost</th>
              <th scope="col">Difference</th>
            </tr>
          </thead>
          <tbody>
            {entries.formattedEntries.map((entry, index) => (
              <tr key={index}>
                <td className="entry text-break">
                  <img
                    onClick={() => entries.handleDeleteEntry(index)}
                    className="pointer mr3"
                    src={garbage}
                    alt="trash"
                  />
                  {entry.category}
                </td>
                <td className="entry text-break tr ">{entry.projectedCost}</td>
                <td className="entry text-break tr">{entry.actualCost}</td>
                <td className="entry text-break tr">{entry.difference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex pt4">
        {entries.userClickedDeleteBudget ? (
          <button
            onClick={entries.handleDeleteBudget}
            onBlur={() => entries.handleUserClickedDeleteBudget(false)}
            className="button bg--dark-red pv3 ph4 ml-auto"
          >
            CONFIRM DELETE
          </button>
        ) : (
          <button
            onClick={() => entries.handleUserClickedDeleteBudget(true)}
            className="button bg--dark-red pv3 ph4 ml-auto"
          >
            DELETE BUDGET
          </button>
        )}
      </div>
    </>
  );
};

export default Entries;
