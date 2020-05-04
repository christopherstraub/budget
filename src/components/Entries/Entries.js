import React from 'react';

import Message from '../Message/Message';

import EditableLabel from 'react-inline-editing';

import trash from '../../images/trash.svg';

const Entries = ({ budget, entries, messageCode }) => {
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
              <th scope="col" className="w-20">
                Projected Cost
              </th>
              <th scope="col" className="w-20">
                Actual Cost
              </th>
              <th scope="col" className="w-20">
                Difference
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.formattedEntries.map((entry, index) => (
              <tr key={index}>
                <td className="entry flex items-center text-break">
                  <img
                    onClick={() => entries.handleDeleteEntry(index)}
                    className="pointer mr3"
                    src={trash}
                    alt="trash"
                  />
                  <EditableLabel
                    text={entry.category}
                    labelClassName="entry text-break pointer mb0 lh-title"
                    inputClassName="input-entry ph2 br3 w-100"
                    inputHeight="1.5em"
                    inputMaxLength={50}
                    inputPlaceHolder="Category"
                    onFocusOut={(text) =>
                      entries.handleFocusOutCategory(text, index)
                    }
                  />
                </td>
                <td className="entry text-break tr w-20">
                  <EditableLabel
                    text={entry.projectedCost}
                    labelClassName="entry text-break pointer w-100 mb0 lh-title"
                    inputClassName="input-entry tr ph2 br3 w-100"
                    inputHeight="1.5em"
                    inputMaxLength={50}
                    inputPlaceHolder="Projected cost"
                    onFocusOut={(text) =>
                      entries.handleFocusOutProjectedCost(text, index)
                    }
                  />
                </td>
                <td className="entry text-break tr w-20">
                  <EditableLabel
                    text={entry.actualCost}
                    labelClassName="entry text-break pointer w-100 mb0 lh-title"
                    inputClassName="input-entry tr ph2 br3 w-100"
                    inputHeight="1.5em"
                    inputMaxLength={50}
                    inputPlaceHolder="Actual cost"
                    onFocusOut={(text) =>
                      entries.handleFocusOutActualCost(text, index)
                    }
                  />
                </td>
                <td className="entry text-break tr w-20">{entry.difference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center pt4">
        {messageCode === 'updated-projected-cost' ? (
          <Message message="Projected cost updated." />
        ) : messageCode === 'invalid-projected-cost' ? (
          <Message message="Projected cost invalid." />
        ) : messageCode === 'updated-actual-cost' ? (
          <Message message="Actual cost updated." />
        ) : messageCode === 'invalid-actual-cost' ? (
          <Message message="Actual cost invalid." />
        ) : null}
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
