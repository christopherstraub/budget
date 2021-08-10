import React from 'react';

import EditableLabel from 'react-inline-editing';

const Entries = ({
  budget,
  currentBudgetIndex,
  formattedEntries,
  isEditingBudgetName,
  editBudgetName,
  handleBudgetNameChange,
  inputEntryCategory,
  handleEntryCategoryInputChange,
  handleKeyDown,
  handleAddEntry,
  handleDeleteEntry,
  handleFocusOutEntryCategory,
  handleFocusOutProjectedCost,
  handleFocusOutActualCost,
  handleCreateBudgetCopy,
  handleUserClickedDeleteBudget,
  handleDeleteBudget,
  clickedDeleteBudget,
  setMessage,
  clearMessage,
}) => {
  return (
    <>
      <div className="relative mb5">
        {isEditingBudgetName ? (
          <input
            className="clr-light bg-transparent fs-heading fw3 bn w-100 tc"
            onFocus={(event) => (event.target.value = budget.name)}
            onBlur={handleBudgetNameChange}
            type="text"
            maxLength="50"
            autoFocus={true}
          />
        ) : (
          <div className="ph5">
            <label
              className="clr-light fs-heading fw3 bn w-100 tc pointer text-break"
              style={{ padding: '1px 0' }}
              onClick={editBudgetName}
              tabIndex="0"
              onKeyDown={handleKeyDown(editBudgetName)}
            >
              {budget.name}
            </label>
            <span
              className="material-icons absolute user-select-none clr-accent-light pointer hover-opacity"
              onClick={editBudgetName}
              tabIndex="0"
              onKeyDown={handleKeyDown(editBudgetName)}
              onMouseEnter={() => setMessage('edit-budget-name')}
              onMouseLeave={() => clearMessage(0)}
              onFocus={() => setMessage('edit-budget-name')}
              onBlur={() => clearMessage(0)}
              style={{
                top: '50%',
                right: '0',
                transform: 'translateY(-50%)',
                fontSize: '36px',
              }}
            >
              edit
            </span>
          </div>
        )}
      </div>

      <div className="flex">
        <div className="relative mr2 flex-auto">
          <input
            onChange={handleEntryCategoryInputChange}
            onKeyDown={handleKeyDown(handleAddEntry)}
            className="input br3 pt4 ph3 pb2 w-100"
            type="text"
            id="name"
            name="name"
            value={inputEntryCategory}
            required
          />
          <span className="floating-label">Category of entry</span>
        </div>

        <button
          onClick={handleAddEntry}
          className="clr-light fs-body ff-mono fw3 ttc selection-transparent hover-opacity br3 bn bg--accent-dark pa3 ml2"
        >
          add entry
        </button>
      </div>

      <div className="table-responsive">
        <table className="bg-white mt4 table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th
                scope="col"
                width="55%"
                className="v-mid clr-dark fs-subheading fw4 tc"
              >
                Entries ({budget.entries.length})
              </th>
              <th
                scope="col"
                width="15%"
                className="v-mid clr-dark fs-subheading fw4 tr"
              >
                Projected Cost
              </th>
              <th
                scope="col"
                width="15%"
                className="v-mid clr-dark fs-subheading fw4 tr"
              >
                Actual Cost
              </th>
              <th
                scope="col"
                width="15%"
                className="v-mid clr-dark fs-subheading fw4 tr"
              >
                Difference
              </th>
            </tr>
          </thead>
          <tbody>
            {formattedEntries.map((entry, index) => (
              <tr key={entry.id}>
                <td className="flex text-break relative items-center">
                  <span
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="absolute material-icons clr-dark-accent fs-subheading pointer selection-transparent"
                  >
                    delete
                  </span>
                  <div className="flex-grow-1 tc">
                    <EditableLabel
                      key={entry.id}
                      text={entry.category}
                      labelClassName="clr-dark fs-body text-break pointer"
                      inputClassName="ph2 br3 tc"
                      inputHeight="1.5em"
                      inputMaxLength={50}
                      inputPlaceHolder="Category"
                      onFocusOut={handleFocusOutEntryCategory(entry.id)}
                    />
                  </div>
                </td>
                <td className="clr-dark fs-body text-break tr">
                  <EditableLabel
                    text={entry.projectedCost}
                    labelClassName={`clr-dark fs-body text-break pointer w-100 ${
                      budget.entries[index].projectedCost === 0
                        ? 'empty-number-field'
                        : ''
                    }`}
                    inputClassName="tr ph2 br3 w-100"
                    inputHeight="1.5em"
                    inputMaxLength={50}
                    inputPlaceHolder="Projected cost"
                    onFocusOut={(text) =>
                      handleFocusOutProjectedCost(text, index)
                    }
                  />
                </td>
                <td className="clr-dark fs-body text-break tr">
                  <EditableLabel
                    text={entry.actualCost}
                    labelClassName={`clr-dark fs-body text-break pointer w-100 ${
                      budget.entries[index].actualCost === 0
                        ? 'empty-number-field'
                        : ''
                    }`}
                    inputClassName="tr ph2 br3 w-100"
                    inputHeight="1.5em"
                    inputMaxLength={50}
                    inputPlaceHolder="Actual cost"
                    onFocusOut={(text) => handleFocusOutActualCost(text, index)}
                  />
                </td>
                <td className="clr-dark fs-body text-break tr">
                  {entry.difference}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt4">
        <button
          onClick={() => handleCreateBudgetCopy(currentBudgetIndex)}
          className="clr-light fs-body ff-mono fw3 ttc selection-transparent hover-opacity br3 bn bg--accent-dark pa3"
        >
          create copy
        </button>
        {clickedDeleteBudget ? (
          <button
            onClick={handleDeleteBudget}
            onBlur={() => handleUserClickedDeleteBudget(false)}
            className="clr-light fs-body ff-mono fw3 ttc selection-transparent hover-opacity br3 bn bg--dark-red pa3"
          >
            confirm delete
          </button>
        ) : (
          <button
            onClick={() => handleUserClickedDeleteBudget(true)}
            className="clr-light fs-body ff-mono fw3 ttc selection-transparent hover-opacity br3 bn bg--dark-red pa3"
          >
            delete budget
          </button>
        )}
      </div>
    </>
  );
};

export default Entries;
