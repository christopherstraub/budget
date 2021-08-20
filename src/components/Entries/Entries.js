import React from 'react';

import './Entries.scss';

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
    <div className="Entries pv5 ph4">
      <div className="relative mb5">
        {isEditingBudgetName ? (
          <input
            className="clr-light bg-transparent fs-heading fw3 bn w-100 tc pv0 ph1 mt4"
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
        <div className="relative flex-grow-1 mr3">
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
          style={{ minWidth: 'max-content' }}
        >
          add entry
        </button>
      </div>

      <h2 className="clr-light fs-subtitle fw3 mb3">
        Entries ({budget.entries.length})
      </h2>

      <div className="bg--light text-break br3">
        <div className="grid-entry bb border-clr-light-accent">
          <span
            className="ph2"
            style={{
              width: '24px',
              boxSizing: 'content-box',
              visibility: 'hidden',
            }}
          ></span>
          <span className="clr-dark fs-subheading fw4 tc pv3 ph1">
            Category
          </span>
          <span className="clr-dark fs-subheading fw4 tr pv3 ph1">
            Projected Cost
          </span>
          <span className="clr-dark fs-subheading fw4 tr pv3 ph1">
            Actual Cost
          </span>
          <span className="clr-dark fs-subheading fw4 tr pv3 pr2 pl1">
            Difference
          </span>
        </div>

        <div className="entries">
          {formattedEntries.map((entry, index) => (
            <div key={entry.id} className="grid-entry items-center">
              <span
                className="material-icons clr-dark-accent user-select-none pointer hover-opacity pv2 ph2 tc"
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
                  className="clr-dark placeholder-dark-accent bg-transparent fs-body bn w-100 h-100 tc pv2 ph1"
                  onFocus={(event) => (event.target.value = entry.category)}
                  onBlur={(event) => handleUpdateCategory(entry.id, event)}
                  type="text"
                  maxLength={input.category.maxLength}
                  placeholder="Category"
                  autoFocus={true}
                />
              ) : (
                <span
                  className="clr-dark fs-body pointer pv2 ph1 tc"
                  onClick={() => editCategory(entry.id)}
                  tabIndex="0"
                  onKeyDown={handleKeyDown(() => editCategory(entry.id))}
                >
                  {entry.category}
                </span>
              )}
              {isEditingProjectedCost && isEditingEntryId === entry.id ? (
                <input
                  className="clr-dark placeholder-dark-accent bg-transparent fs-body bn w-100 h-100 tc pv2 ph1"
                  onFocus={(event) =>
                    (event.target.value = entries[index].projectedCost
                      ? entries[index].projectedCost
                      : '')
                  }
                  onBlur={(event) => handleUpdateProjectedCost(entry.id, event)}
                  type="number"
                  placeholder="0"
                  step={50}
                  autoFocus={true}
                />
              ) : (
                <span
                  className="clr-dark fs-body pointer pv2 ph1 h-100 flex justify-end items-center"
                  onClick={() => editProjectedCost(entry.id)}
                  tabIndex="0"
                  onKeyDown={handleKeyDown(() => editProjectedCost(entry.id))}
                >
                  {entry.projectedCost}
                </span>
              )}
              {isEditingActualCost && isEditingEntryId === entry.id ? (
                <input
                  className="clr-dark placeholder-dark-accent bg-transparent fs-body bn w-100 h-100 tc pv2 ph1"
                  onFocus={(event) =>
                    (event.target.value = entries[index].actualCost
                      ? entries[index].actualCost
                      : '')
                  }
                  onBlur={(event) => handleUpdateActualCost(entry.id, event)}
                  type="number"
                  placeholder="0"
                  step={50}
                  autoFocus={true}
                />
              ) : (
                <span
                  className="clr-dark fs-body pointer pv2 ph1 h-100 flex justify-end items-center"
                  onClick={() => editActualCost(entry.id)}
                  tabIndex="0"
                  onKeyDown={handleKeyDown(() => editActualCost(entry.id))}
                >
                  {entry.actualCost}
                </span>
              )}
              <span className="clr-dark fw6 fs-body tr pv2 pr2 pl1">
                {entry.difference}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt4 items-end"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          justifyItems: 'start',
        }}
      >
        <time
          className="clr-light-accent fs-body ff-mono fw3 ttc tc"
          style={{ gridColumnStart: '2' }}
        >
          {getLastSavedTimeString(budget.lastSaved)}
        </time>

        {clickedDeleteBudget ? (
          <button
            onClick={handleDeleteBudget}
            onBlur={() => handleUserClickedDeleteBudget(false)}
            className="clr-light fs-body ff-mono fw3 ttc selection-transparent hover-opacity br3 bn bg--dark-red pa3 ml-auto"
            style={{ gridColumnStart: '3' }}
          >
            confirm delete
          </button>
        ) : (
          <button
            onClick={() => handleUserClickedDeleteBudget(true)}
            className="clr-light fs-body ff-mono fw3 ttc selection-transparent hover-opacity br3 bn bg--dark-red pa3 ml-auto"
            style={{ gridColumnStart: '3' }}
          >
            delete budget
          </button>
        )}
      </div>
    </div>
  );
};

export default Entries;
