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
'signin', 'signup', 'budget', 'saved-budgets', 'profile', 'about'

Valid landing message codes:
'fields-empty', 'password-length-invalid', 'credentials-invalid',
'username-empty', 'password-empty'
*/

// Set initial state to be passed into App state.
const initialState = {
  route: 'signup',
  message: { code: null, show: false },
  tooltip: { code: null, show: false, showToLeft: null, custom: null },
  mousePosition: { x: null, y: null },
  landingMessageCode: null,
  input: {
    displayName: { value: '', empty: false, maxLength: 50 },
    username: { value: '', empty: false, maxLength: 50 },
    password: { value: '', empty: false, minLength: 6, maxLength: 60 },
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
  isLoggedIn: false,
  isGuest: false,
  clickedDeleteBudget: false,
  toggledExpandNav: false,
  maxBudgets: 100,
  maxEntries: 100,
  user: {
    id: null,
    displayName: 'Guest',
    username: null,
    joined: null,
    currentBudgetIndex: 0,
    budgetsCreated: 0,
    budgetsDeleted: 0,
  },
};

const defaultEntries = [
  {
    id: 0,
    category: 'Housing costs',
    projectedCost: 1000,
    actualCost: 0,
    getDifference() {
      return this.projectedCost - this.actualCost;
    },
  },
  {
    id: 1,
    category: 'Vehicle expenses',
    projectedCost: 200,
    actualCost: 0,
    getDifference() {
      return this.projectedCost - this.actualCost;
    },
  },
  {
    id: 2,
    category: 'Phone bill',
    projectedCost: 20,
    actualCost: 0,
    getDifference() {
      return this.projectedCost - this.actualCost;
    },
  },
  {
    id: 3,
    category: 'Groceries',
    projectedCost: 250,
    actualCost: 0,
    getDifference() {
      return this.projectedCost - this.actualCost;
    },
  },
  {
    id: 4,
    category: 'Savings',
    projectedCost: 100,
    actualCost: 0,
    getDifference() {
      return this.projectedCost - this.actualCost;
    },
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
const formatterUnitedStatesDollar = new Intl.NumberFormat('en-US', {
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

/**
 *
 * @param {string[]} strings Array of strings.
 * @returns {boolean} true if at least one string is falsy (empty) or false
 * if no string is empty.
 */
const someStringsEmpty = (strings) => strings.some((string) => !string);

/**
 *
 * @param {string[]} strings Array of strings.
 * @returns {boolean} true if all strings are falsy (empty) or false
 * if at least one string is not empty.
 */
const allStringsEmpty = (strings) => strings.every((string) => !string);

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

  setMessage = (code) => {
    const message = { ...this.state.message, code, show: true };
    this.setState({ message });
  };

  /**
   *
   * @param {number} milliseconds Number of milliseconds to clear message after.
   */
  clearMessage = (milliseconds = 4000) => {
    if (this.messageTimeout) clearTimeout(this.messageTimeout);

    this.messageTimeout = setTimeout(() => {
      const message = { ...this.state.message, show: false };
      this.setState({ message });
    }, milliseconds);
  };

  setTooltip = (code, event, custom) => {
    const tooltip = {
      ...this.state.tooltip,
      code,
      show: true,
      showToLeft: event.clientX / window.innerWidth > 0.5,
      custom: custom ?? null,
    };
    const mousePosition = {
      ...this.state.mousePosition,
      x: event.clientX,
      y: event.clientY,
    };
    this.setState({ tooltip, mousePosition });
  };

  clearTooltip = () => {
    const tooltip = { ...this.state.tooltip, show: false };
    this.setState({ tooltip });
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
      this.setMessage('entries-max-allowed');
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
    user.budgets[user.currentBudgetIndex].entriesDeleted++;
    this.setState({ user });
  };

  // Event handler for initial delete button.
  // Changes delete button to confirm delete button.
  handleUserClickedDeleteBudget = (userClicked) => {
    if (userClicked) {
      this.setState({ clickedDeleteBudget: true });
    } else {
      this.setState({ clickedDeleteBudget: false });
    }
  };

  // Event handler for confirm delete button.
  handleDeleteBudget = () => {
    const filteredBudgets = this.state.user.budgets.filter(
      (budget, i) => i !== this.state.user.currentBudgetIndex
    );

    const user = Object.assign(cloneDeep(this.state.user), {
      budgets: filteredBudgets,
      currentBudgetIndex:
        this.state.user.currentBudgetIndex >= 1
          ? this.state.user.currentBudgetIndex - 1
          : 0,
      budgetsDeleted: this.state.user.budgetsDeleted + 1,
    });
    this.setState({
      user,
      route: 'saved-budgets',
      clickedDeleteBudget: false,
    });
    this.setMessage('budget-deleted');
    this.clearMessage();
  };

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

  // Create budget object. Budget name is set using the Date object.
  // Name depends on current date and current number of budgets.
  getNewBudget = () => ({
    id: this.state.user.budgetsCreated,
    name: this.getNewBudgetName(),
    lastSaved: null,
    entriesCreated: defaultEntries.length,
    entriesDeleted: 0,
    projectedMonthlyIncome: 0,
    actualMonthlyIncome: 0,
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
    entries: defaultEntries,
  });

  // Event handler for view budget link.
  // Sets user.currentBudgetIndex to the selected budget's index
  // and route to 'budget'.
  handleViewBudget = (index) => {
    const user = { ...this.state.user, currentBudgetIndex: index };
    this.setState({ user, route: 'budget' });
  };

  handleCreateBudget = () => {
    if (this.state.user.budgets.length === this.state.maxBudgets) {
      this.setMessage('budgets-max-allowed');
      this.clearMessage(6000);
      return;
    }
    const user = cloneDeep(this.state.user);
    user.budgets.push(this.getNewBudget());
    user.budgetsCreated++;
    this.setState({ user });

    if (this.state.user.budgets.length === 4) {
      this.setMessage('budgets-created-many');
      this.clearMessage(5000);
      return;
    }
    this.setMessage('budget-created');
    this.clearMessage();
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
      this.setMessage('budgets-max-allowed');
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
      this.setMessage('budgets-created-many');
      this.clearMessage(5000);
      return;
    }
    this.setMessage('budget-copy-created');
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
    this.setMessage('budgets-saved');
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
    this.setMessage('budget-saved');
    this.clearMessage();
  };

  editBudgetName = () => {
    if (this.state.tooltip.code === 'edit-budget-name') this.clearTooltip();
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

  handleUpdateBudgetName = (event) => {
    if (
      this.state.user.budgets[this.state.user.currentBudgetIndex].name !==
        event.target.value.trim() &&
      event.target.value.trim()
    ) {
      const user = cloneDeep(this.state.user);
      user.budgets[this.state.user.currentBudgetIndex].name =
        event.target.value.trim();
      this.setState({ user });
      this.setMessage('budget-name-changed');
      this.clearMessage();
    }
    const isEditing = {
      ...this.state.isEditing,
      budgetName: false,
      entryId: null,
    };
    this.setState({ isEditing });
  };

  handleUpdateCategory = (entryId, event) => {
    const entry = this.state.user.budgets[
      this.state.user.currentBudgetIndex
    ].entries.filter((entry) => entry.id === entryId);

    if (
      entry.category !== event.target.value.trim() &&
      event.target.value.trim()
    ) {
      const user = cloneDeep(this.state.user);
      const updatedEntries = user.budgets[
        this.state.user.currentBudgetIndex
      ].entries.map((entry) => {
        if (entry.id === entryId) {
          entry.category = event.target.value.trim();
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

  handleUpdateProjectedCost = (entryId, event) => {
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

  handleUpdateActualCost = (entryId, event) => {
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

  handleUpdateProjectedMonthlyIncome = (event) => {
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
      this.setMessage('projected-monthly-income-updated');
      this.clearMessage(5000);
    }
    const isEditing = {
      ...this.state.isEditing,
      projectedMonthlyIncome: false,
    };
    this.setState({ isEditing });
  };

  handleUpdateActualMonthlyIncome = (event) => {
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
      this.setMessage('actual-monthly-income-updated');
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

  // Change display name if display name input is different from current
  // display name and display name input is not an empty string.
  handleChangeDisplayName = () => {
    if (
      this.state.input.displayName.value !== this.state.user.displayName &&
      this.state.input.displayName.value !== ''
    ) {
      // Clear input and update user display name.
      const input = cloneDeep(this.state.input);
      input.displayName.value = '';
      const user = {
        ...this.state.user,
        displayName: this.state.input.displayName.value,
      };
      this.setState({ input, user });
      this.setMessage('display-name-changed');
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

  handleUserSignUp = () => {
    if (
      someStringsEmpty([
        this.state.input.displayName.value,
        this.state.input.username.value,
        this.state.input.password.value,
      ])
    ) {
      let input = { ...this.state.input };
      if (!this.state.input.displayName.value) {
        const displayName = { ...this.state.input.displayName, empty: true };
        input.displayName = displayName;
      } else {
        const displayName = { ...this.state.input.displayName, empty: false };
        input.displayName = displayName;
      }
      if (!this.state.input.username.value) {
        const username = { ...this.state.input.username, empty: true };
        input.username = username;
      } else {
        const username = { ...this.state.input.username, empty: false };
        input.username = username;
      }
      if (!this.state.input.password.value) {
        const password = { ...this.state.input.password, empty: true };
        input.password = password;
      } else {
        const password = { ...this.state.input.password, empty: false };
        input.password = password;
      }
      this.setState({ landingMessageCode: 'fields-empty', input });
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
      this.setState({ landingMessageCode: 'password-length-invalid', input });
    } else this.setState({ landingMessageCode: null });
  };

  handleUserSignIn = () => {
    if (
      allStringsEmpty([
        this.state.input.username.value,
        this.state.input.password.value,
      ])
    ) {
      const input = cloneDeep(this.state.input);
      input.username.empty = true;
      input.password.empty = true;
      this.setState({ landingMessageCode: 'fields-empty', input });
    } else if (!this.state.input.username.value) {
      this.setState({ landingMessageCode: 'username-empty' });
      const username = { ...this.state.input.username, empty: true };
      const input = { ...this.state.input, username };
      this.setState({ input });
    } else if (!this.state.input.password.value) {
      this.setState({ landingMessageCode: 'password-empty' });
      const password = { ...this.state.input.password, empty: true };
      const input = { ...this.state.input, password };
      this.setState({ input });
    } else if (
      this.state.input.password.value.length <
        this.state.input.password.minLength ||
      this.state.input.password.value.length >
        this.state.input.password.maxLength
    )
      this.setState({ landingMessageCode: 'credentials-invalid' });
    else {
      this.setState({ landingMessageCode: null });
    }
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
      if (event.code === code && event.target.value !== '') callback();
    };

  handleUserToggledExpandNav = () => {
    this.setState({
      toggledExpandNav: this.state.toggledExpandNav ? false : true,
    });
  };

  handleRouteChange = (route) => {
    // Create a budget if user routes to Budget with no saved-budgets.
    if (route === 'budget' && this.state.user.budgets.length === 0) {
      this.handleCreateBudget();
      this.setState({ route: 'budget' });
    }
    // Handle user sign in.
    else if (
      route !== this.state.route &&
      route !== 'signup' &&
      route !== 'signin' &&
      !this.state.isLoggedIn &&
      !this.state.isGuest
    ) {
      localStorage.setItem('background', this.state.background.name);

      const user = { ...this.state.user, joined: new Date() };
      this.setState({
        user,
        route,
        input: initialState.input,
        landingMessageCode: null,
        isLoggedIn: true,
      });
      setTimeout(() => this.setMessage('user-logged-in'), 0);
      this.clearMessage(6000);
    }
    // Handle guest sign in (don't set background in localStorage).
    else if (
      route !== this.state.route &&
      route !== 'signup' &&
      route !== 'signin' &&
      !this.state.isLoggedIn &&
      this.state.isGuest
    ) {
      const user = { ...this.state.user, joined: new Date() };
      this.setState({
        user,
        route,
        input: initialState.input,
        landingMessageCode: null,
        isLoggedIn: true,
      });
      setTimeout(() => this.setMessage('user-logged-in'), 0);
      this.clearMessage(6000);
    }
    // Handle user/guest sign out.
    else if (
      route !== this.state.route &&
      (route === 'signup' || route === 'signin') &&
      this.state.isLoggedIn
    ) {
      this.clearMessage(0);
      this.setState({
        route,
        input: initialState.input,
        user: initialState.user,
      });
    }
    // Reset input and message code when routing between
    // SignIn and SignUp components.
    else if (
      (route === 'signin' || route === 'signup') &&
      (this.state.route === 'signin' || this.state.route === 'signup')
    )
      this.setState({
        input: initialState.input,
        landingMessageCode: null,
        route,
      });
    else if (route !== this.state.route) this.setState({ route });
  };

  render() {
    const {
      route,
      message,
      tooltip,
      mousePosition,
      landingMessageCode,
      input,
      isEditing,
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
        ? formatBudget(this.getNewBudget(), formatterUnitedStatesDollar)
        : formatBudget(
            user.budgets[user.currentBudgetIndex],
            formatterUnitedStatesDollar
          );
    const formattedEntries = formatEntries(
      user.budgets[user.currentBudgetIndex]?.entries,
      formatterUnitedStatesDollar
    );

    const {
      addEntry,
      projectedMonthlyIncome,
      actualMonthlyIncome,
      ...landingInput
    } = input;

    return (
      <>
        <CustomScrollbars classlist="bg--light hover-opacity br-pill o-90">
          <BackgroundWrapper background={background}>
            <div className="App clr-light ff-primary fs-body">
              <Nav
                handleRouteChange={this.handleRouteChange}
                loggedIn={isLoggedIn}
                isGuest={isGuest}
                route={route}
                handleUserToggledExpandNav={this.handleUserToggledExpandNav}
                toggledExpandNav={toggledExpandNav}
              />
              {route === 'signin' || route === 'signup' ? (
                <Landing
                  handleRouteChange={this.handleRouteChange}
                  route={route}
                  useDarkLanding={background.useDarkLanding}
                  handleDisplayNameInputChange={
                    this.handleDisplayNameInputChange
                  }
                  handleUsernameInputChange={this.handleUsernameInputChange}
                  handlePasswordInputChange={this.handlePasswordInputChange}
                  handleKeyDown={this.handleKeyDown}
                  handleUserSignUp={this.handleUserSignUp}
                  handleUserSignIn={this.handleUserSignIn}
                  landingMessageCode={landingMessageCode}
                  input={landingInput}
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
                  handleUpdateBudgetName={this.handleUpdateBudgetName}
                  handleUpdateProjectedMonthlyIncome={
                    this.handleUpdateProjectedMonthlyIncome
                  }
                  handleUpdateActualMonthlyIncome={
                    this.handleUpdateActualMonthlyIncome
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
                  handleUpdateCategory={this.handleUpdateCategory}
                  handleUpdateProjectedCost={this.handleUpdateProjectedCost}
                  handleUpdateActualCost={this.handleUpdateActualCost}
                  handleUserClickedDeleteBudget={
                    this.handleUserClickedDeleteBudget
                  }
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
                  inputDisplayName={input.displayName.value}
                  handleDisplayNameInputChange={
                    this.handleDisplayNameInputChange
                  }
                  handleChangeDisplayName={this.handleChangeDisplayName}
                  handleKeyDown={this.handleKeyDown}
                  handleBackgroundChange={this.handleBackgroundChange}
                  backgrounds={backgrounds}
                  currentBackground={background}
                  maxBudgets={maxBudgets}
                  savedBudgets={user.budgets.filter(
                    (budget) => budget.lastSaved
                  )}
                  toggledExpandNav={toggledExpandNav}
                />
              ) : route === 'about' ? (
                <About toggledExpandNav={toggledExpandNav} />
              ) : null}
              {route === 'signup' || route === 'signin' ? null : (
                <CSSTransition
                  in={message.show}
                  classNames={{
                    enter: 'message-enter',
                    enterActive: 'message-enter-active',
                    exit: 'message-exit',
                    exitActive: 'message-exit-active',
                  }}
                  timeout={500}
                  unmountOnExit
                  onExited={() => {
                    const message = { ...this.state.message, code: null };
                    this.setState({ message });
                  }}
                >
                  <Message
                    code={message.code}
                    user={user}
                    formattedBudget={formattedBudget}
                    isGuest={isGuest}
                  />
                </CSSTransition>
              )}

              <CSSTransition
                in={tooltip.show}
                classNames="tooltip"
                timeout={1000}
                unmountOnExit
                onExited={() => {
                  const tooltip = {
                    ...this.state.tooltip,
                    code: null,
                    showToLeft: null,
                    custom: null,
                  };
                  const mousePosition = {
                    ...this.state.mousePosition,
                    x: null,
                    y: null,
                  };
                  this.setState({ tooltip, mousePosition });
                }}
              >
                <Tooltip tooltip={tooltip} mousePosition={mousePosition} />
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
