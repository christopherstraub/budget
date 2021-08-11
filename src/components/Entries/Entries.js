import React from 'react';

import EditableLabel from 'react-inline-editing';

const getLastSavedTimeString = (lastSaved) => {
  return !lastSaved
    ? 'unsaved'
    : // If last saved one or more days ago, display date and time,
    // otherwise display time.
    new Date() - lastSaved >= 8.64e7
    ? `last saved ${lastSaved.toLocaleString([], {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })}`
    : `last saved ${lastSaved.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
};

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
  handleSaveBudget,
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
          <div style={{ padding: '0 12rem' }}>
            <span
              className="material-icons absolute user-select-none pointer clr-accent-light hover-opacity mr4"
              onClick={() => handleSaveBudget(currentBudgetIndex)}
              tabIndex="0"
              onKeyDown={handleKeyDown(() =>
                handleSaveBudget(currentBudgetIndex)
              )}
              onMouseEnter={() => setMessage('save-budget')}
              onMouseLeave={() => clearMessage(0)}
              style={{
                top: '50%',
                left: '0',
                transform: 'translateY(-50%)',
                fontSize: '36px',
              }}
            >
              save
            </span>
            <span
              className="material-icons absolute user-select-none pointer clr-accent-light hover-opacity mr3"
              onClick={() => handleCreateBudgetCopy(currentBudgetIndex)}
              tabIndex="0"
              onKeyDown={handleKeyDown(() =>
                handleCreateBudgetCopy(currentBudgetIndex)
              )}
              onMouseEnter={() => setMessage('copy-budget')}
              onMouseLeave={() => clearMessage(0)}
              style={{
                top: '50%',
                left: '6rem',
                transform: 'translateY(-50%)',
                fontSize: '36px',
              }}
            >
              copy_all
            </span>
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
              className="material-icons absolute user-select-none pointer clr-accent-light hover-opacity"
              onClick={editBudgetName}
              tabIndex="0"
              onKeyDown={handleKeyDown(editBudgetName)}
              onMouseEnter={() => setMessage('edit-budget-name')}
              onMouseLeave={() => clearMessage(0)}
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
        <div className="relative flex-auto mr3">
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
          className="clr-light fs-body ff-mono fw3 ttc selection-transparent hover-opacity br3 bn bg--accent-dark pa3"
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
                    className="material-icons absolute user-select-none pointer clr-dark-accent hover-opacity"
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

      <div className="flex justify-end items-end mt4">
        <time
          className="clr-light-accent absolute fs-body ff-mono fw3 ttc tc"
          style={{ left: '50%', transform: 'translateX(-50%)' }}
        >
          {getLastSavedTimeString(budget.lastSaved)}
        </time>

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
