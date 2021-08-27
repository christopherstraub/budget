import React, { Component } from 'react';

import CustomScrollbars from '../../components/CustomScrollbars/CustomScrollbars';
import BackgroundWrapper from '../../components/BackgroundWrapper/BackgroundWrapper';
import Nav from '../../components/Nav/Nav';
import Landing from '../../components/Landing/Landing';
import Budget from '../../components/Budget/Budget';
import SavedBudgets from '../../components/SavedBudgets/SavedBudgets';
import Profile from '../../components/Profile/Profile';
import About from '../../components/About/About';
import Message from '../../components/Message/Message';
import Tooltip from '../../components/Tooltip/Tooltip';
import PreloadedBackgrounds from '../../components/PreloadedBackgrounds/PreloadedBackgrounds';

import cloneDeep from 'lodash/cloneDeep';
import { CSSTransition } from 'react-transition-group';

import pathBg1 from '../../images/bg1.webp';
import pathBg2 from '../../images/bg2.webp';
import pathBg3 from '../../images/bg3.webp';
import pathBg4 from '../../images/bg4.webp';
import pathBg5 from '../../images/bg5.webp';
import pathBg6 from '../../images/bg6.webp';
import pathBg7 from '../../images/bg7.webp';
import pathBg8 from '../../images/bg8.webp';

import './App.scss';

/*
Valid routes:
'sign-in', 'sign-up', 'budget', 'saved-budgets', 'profile', 'about'
*/

// Set initial state to be passed into App state.
const initialState = {
  route: 'sign-up',
  input: {
    displayName: { value: '', empty: false, maxLength: 50 },
    username: { value: '', empty: false, maxLength: 50 },
    password: { value: '', empty: false, minLength: 8, maxLength: 128 },
    newPassword: { value: '', empty: false, minLength: 8, maxLength: 128 },
    budgetName: { maxLength: 50 },
    addEntry: { value: '', maxLength: 50 },
    category: { maxLength: 50 },
  },
  isEditing: {
    budgetName: false,
    projectedMonthlyIncome: false,
    actualMonthlyIncome: false,
    category: false,
    projectedCost: false,
    actualCost: false,
    entryId: null,
  },
  message: null,
  showMessage: false,
  tooltip: null,
  showTooltipRight: false,
  showTooltipLeft: false,
  windowMessage: null,
  mousePosition: { x: null, y: null },
  isLoggedIn: false,
  isGuest: true,
  clickedDeleteBudget: false,
  toggledExpandNav: false,
  maxBudgets: 100,
  maxEntries: 100,
  user: {
    id: null,
    username: null,
    displayName: 'Guest',
    joinDate: null,
    currentBudgetIndex: 0,
    budgetsCreated: 0,
  },
};

const defaultEntries = [
  {
    id: 0,
    category: 'Housing costs',
    projectedCost: 1000,
    actualCost: 0,
  },
  {
    id: 1,
    category: 'Vehicle expenses',
    projectedCost: 200,
    actualCost: 0,
  },
  {
    id: 2,
    category: 'Phone bill',
    projectedCost: 20,
    actualCost: 0,
  },
  {
    id: 3,
    category: 'Groceries',
    projectedCost: 250,
    actualCost: 0,
  },
  {
    id: 4,
    category: 'Savings',
    projectedCost: 100,
    actualCost: 0,
  },
];

const backgrounds = [
  { name: 'banff', path: pathBg1, useDarkLanding: true, initial: true },
  { name: 'machu picchu', path: pathBg2, useDarkLanding: true, initial: true },
  {
    name: 'alpine mountains',
    path: pathBg3,
    useDarkLanding: false,
    initial: true,
  },
  {
    name: 'yosemite valley',
    path: pathBg4,
    useDarkLanding: true,
    initial: true,
  },
  {
    name: 'grand canyon',
    path: pathBg6,
    useDarkLanding: false,
    initial: false,
  },
  { name: 'trail', path: pathBg7, useDarkLanding: false, initial: false },
  { name: 'mittenwald', path: pathBg5, useDarkLanding: false, initial: false },
  { name: 'silhouette', path: pathBg8, useDarkLanding: false, initial: false },
];

// Intl.NumberFormat object is a constructor that enables language sensitive
// number formatting.
// Takes parameters ([locales[, options]]).
const formatterUSD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

/**
 *
 * @param {Object} budget The budget to be formatted (values should be numbers).
 * @param {Object} formatter The formatter instantiated with
 * the Intl.NumberFormat() constructor.
 * @returns {Object} Formatted budget.
 */
const formatCurrency = (budget, formatter) => ({
  projectedMonthlyIncome: formatter.format(budget.projectedMonthlyIncome),
  actualMonthlyIncome: formatter.format(budget.actualMonthlyIncome),
  projectedBalance: formatter.format(budget.getProjectedBalance()),
  actualBalance: formatter.format(budget.getActualBalance()),
  differenceBalance: formatter.format(budget.getDifferenceBalance()),
  projectedCost: formatter.format(budget.getProjectedCost()),
  actualCost: formatter.format(budget.getActualCost()),
  differenceCost: formatter.format(budget.getDifferenceCost()),
});

// Format negative numbers as numbers enclosed in parentheses.
const formatNegativeValues = (formattedBudget) => {
  const entries = Object.entries(formattedBudget);

  const formattedNegativeValues = entries.map((entry) =>
    entry[1].startsWith('-')
      ? [entry[0], entry[1].replace('-', '(').concat(')')]
      : entry
  );

  return Object.fromEntries(formattedNegativeValues);
};

// formatBudget formats negative values in pre-formatted budget.
const formatBudget = (budget, formatter) =>
  formatNegativeValues(formatCurrency(budget, formatter));

/**
 *
 * @param {Object} entries The entries to be formatted.
 * @param {Object} formatter The formatter instantiated with
 * the Intl.NumberFormat() constructor.
 * @returns {Object} Formatted entries.
 */
const formatEntries = (entries, formatter) =>
  !entries?.length
    ? []
    : entries.map((entry) => ({
        id: entry.id,
        category: entry.category,
        projectedCost: formatter.format(entry.projectedCost),
        actualCost: formatter.format(entry.actualCost),
        difference: formatter.format(entry.getDifference()),
      }));

const getPasswordInputStyle = (password) => {
  return password.value.length < password.minLength ||
    password.value.length > password.maxLength
    ? ''
    : 'valid';
};

const budgetMethods = {
  getProjectedBalance() {
    return this.projectedMonthlyIncome - this.getProjectedCost();
  },
  getActualBalance() {
    return this.actualMonthlyIncome - this.getActualCost();
  },
  getDifferenceBalance() {
    return this.getActualBalance() - this.getProjectedBalance();
  },
  getProjectedCost() {
    return !this.entries.length
      ? 0
      : this.entries
          .map((entry) => entry.projectedCost)
          .reduce((acc, value) => acc + value);
  },
  getActualCost() {
    return !this.entries.length
      ? 0
      : this.entries
          .map((entry) => entry.actualCost)
          .reduce((acc, value) => acc + value);
  },
  getDifferenceCost() {
    return this.getProjectedCost() - this.getActualCost();
  },
};

const entryMethods = {
  getDifference() {
    return this.projectedCost - this.actualCost;
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.state.user.budgets = [this.getNewBudget()];
    this.state.user.budgetsCreated++;
    this.state.background = backgrounds[0];
  }

  // Sets background from localStorage if it exists there,
  // otherwise set a random background.
  setBackgroundFromLocalStorage() {
    const localStorageBackgroundName = localStorage.getItem('background');
    if (localStorageBackgroundName) {
      const backgroundArray = backgrounds.filter(
        (background) => background.name === localStorageBackgroundName
      );

      if (backgroundArray.length === 0)
        backgroundArray[0] = this.state.background;

      const state = { ...this.state, background: backgroundArray[0] };
      this.setState(state);
      return;
    }

    const initialBackgrounds = backgrounds.filter(
      (background) => background.initial
    );
    const randomInitialBackgroundIndex = Math.floor(
      Math.random() * initialBackgrounds.length
    );
    const randomBackgroundName =
      initialBackgrounds[randomInitialBackgroundIndex].name;

    const backgroundArray = backgrounds.filter(
      (background) => background.name === randomBackgroundName
    );

    const state = { ...this.state, background: backgroundArray[0] };
    this.setState(state);
  }

  componentDidMount() {
    this.setBackgroundFromLocalStorage();
  }

  setMessage = (message) => this.setState({ message, showMessage: true });

  /**
   *
   * @param {number} milliseconds Number of milliseconds to clear message after.
   */
  clearMessage = (milliseconds = 4000) => {
    if (this.messageTimeout) clearTimeout(this.messageTimeout);

    this.messageTimeout = setTimeout(
      () => this.setState({ showMessage: false }),
      milliseconds
    );
  };

  setTooltip = (tooltip, event) => {
    /* If event.clientX / window.innerWidth < 0.5, cursor is on
    left half of screen and tooltip will show to the right of cursor.
    Otherwise, tooltip will show to the left of cursor. */
    const showTooltipRight = event.clientX / window.innerWidth < 0.5;

    const mousePosition = {
      ...this.state.mousePosition,
      x: event.clientX,
      y: event.clientY,
    };

    this.setState({
      tooltip,
      showTooltipRight,
      showTooltipLeft: !showTooltipRight,
      mousePosition,
    });
  };

  clearTooltip = () => {
    const mousePosition = {
      ...this.state.mousePosition,
      x: null,
      y: null,
    };

    this.setState({
      showTooltipRight: false,
      showTooltipLeft: false,
      mousePosition,
    });
  };

  // Only filter through backgrounds if selected background is different
  // from current background.
  handleBackgroundChange = (event) => {
    if (this.state.background.name !== event.target.textContent) {
      localStorage.setItem('background', event.target.textContent);

      const selectedBackground = backgrounds.filter(
        (background) => background.name === event.target.textContent
      );
      this.setState({ background: selectedBackground[0] });
    } else if (localStorage.getItem('background') !== event.target.textContent)
      localStorage.setItem('background', event.target.textContent);
  };

  // Update state entry category input with user input.
  handleAddEntryInputChange = (event) => {
    const addEntry = {
      ...this.state.input.addEntry,
      value: event.target.value,
    };
    const input = { ...this.state.input, addEntry };
    this.setState({ input });
  };

  // Create entry object.
  // If input entry category is empty, set to 'No category set'.
  getNewEntry = () => ({
    id: this.state.user.budgets[this.state.user.currentBudgetIndex]
      .entriesCreated,
    category: this.state.input.addEntry.value || 'No category set',
    projectedCost: 0,
    actualCost: 0,
    getDifference() {
      return this.projectedCost - this.actualCost;
    },
  });

  // Event handler for add entry button.
  // Add entry and reset entry category input.
  handleAddEntry = () => {
    if (
      this.state.user.budgets[this.state.user.currentBudgetIndex].entries
        .length === this.state.maxEntries
    ) {
      this.setMessage('Maximum number of entries created.');
      this.clearMessage(6000);
      return;
    }
    const user = cloneDeep(this.state.user);
    user.budgets[user.currentBudgetIndex].entries.push(this.getNewEntry());
    const addEntry = {
      ...this.state.input.addEntry,
      value: '',
    };
    user.budgets[user.currentBudgetIndex].entriesCreated++;
    const input = { ...this.state.input, addEntry };
    this.setState({ user, input });
  };

  handleDeleteEntry = (entryId) => {
    const user = cloneDeep(this.state.user);
    const entries = user.budgets[user.currentBudgetIndex].entries;
    const filteredEntries = entries.filter((entry) => entry.id !== entryId);
    user.budgets[user.currentBudgetIndex].entries = filteredEntries;
    this.setState({ user });
  };

  // Event handler for initial delete button.
  // Changes delete button to confirm delete button.
  handleClickedDeleteBudget = (userClicked) => {
    if (userClicked) {
      this.setState({ clickedDeleteBudget: true });
    } else {
      this.setState({ clickedDeleteBudget: false });
    }
  };

  // Event handler for confirm delete button.
  handleDeleteBudget = (id) => {
    const filteredBudgets = this.state.user.budgets.filter(
      (budget) => budget.id !== id
    );

    const user = Object.assign(cloneDeep(this.state.user), {
      budgets: filteredBudgets,
      currentBudgetIndex:
        this.state.user.currentBudgetIndex >= 1
          ? this.state.user.currentBudgetIndex - 1
          : 0,
    });
    this.setState({
      user,
      route: 'saved-budgets',
      clickedDeleteBudget: false,
    });
    this.setMessage('Deleted budget.');
    this.clearMessage();
  };

  // Name depends on current date and current number of budgets.
  getNewBudgetName = () => {
    const budgetsNotCopies =
      this.state.user.budgets?.filter((budget) => !/\(\d+\)$/.test(budget.name))
        .length ?? 0;

    const date = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + budgetsNotCopies
    );

    return date.toLocaleDateString([], {
      month: 'long',
      year: 'numeric',
    });
  };

  getNewBudget = () => ({
    id: this.state.user.budgetsCreated,
    name: this.getNewBudgetName(),
    lastSaved: null,
    projectedMonthlyIncome: 0,
    actualMonthlyIncome: 0,
    ...budgetMethods,
    entriesCreated: defaultEntries.length,
    entries: defaultEntries.map((entry) => ({ ...entry, ...entryMethods })),
  });

  getBudgetFromData = (budget) => ({
    id: budget.id,
    name: budget.name,
    lastSaved: budget.last_saved,
    projectedMonthlyIncome: Number(budget.projected_monthly_income),
    actualMonthlyIncome: Number(budget.actual_monthly_income),
    ...budgetMethods,
    entriesCreated: Number(budget.entries_created),
    entries: defaultEntries.map((entry) => ({ ...entry, ...entryMethods })),
  });

  // Event handler for view budget link.
  // Sets user.currentBudgetIndex to the selected budget's index
  // and route to 'budget'.
  handleViewBudget = (index) => {
    const user = { ...this.state.user, currentBudgetIndex: index };
    this.setState({ user, route: 'budget' });
  };

  handleCreateBudget = () => {
    // Check max budget constraint.
    if (this.state.user.budgets.length === this.state.maxBudgets) {
      this.setMessage(
        "Maximum number of budgets created. That's a lot of budgets!"
      );
      this.clearMessage(6000);
      return;
    }

    // If guest, don't make an API call.
    if (this.state.isGuest) {
      const user = cloneDeep(this.state.user);
      user.budgets.push(this.getNewBudget());
      user.budgetsCreated++;
      this.setState({ user });

      if (this.state.user.budgets.length === 4) {
        this.setMessage(
          `${user.budgets.length} budgets! You're a savvy financial planner.`
        );
        this.clearMessage(5000);
      } else {
        this.setMessage('Created new budget.');
        this.clearMessage();
      }

      return Promise.resolve();
    } else return this.createBudget();
  };

  createBudget = () =>
    fetch('http://localhost:3001/budget', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        app_user_id: this.state.user.id,
        name: this.getNewBudgetName(),
      }),
    })
      .then((response) =>
        response.status === 400 ? Promise.reject(Error()) : response.json()
      )
      .then((data) => {
        this.loadBudget(data);

        if (this.state.user.budgets.length === 5) {
          this.setMessage(
            `${this.state.user.budgets.length} budgets! You're a savvy financial planner.`
          );
          this.clearMessage(5000);
        } else {
          this.setMessage('Created new budget.');
          this.clearMessage();
        }
      })
      .catch((error) => {
        if (this.state.user.budgets.length) {
          this.setMessage(
            'There was a problem creating your budget. Please try again later.'
          );
          this.clearMessage();
        } else return Promise.reject(Error());
      });

  loadBudget = (data) => {
    const user = cloneDeep(this.state.user);
    user.budgets.push(this.getBudgetFromData(data));
    this.setState({ user });
  };

  /**
   *
   * @param {string} name The budget name that is being copied.
   * @returns {string} The budget copy name.
   * Ex. 'August 2021 (2)' if there are no copies of 'August 2021' or
   * 'August 2021 (5)' if the newest copy is 'August 2021 (4)'.
   */
  getBudgetCopyName = (name) => {
    const regex = /\(\d+\)$/;
    // \( matches the character '('.
    // \d matches a digit (equivalent to [0-9])
    // + matches the previous token (a digit) between one and unlimited times.
    // \) matches the character ')'.
    // $ asserts position at the end of the string.
    if (regex.test(name)) name = name.slice(0, name.search(regex) - 1);

    const copyNumberArray = this.state.user.budgets
      // Find budget copies.
      .filter(
        (budget) => budget.name.startsWith(name) && regex.test(budget.name)
      )
      // Extract and sort copy numbers in descending order.
      .map((copy) =>
        parseInt(
          copy.name.slice(copy.name.search(regex) + 1, copy.name.length - 1)
        )
      )
      .sort((a, b) => b - a);

    return name + ` (${copyNumberArray[0] + 1 || 2})`;
  };

  handleCreateBudgetCopy = (index) => {
    if (this.state.user.budgets.length === this.state.maxBudgets) {
      this.setMessage(
        "Maximum number of budgets created. That's a lot of budgets!"
      );
      this.clearMessage(6000);
      return;
    }
    const budgetCopy = cloneDeep(this.state.user.budgets[index]);
    budgetCopy.id = this.state.user.budgetsCreated;
    budgetCopy.name = this.getBudgetCopyName(budgetCopy.name);
    budgetCopy.lastSaved = null;

    const user = cloneDeep(this.state.user);
    user.budgets.splice(index + 1, 0, budgetCopy);
    user.budgetsCreated++;
    user.currentBudgetIndex = index + 1;
    this.setState({ user });

    if (this.state.user.budgets.length === 4) {
      this.setMessage(
        `${user.budgets.length} budgets! You're a savvy financial planner.`
      );
      this.clearMessage(5000);
      return;
    }
    this.setMessage('Created budget copy.');
    this.clearMessage();
  };

  handleSaveBudgets = () => {
    if (!this.state.isGuest) {
      const user = cloneDeep(this.state.user);
      user.budgets = user.budgets.map((budget) => ({
        ...budget,
        lastSaved: new Date(),
      }));
      this.setState({ user });
    }
    this.setMessage(
      this.state.isGuest
        ? 'Sign in to save your budgets.'
        : this.state.user.budgets.length === 0
        ? 'No budgets to save.'
        : this.state.user.budgets.length === 1
        ? 'Saved 1 budget.'
        : `Saved ${this.state.user.budgets.length} budgets.`
    );
    this.clearMessage();
  };

  handleSaveBudget = () => {
    if (!this.state.isGuest) {
      const user = cloneDeep(this.state.user);
      user.budgets = user.budgets.map((budget, index) =>
        index === user.currentBudgetIndex
          ? { ...budget, lastSaved: new Date() }
          : budget
      );
      this.setState({ user });
    }
    this.setMessage(
      this.state.isGuest ? 'Sign in to save your budgets.' : 'Saved budget.'
    );
    this.clearMessage();
  };

  editBudgetName = () => {
    this.clearTooltip();
    const isEditing = { ...this.state.isEditing, budgetName: true };
    this.setState({ isEditing });
  };
  editCategory = (entryId) => {
    const isEditing = { ...this.state.isEditing, category: true, entryId };
    this.setState({ isEditing });
  };
  editProjectedCost = (entryId) => {
    const isEditing = { ...this.state.isEditing, projectedCost: true, entryId };
    this.setState({ isEditing });
  };
  editActualCost = (entryId) => {
    const isEditing = { ...this.state.isEditing, actualCost: true, entryId };
    this.setState({ isEditing });
  };
  editProjectedMonthlyIncome = () => {
    const isEditing = { ...this.state.isEditing, projectedMonthlyIncome: true };
    this.setState({ isEditing });
  };
  editActualMonthlyIncome = () => {
    const isEditing = { ...this.state.isEditing, actualMonthlyIncome: true };
    this.setState({ isEditing });
  };

  handleBudgetNameChange = (event) => {
    if (
      event.target.value.trim() &&
      event.target.value !==
        this.state.user.budgets[this.state.user.currentBudgetIndex].name
    ) {
      const user = cloneDeep(this.state.user);
      user.budgets[this.state.user.currentBudgetIndex].name =
        event.target.value;
      this.setState({ user });
      this.setMessage('Changed budget name.');
      this.clearMessage();
    }
    const isEditing = {
      ...this.state.isEditing,
      budgetName: false,
      entryId: null,
    };
    this.setState({ isEditing });
  };

  handleCategoryChange = (entryId, event) => {
    const entry = this.state.user.budgets[
      this.state.user.currentBudgetIndex
    ].entries.filter((entry) => entry.id === entryId);

    if (event.target.value.trim() && event.target.value !== entry.category) {
      const user = cloneDeep(this.state.user);
      const updatedEntries = user.budgets[
        this.state.user.currentBudgetIndex
      ].entries.map((entry) => {
        if (entry.id === entryId) {
          entry.category = event.target.value;
          return entry;
        }
        return entry;
      });
      user.budgets[this.state.user.currentBudgetIndex].entries = updatedEntries;
      this.setState({ user });
    }
    const isEditing = { ...this.state.isEditing, category: false };
    this.setState({ isEditing });
  };

  handleProjectedCostChange = (entryId, event) => {
    const cost = event.target.value;

    // If input is not equal to current state, update state.
    if (
      Math.round(cost * 100) / 100 !==
        this.state.user.budgets[
          this.state.user.currentBudgetIndex
        ].entries.filter((entry) => entry.id === entryId)[0].projectedCost &&
      this.numberIsValid(cost)
    ) {
      const user = cloneDeep(this.state.user);
      const updatedEntries = user.budgets[user.currentBudgetIndex].entries.map(
        (entry) => {
          if (entry.id === entryId)
            return { ...entry, projectedCost: Math.round(cost * 100) / 100 };
          return entry;
        }
      );
      user.budgets[this.state.user.currentBudgetIndex].entries = updatedEntries;
      this.setState({ user });
    }
    const isEditing = {
      ...this.state.isEditing,
      projectedCost: false,
      entryId: null,
    };
    this.setState({ isEditing });
  };

  handleActualCostChange = (entryId, event) => {
    const cost = event.target.value;

    // If input is not equal to current state, update state.
    if (
      Math.round(cost * 100) / 100 !==
        this.state.user.budgets[
          this.state.user.currentBudgetIndex
        ].entries.filter((entry) => entry.id === entryId)[0].actualCost &&
      this.numberIsValid(cost)
    ) {
      const user = cloneDeep(this.state.user);
      const updatedEntries = user.budgets[user.currentBudgetIndex].entries.map(
        (entry) => {
          if (entry.id === entryId)
            return { ...entry, actualCost: Math.round(cost * 100) / 100 };
          return entry;
        }
      );
      user.budgets[this.state.user.currentBudgetIndex].entries = updatedEntries;
      this.setState({ user });
    }
    const isEditing = {
      ...this.state.isEditing,
      actualCost: false,
      entryId: null,
    };
    this.setState({ isEditing });
  };

  handleProjectedMonthlyIncomeChange = (event) => {
    const income = event.target.value;

    // If input is not equal to current state, update state.
    if (
      Math.round(income * 100) / 100 !==
        this.state.user.budgets[this.state.user.currentBudgetIndex]
          .projectedMonthlyIncome &&
      this.numberIsValid(income)
    ) {
      const user = cloneDeep(this.state.user);
      user.budgets[user.currentBudgetIndex].projectedMonthlyIncome =
        Math.round(income * 100) / 100;

      this.setState({ user });

      this.setMessage(
        `Projected monthly income updated to ${formatterUSD.format(income)}.`
      );
      this.clearMessage(5000);
    }
    const isEditing = {
      ...this.state.isEditing,
      projectedMonthlyIncome: false,
    };
    this.setState({ isEditing });
  };

  handleActualMonthlyIncomeChange = (event) => {
    const income = event.target.value;

    // If input is not equal to current state, update state.
    if (
      Math.round(income * 100) / 100 !==
        this.state.user.budgets[this.state.user.currentBudgetIndex]
          .actualMonthlyIncome &&
      this.numberIsValid(income)
    ) {
      const user = cloneDeep(this.state.user);
      user.budgets[user.currentBudgetIndex].actualMonthlyIncome =
        Math.round(income * 100) / 100;

      this.setState({ user });
      this.setMessage(
        `Actual monthly income updated to ${formatterUSD.format(income)}.`
      );
      this.clearMessage(5000);
    }
    const isEditing = { ...this.state.isEditing, actualMonthlyIncome: false };
    this.setState({ isEditing });
  };

  numberIsValid = (
    number,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER
  ) => number <= max && number >= min;

  // Update state displayName input with user input.
  handleDisplayNameInputChange = (event) => {
    const displayName = {
      ...this.state.input.displayName,
      value: event.target.value,
      empty: false,
    };
    const input = { ...this.state.input, displayName };
    this.setState({ input });
  };

  // Change display name if input is not empty or whitespace and
  // different from current display name.
  handleDisplayNameChange = () => {
    if (
      this.state.input.displayName.value.trim() &&
      this.state.input.displayName.value !== this.state.user.displayName
    ) {
      // Clear input and update user display name.
      const input = cloneDeep(this.state.input);
      input.displayName.value = '';
      const user = {
        ...this.state.user,
        displayName: this.state.input.displayName.value,
      };
      this.setState({ input, user });
      this.setMessage('Display name changed successfully.');
      this.clearMessage();
    }
  };

  handleUsernameInputChange = (event) => {
    const username = {
      ...this.state.input.username,
      value: event.target.value,
      empty: false,
    };
    const input = { ...this.state.input, username };
    this.setState({ input });
  };

  handlePasswordInputChange = (event) => {
    const password = {
      ...this.state.input.password,
      value: event.target.value,
      empty: false,
    };
    const input = { ...this.state.input, password };
    this.setState({ input });
  };

  handleNewPasswordInputChange = (event) => {
    const newPassword = {
      ...this.state.input.newPassword,
      value: event.target.value,
      empty: false,
    };
    const input = { ...this.state.input, newPassword };
    this.setState({ input });
  };

  handlePasswordChange = () => {
    // New password entered but current password empty.
    if (
      this.state.input.newPassword.value &&
      !this.state.input.password.value
    ) {
      const password = {
        ...this.state.input.password,
        empty: true,
      };
      const input = { ...this.state.input, password };
      this.setState({ input, windowMessage: 'Please enter current password.' });
    }
    // Current password entered but new password empty.
    else if (
      this.state.input.password.value &&
      !this.state.input.newPassword.value
    ) {
      const newPassword = {
        ...this.state.input.newPassword,
        empty: true,
      };
      const input = { ...this.state.input, newPassword };
      this.setState({ input, windowMessage: 'Please enter new password.' });
    } else if (
      this.state.input.newPassword.value.length <
        this.state.input.newPassword.minLength ||
      this.state.input.newPassword.value.length >
        this.state.input.newPassword.maxLength
    ) {
      const newPassword = {
        ...this.state.input.newPassword,
        empty: true,
      };
      const input = { ...this.state.input, newPassword };
      this.setState({
        input,
        windowMessage: `Password should be between ${input.newPassword.minLength} and ${input.newPassword.maxLength} characters.`,
      });
    } else if (
      this.state.input.password.value.length <
        this.state.input.password.minLength ||
      this.state.input.password.value.length >
        this.state.input.password.maxLength
    ) {
      const password = {
        ...this.state.input.password,
        empty: true,
      };
      const input = { ...this.state.input, password };
      this.setState({ input, windowMessage: 'Current password invalid.' });
    } else if (
      this.state.input.password.value === this.state.input.newPassword.value
    ) {
      const password = {
        ...this.state.input.password,
        empty: true,
      };
      const newPassword = {
        ...this.state.input.newPassword,
        empty: true,
      };
      const input = { ...this.state.input, password, newPassword };
      this.setState({
        input,
        windowMessage: 'New password must be different from current password.',
      });
    } else {
      const input = cloneDeep(this.state.input);
      input.password = { ...initialState.input.password };
      input.newPassword = { ...initialState.input.newPassword };
      this.setState({ input, windowMessage: null });
      this.setMessage('Password changed successfully.');
      this.clearMessage();
    }
  };

  handleSignUp = () => {
    if (
      !this.state.input.displayName.value.trim() ||
      !this.state.input.username.value.trim() ||
      !this.state.input.newPassword.value
    ) {
      let input = { ...this.state.input };
      if (!this.state.input.displayName.value.trim()) {
        const displayName = { ...this.state.input.displayName, empty: true };
        input.displayName = displayName;
      } else {
        const displayName = { ...this.state.input.displayName, empty: false };
        input.displayName = displayName;
      }
      if (!this.state.input.username.value.trim()) {
        const username = { ...this.state.input.username, empty: true };
        input.username = username;
      } else {
        const username = { ...this.state.input.username, empty: false };
        input.username = username;
      }
      if (!this.state.input.newPassword.value) {
        const newPassword = { ...this.state.input.newPassword, empty: true };
        input.newPassword = newPassword;
      } else {
        const newPassword = { ...this.state.input.newPassword, empty: false };
        input.newPassword = newPassword;
      }
      this.setState({ input, windowMessage: 'Please fill out all fields.' });
    } else if (
      this.state.input.newPassword.value.length <
        this.state.input.newPassword.minLength ||
      this.state.input.newPassword.value.length >
        this.state.input.newPassword.maxLength
    ) {
      const newPassword = {
        ...this.state.input.newPassword,
        empty: true,
      };
      const input = { ...this.state.input, newPassword };
      this.setState({
        input,
        windowMessage: `Password should be between ${input.newPassword.minLength} and ${input.newPassword.maxLength} characters.`,
      });
    } else this.signUp();
  };

  handleSignIn = () => {
    if (
      !this.state.input.username.value.trim() &&
      !this.state.input.password.value
    ) {
      const input = cloneDeep(this.state.input);
      input.username.empty = true;
      input.password.empty = true;
      this.setState({
        windowMessage: 'Username and password required.',
        input,
      });
    } else if (!this.state.input.username.value.trim()) {
      this.setState({ windowMessage: 'Username required.' });
      const username = { ...this.state.input.username, empty: true };
      const input = { ...this.state.input, username };
      this.setState({ input });
    } else if (!this.state.input.password.value) {
      this.setState({ windowMessage: 'Password required.' });
      const password = { ...this.state.input.password, empty: true };
      const input = { ...this.state.input, password };
      this.setState({ input });
    } else if (
      this.state.input.password.value.length <
        this.state.input.password.minLength ||
      this.state.input.password.value.length >
        this.state.input.password.maxLength
    )
      this.setState({ windowMessage: 'Invalid username or password.' });
    else this.signIn();
  };

  signUp = () => {
    fetch('http://localhost:3001/sign-up', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        display_name: this.state.input.displayName.value,
        username: this.state.input.username.value,
        password: this.state.input.newPassword.value,
      }),
    })
      .then((response) =>
        response.status === 409
          ? Promise.reject(Error('Conflict'))
          : response.status === 400
          ? Promise.reject(Error())
          : response.json()
      )
      .then((data) => {
        localStorage.setItem('background', this.state.background.name);
        this.loadUser(data);
        setTimeout(
          () => this.setMessage(`Welcome, ${this.state.user.displayName}.`),
          0
        );
        this.clearMessage(6000);
      })
      .catch((error) => {
        if (error.message === 'Conflict') {
          const username = { ...this.state.input.username, empty: true };
          const input = { ...this.state.input, username };
          this.setState({
            input,
            windowMessage:
              'That username has already been taken. Please try another one.',
          });
        } else
          this.setState({
            windowMessage:
              'There was a problem signing up. Please try again later.',
          });
      });
  };

  loadUser = (data) =>
    this.setState({
      user: {
        id: data.id,
        username: data.username,
        displayName: data.display_name,
        joinDate: new Date(data.join_date),
        currentBudgetIndex: data.current_budget_index,
        budgets: data.budgets.map((budget) => this.getBudgetFromData(budget)),
      },
      route: 'budget',
      input: initialState.input,
      windowMessage: null,
      isLoggedIn: true,
      isGuest: false,
    });

  signIn = () => {
    fetch('http://localhost:3001/sign-in', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.input.username.value,
        password: this.state.input.password.value,
      }),
    })
      .then((response) =>
        response.status === 400
          ? Promise.reject(Error('Bad Request'))
          : response.json()
      )
      .then((data) => {
        localStorage.setItem('background', this.state.background.name);
        this.loadUser(data);
        setTimeout(
          () => this.setMessage(`Welcome, ${this.state.user.displayName}.`),
          0
        );
        this.clearMessage(6000);
      })
      .catch((error) => {
        if (error.message === 'Bad Request')
          this.setState({
            windowMessage: 'Invalid username or password.',
          });
        else
          this.setState({
            windowMessage:
              'There was a problem signing in. Please try again later.',
          });
      });
  };

  /**
   *
   * @param {requestCallback} callback The function to be called upon
   * key code press.
   * @param {number} code JavaScript event code.
   * Defaults to 'Enter'.
   */
  handleKeyDown =
    (callback, code = 'Enter') =>
    (event) => {
      if (event.target.value !== '' && event.code === code) callback();
    };

  handleToggledExpandNav = () => {
    this.setState({
      toggledExpandNav: this.state.toggledExpandNav ? false : true,
    });
  };

  handleRouteChange = (route) => {
    /*
    Automatically create a budget if user routes to 'budget' with no budgets.
    Change route after budget has loaded (handleCreateBudget returns a fetch
    request if user is not a guest or a resolved promise otherwise to make the
    function thenable.
    */
    if (route === 'budget' && this.state.user.budgets.length === 0) {
      this.handleCreateBudget()
        .then(() => {
          this.setState({ route: 'budget' });
        })
        .catch(() => {
          this.setMessage(
            'There was a problem creating your budget. Please try again later.'
          );
          this.clearMessage();
        });
    }
    // Handle guest sign in.
    else if (
      route !== this.state.route &&
      route !== 'sign-up' &&
      route !== 'sign-in' &&
      !this.state.isLoggedIn &&
      this.state.isGuest
    ) {
      const user = { ...this.state.user, joinDate: new Date() };
      this.setState({
        user,
        route,
        input: initialState.input,
        windowMessage: null,
        isLoggedIn: true,
      });
      setTimeout(
        () => this.setMessage(`Welcome, ${this.state.user.displayName}.`),
        0
      );
      this.clearMessage(6000);
    }
    // Handle guest sign out.
    else if (
      route !== this.state.route &&
      (route === 'sign-up' || route === 'sign-in') &&
      this.state.isLoggedIn &&
      this.state.isGuest
    )
      this.setState({ ...initialState, background: this.state.background });
    // Reset input and message code when routing between
    // SignIn and SignUp components.
    else if (
      (route === 'sign-in' || route === 'sign-up') &&
      (this.state.route === 'sign-in' || this.state.route === 'sign-up')
    )
      this.setState({
        input: initialState.input,
        windowMessage: null,
        route,
      });
    else if (route !== this.state.route) this.setState({ route });
  };

  render() {
    const {
      route,
      input,
      isEditing,
      message,
      showMessage,
      tooltip,
      showTooltipRight,
      showTooltipLeft,
      windowMessage,
      mousePosition,
      isLoggedIn,
      isGuest,
      clickedDeleteBudget,
      toggledExpandNav,
      maxBudgets,
      user,
      background,
    } = this.state;

    const formattedBudget =
      user.budgets.length === 0
        ? formatBudget(this.getNewBudget(), formatterUSD)
        : formatBudget(user.budgets[user.currentBudgetIndex], formatterUSD);
    const formattedEntries = formatEntries(
      user.budgets[user.currentBudgetIndex]?.entries,
      formatterUSD
    );

    const { budgetName, addEntry, category, ...landingInput } = input;

    return (
      <>
        <CustomScrollbars classlist="bg--light hover-opacity br-pill o-90">
          <BackgroundWrapper background={background}>
            <div className="App clr-light ff-primary fs-body">
              <Nav
                route={route}
                handleRouteChange={this.handleRouteChange}
                isLoggedIn={isLoggedIn}
                isGuest={isGuest}
                handleToggledExpandNav={this.handleToggledExpandNav}
                toggledExpandNav={toggledExpandNav}
              />
              {route === 'sign-in' || route === 'sign-up' ? (
                <Landing
                  handleRouteChange={this.handleRouteChange}
                  route={route}
                  useDarkLanding={background.useDarkLanding}
                  handleDisplayNameInputChange={
                    this.handleDisplayNameInputChange
                  }
                  handleUsernameInputChange={this.handleUsernameInputChange}
                  handlePasswordInputChange={this.handlePasswordInputChange}
                  handleNewPasswordInputChange={
                    this.handleNewPasswordInputChange
                  }
                  handleKeyDown={this.handleKeyDown}
                  handleSignUp={this.handleSignUp}
                  handleSignIn={this.handleSignIn}
                  windowMessage={windowMessage}
                  input={landingInput}
                  getPasswordInputStyle={getPasswordInputStyle}
                />
              ) : route === 'budget' ? (
                <Budget
                  budget={user.budgets[user.currentBudgetIndex]}
                  formattedBudget={formattedBudget}
                  entries={user.budgets[user.currentBudgetIndex].entries}
                  formattedEntries={formattedEntries}
                  currentBudgetIndex={user.currentBudgetIndex}
                  handleSaveBudget={this.handleSaveBudget}
                  handleCreateBudgetCopy={this.handleCreateBudgetCopy}
                  editBudgetName={this.editBudgetName}
                  editProjectedMonthlyIncome={this.editProjectedMonthlyIncome}
                  editActualMonthlyIncome={this.editActualMonthlyIncome}
                  isEditingBudgetName={isEditing.budgetName}
                  isEditingProjectedMonthlyIncome={
                    isEditing.projectedMonthlyIncome
                  }
                  isEditingActualMonthlyIncome={isEditing.actualMonthlyIncome}
                  handleBudgetNameChange={this.handleBudgetNameChange}
                  handleProjectedMonthlyIncomeChange={
                    this.handleProjectedMonthlyIncomeChange
                  }
                  handleActualMonthlyIncomeChange={
                    this.handleActualMonthlyIncomeChange
                  }
                  handleAddEntryInputChange={this.handleAddEntryInputChange}
                  handleKeyDown={this.handleKeyDown}
                  handleAddEntry={this.handleAddEntry}
                  handleDeleteEntry={this.handleDeleteEntry}
                  editCategory={this.editCategory}
                  editProjectedCost={this.editProjectedCost}
                  editActualCost={this.editActualCost}
                  isEditingCategory={isEditing.category}
                  isEditingProjectedCost={isEditing.projectedCost}
                  isEditingActualCost={isEditing.actualCost}
                  isEditingEntryId={isEditing.entryId}
                  handleCategoryChange={this.handleCategoryChange}
                  handleProjectedCostChange={this.handleProjectedCostChange}
                  handleActualCostChange={this.handleActualCostChange}
                  handleClickedDeleteBudget={this.handleClickedDeleteBudget}
                  handleDeleteBudget={this.handleDeleteBudget}
                  clickedDeleteBudget={clickedDeleteBudget}
                  input={input}
                  setTooltip={this.setTooltip}
                  clearTooltip={this.clearTooltip}
                  toggledExpandNav={toggledExpandNav}
                />
              ) : route === 'saved-budgets' ? (
                <SavedBudgets
                  user={user}
                  handleViewBudget={this.handleViewBudget}
                  handleCreateBudget={this.handleCreateBudget}
                  handleSaveBudgets={this.handleSaveBudgets}
                  currentBudgetIndex={user.currentBudgetIndex}
                  handleKeyDown={this.handleKeyDown}
                  toggledExpandNav={toggledExpandNav}
                />
              ) : route === 'profile' ? (
                <Profile
                  user={user}
                  input={input}
                  windowMessage={windowMessage}
                  isGuest={isGuest}
                  toggledExpandNav={toggledExpandNav}
                  handleDisplayNameInputChange={
                    this.handleDisplayNameInputChange
                  }
                  handleDisplayNameChange={this.handleDisplayNameChange}
                  handlePasswordInputChange={this.handlePasswordInputChange}
                  handleNewPasswordInputChange={
                    this.handleNewPasswordInputChange
                  }
                  handlePasswordChange={this.handlePasswordChange}
                  handleKeyDown={this.handleKeyDown}
                  handleBackgroundChange={this.handleBackgroundChange}
                  backgrounds={backgrounds}
                  currentBackground={background}
                  maxBudgets={maxBudgets}
                  savedBudgets={user.budgets.filter(
                    (budget) => budget.lastSaved
                  )}
                  getPasswordInputStyle={getPasswordInputStyle}
                />
              ) : route === 'about' ? (
                <About toggledExpandNav={toggledExpandNav} />
              ) : null}
              {route === 'sign-up' || route === 'sign-in' ? null : (
                <CSSTransition
                  in={showMessage}
                  classNames="message"
                  timeout={500}
                  unmountOnExit
                  onExited={() => this.setState({ message: null })}
                >
                  <Message message={message} />
                </CSSTransition>
              )}

              <CSSTransition
                in={showTooltipRight || showTooltipLeft}
                classNames="tooltip"
                timeout={1000}
                unmountOnExit
                onExited={() => this.setState({ tooltip: null })}
              >
                <Tooltip
                  tooltip={tooltip}
                  showTooltipLeft={showTooltipLeft}
                  mousePosition={mousePosition}
                />
              </CSSTransition>
            </div>
          </BackgroundWrapper>
        </CustomScrollbars>
        <PreloadedBackgrounds backgrounds={backgrounds} />
      </>
    );
  }
}

export default App;
