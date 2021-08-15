import React from 'react';

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
  entries,
  formattedEntries,
  currentBudgetIndex,
  editBudgetName,
  isEditingBudgetName,
  handleUpdateBudgetName,
  handleAddEntryInputChange,
  handleKeyDown,
  handleAddEntry,
  handleDeleteEntry,
  editCategory,
  editProjectedCost,
  editActualCost,
  isEditingCategory,
  isEditingProjectedCost,
  isEditingActualCost,
  isEditingEntryId,
  handleUpdateCategory,
  handleUpdateProjectedCost,
  handleUpdateActualCost,
  handleSaveBudget,
  handleCreateBudgetCopy,
  handleUserClickedDeleteBudget,
  handleDeleteBudget,
  clickedDeleteBudget,
  input,
  setTooltip,
  clearTooltip,
}) => {
  return (
    <>
      <div className="relative mb5">
        {isEditingBudgetName ? (
          <input
            className="clr-light bg-transparent fs-heading fw3 bn w-100 tc pv0 ph1"
            onFocus={(event) => (event.target.value = budget.name)}
            onBlur={handleUpdateBudgetName}
            type="text"
            maxLength={input.budgetName.maxLength}
            placeholder="Budget name"
            autoFocus={true}
          />
        ) : (
          <div style={{ padding: '0 12rem' }}>
            <span
              className="material-icons absolute user-select-none pointer clr-accent-light hover-opacity mr4"
              onClick={handleSaveBudget}
              tabIndex="0"
              onKeyDown={handleKeyDown(handleSaveBudget)}
              onMouseMove={(event) => setTooltip('save-budget', event)}
              onMouseLeave={clearTooltip}
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
              onMouseMove={(event) => setTooltip('copy-budget', event)}
              onMouseLeave={clearTooltip}
              style={{
                top: '50%',
                left: '6rem',
                transform: 'translateY(-50%)',
                fontSize: '36px',
              }}
            >
              copy_all
            </span>
            <h1
              className="clr-light fs-heading fw3 bn w-100 tc pointer text-break lh-copy"
              onClick={editBudgetName}
            >
              {budget.name}
            </h1>
            <span
              className="material-icons absolute user-select-none pointer clr-accent-light hover-opacity"
              onClick={editBudgetName}
              tabIndex="0"
              onKeyDown={handleKeyDown(editBudgetName)}
              onMouseMove={(event) => setTooltip('edit-budget-name', event)}
              onMouseLeave={clearTooltip}
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

      <div className="flex mb4">
        <div className="relative flex-auto mr3">
          <input
            onChange={handleAddEntryInputChange}
            onKeyDown={handleKeyDown(handleAddEntry)}
            className="input br3 pt4 ph3 pb2 w-100"
            type="text"
            maxLength={input.addEntry.maxLength}
            value={input.addEntry.value}
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

      <h2 className="clr-light fs-subtitle fw3 mb3">
        Entries ({budget.entries.length})
      </h2>

      <div className="bg--light border-clr-light-accent bt">
        <div className="grid-entry border-clr-light-accent br bb bl">
          <span></span>
          <span className="clr-dark fs-subheading fw4 tc ph1">Category</span>
          <span className="clr-dark fs-subheading fw4 tr ph1">
            Projected Cost
          </span>
          <span className="clr-dark fs-subheading fw4 tr ph1">Actual Cost</span>
          <span className="clr-dark fs-subheading fw4 tr ph1">Difference</span>
        </div>

        {formattedEntries.map((entry, index) => (
          <div
            key={entry.id}
            className="grid-entry border-clr-light-accent br bb bl"
          >
            <span
              className="material-icons clr-dark-accent user-select-none pointer hover-opacity tc"
              onClick={() => handleDeleteEntry(entry.id)}
              tabIndex="0"
              onKeyDown={handleKeyDown(() => handleDeleteEntry(entry.id))}
              onMouseMove={(event) =>
                setTooltip('custom', event, `Delete "${entry.category}"`)
              }
              onMouseOver={(event) =>
                setTooltip('custom', event, `Delete "${entry.category}"`)
              }
              onMouseLeave={clearTooltip}
              onMouseUp={clearTooltip}
            >
              delete
            </span>
            {isEditingCategory && isEditingEntryId === entry.id ? (
              <input
                className="clr-dark placeholder-dark-accent bg-transparent fs-body bn w-100 tc pv0 ph1"
                onFocus={(event) => (event.target.value = entry.category)}
                onBlur={(event) => handleUpdateCategory(entry.id, event)}
                type="text"
                maxLength={input.category.maxLength}
                placeholder="Category"
                autoFocus={true}
              />
            ) : (
              <span
                className="clr-dark fs-body tc pointer ph1"
                onClick={() => editCategory(entry.id)}
                tabIndex="0"
                onKeyDown={handleKeyDown(() => editCategory(entry.id))}
              >
                {entry.category}
              </span>
            )}
            {isEditingProjectedCost && isEditingEntryId === entry.id ? (
              <input
                className="clr-dark placeholder-dark-accent bg-transparent fs-body bn w-100 tc pv0 ph1"
                onFocus={(event) =>
                  (event.target.value = entries[index].projectedCost)
                }
                onBlur={(event) => handleUpdateProjectedCost(entry.id, event)}
                type="number"
                placeholder="0"
                step={50}
                autoFocus={true}
              />
            ) : (
              <span
                className="clr-dark fs-body tr pointer ph1"
                onClick={() => editProjectedCost(entry.id)}
                tabIndex="0"
                onKeyDown={handleKeyDown(() => editProjectedCost(entry.id))}
              >
                {entry.projectedCost}
              </span>
            )}
            {isEditingActualCost && isEditingEntryId === entry.id ? (
              <input
                className="clr-dark placeholder-dark-accent bg-transparent fs-body bn w-100 tc pv0 ph1"
                onFocus={(event) =>
                  (event.target.value = entries[index].actualCost)
                }
                onBlur={(event) => handleUpdateActualCost(entry.id, event)}
                type="number"
                placeholder="0"
                step={50}
                autoFocus={true}
              />
            ) : (
              <span
                className="clr-dark fs-body tr pointer ph1"
                onClick={() => editActualCost(entry.id)}
                tabIndex="0"
                onKeyDown={handleKeyDown(() => editActualCost(entry.id))}
              >
                {entry.actualCost}
              </span>
            )}
            <span className="clr-dark fs-body tr pointer">
              {entry.difference}
            </span>
          </div>
        ))}
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
