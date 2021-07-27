import React from 'react';

import Message from '../Message/Message';

import EditableLabel from 'react-inline-editing';

const Entries = ({
  budget,
  messageCode,
  formattedEntries,
  handleFocusOutBudgetName,
  inputCategory,
  handleEntryCategoryInputChange,
  handleEntryCategoryInputKeyDown,
  handleAddEntry,
  handleDeleteEntry,
  handleFocusOutEntryCategory,
  handleFocusOutProjectedCost,
  handleFocusOutActualCost,
  handleUserClickedDeleteBudget,
  userClickedDeleteBudget,
  handleDeleteBudget,
}) => {
  return (
    <>
      <div className="relative mb5 ph5">
        <EditableLabel
          value="test"
          text={budget.name}
          labelClassName="summary-title flex justify-center tc text-break pointer mb0"
          inputClassName="input-summary-title tc br3 ph3 w-100"
          inputHeight="5.7rem"
          inputMaxLength={50}
          inputPlaceHolder="Budget name"
          onFocusOut={handleFocusOutBudgetName}
        />
        <span
          className="material-icons absolute default clr-accent-light"
          style={{
            top: '50%',
            right: '0',
            transform: 'translateY(-50%)',
          }}
        >
          edit
        </span>
      </div>

      <div className="add-entry flex justify-center">
        <input
          onChange={handleEntryCategoryInputChange}
          onKeyDown={handleEntryCategoryInputKeyDown}
          className="input br3 pv2 ph3 mr3 w-100"
          type="text"
          id="name"
          name="name"
          placeholder="Category of entry"
          value={inputCategory}
        />
        <button
          onClick={handleAddEntry}
          className="button bg--accent-dark pv2 ph4 w-20"
        >
          ADD ENTRY
        </button>
      </div>

      <div className="table-responsive">
        <table className="bg-white mt4 table table-striped table-bordered table-hover">
          <thead className="entry-title">
            <tr>
              <th scope="col" width="55%" className="v-mid">
                Category ({budget.entries.length})
              </th>
              <th scope="col" width="15%" className="v-mid">
                Projected Cost
              </th>
              <th scope="col" width="15%" className="v-mid">
                Actual Cost
              </th>
              <th scope="col" width="15%" className="v-mid">
                Difference
              </th>
            </tr>
          </thead>
          <tbody>
            {formattedEntries.map((entry, index) => (
              <tr key={entry.id}>
                <td className="entry flex items-center text-break">
                  <span
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="material-icons pointer mr2 selection-transparent"
                  >
                    delete
                  </span>
                  <EditableLabel
                    text={entry.category}
                    labelClassName="entry text-break pointer mb0 lh-title"
                    inputClassName="input-entry ph2 br3 w-100"
                    inputHeight="1.5em"
                    inputMaxLength={50}
                    inputPlaceHolder="Category"
                    onFocusOut={(text) =>
                      handleFocusOutEntryCategory(text, entry.id)
                    }
                  />
                </td>
                <td className="entry text-break tr">
                  <EditableLabel
                    text={entry.projectedCost}
                    labelClassName={`entry text-break pointer w-100 mb0 lh-title ${
                      budget.entries[index].projectedCost === 0
                        ? 'empty-number-field'
                        : null
                    }`}
                    inputClassName="input-entry tr ph2 br3 w-100"
                    inputHeight="1.5em"
                    inputMaxLength={50}
                    inputPlaceHolder="Projected cost"
                    onFocusOut={(text) =>
                      handleFocusOutProjectedCost(text, index)
                    }
                  />
                </td>
                <td className="entry text-break tr">
                  <EditableLabel
                    text={entry.actualCost}
                    labelClassName={`entry text-break pointer w-100 mb0 lh-title ${
                      budget.entries[index].actualCost === 0
                        ? 'empty-number-field'
                        : null
                    }`}
                    inputClassName="input-entry tr ph2 br3 w-100"
                    inputHeight="1.5em"
                    inputMaxLength={50}
                    inputPlaceHolder="Actual cost"
                    onFocusOut={(text) => handleFocusOutActualCost(text, index)}
                  />
                </td>
                <td className="entry text-break tr">{entry.difference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center pt4">
        {messageCode === 'projected-cost-updated' ? (
          <Message message="Projected cost updated." />
        ) : messageCode === 'projected-cost-invalid' ? (
          <Message message="Projected cost invalid." />
        ) : messageCode === 'actual-cost-updated' ? (
          <Message message="Actual cost updated." />
        ) : messageCode === 'actual-cost-invalid' ? (
          <Message message="Actual cost invalid." />
        ) : null}

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
    </>
  );
};

export default Entries;
