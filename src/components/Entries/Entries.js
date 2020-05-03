import React from 'react';

const Entries = ({ budget, entries }) => {
  return (
    <>
      <h1 className="entries-box-title tc mb5">
        Entries ({budget.entries.length})
      </h1>
      <h3 className="window-body o-80 flex justify-center items-center mb4">
        Click cell to edit
      </h3>
      <div className="add-entry flex justify-center">
        <input
          onChange={entries.handleCategoryInputChange}
          className="input br3 pv2 ph3 mr3 w-33"
          type="text"
          id="name"
          name="name"
          placeholder="Category of entry"
          value={entries.inputCategory}
        />
        <button
          onClick={entries.handleAddEntry}
          className="button bg--blue pv2 ph4"
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
                <td className="entry text-break">{entry.category}</td>
                <td className="entry text-break tr ">{entry.projectedCost}</td>
                <td className="entry text-break tr">{entry.actualCost}</td>
                <td className="entry text-break tr">{entry.difference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex pt4">
        <button className="button bg--green pv3 ph4">SAVE BUDGET</button>

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
