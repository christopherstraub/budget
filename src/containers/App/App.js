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

// Valid routes
// 'signin', 'signup', 'budget', 'saved-budgets', 'profile', 'about'

// Valid landing message codes:
// 'fields-empty', 'password-length-invalid', 'credentials-invalid'
// 'username-empty', 'password-empty'

// Set initial state to be passed into App state.
const initialState = {
  route: 'signup',
  message: { code: null, show: false },
  landingMessageCode: null,
  input: {
    displayName: { value: '', empty: false },
    username: { value: '', empty: false },
    password: { value: '', empty: false, minLength: 6, maxLength: 60 },
    entryCategory: '',
    projectedMonthlyIncome: '',
    actualMonthlyIncome: '',
  },
  isEditing: {
    budgetName: false,
  },
  user: {
    id: null,
    isLoggedIn: false,
    isGuest: true,
    displayName: 'Guest',
    username: null,
    joined: null,
    maxBudgets: 100,
    currentBudgetIndex: 0,
    clickedDeleteBudget: false,
    toggledExpandNav: false,
    budgetsCreated: 1,
    budgetsDeleted: 0,
    budgets: [
      {
        id: 0,
        name: `${new Date().toLocaleString('default', {
          month: 'long',
        })} ${new Date().getFullYear()}`,
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
          if (this.entries.length === 0) return 0;
          else {
            const projectedCosts = this.entries.map(
              (entry) => entry.projectedCost
            );
            return projectedCosts.reduce((acc, value) => acc + value);
          }
        },
        getActualCost() {
          if (this.entries.length === 0) return 0;
          else {
            const actualCosts = this.entries.map((entry) => entry.actualCost);
            return actualCosts.reduce((acc, value) => acc + value);
          }
        },
        getDifferenceCost() {
          return this.getProjectedCost() - this.getActualCost();
        },
      },
    ],
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
const formatCurrency = (budget, formatter) => {
  return {
    projectedMonthlyIncome: formatter.format(budget.projectedMonthlyIncome),
    actualMonthlyIncome: formatter.format(budget.actualMonthlyIncome),
    projectedBalance: formatter.format(budget.getProjectedBalance()),
    actualBalance: formatter.format(budget.getActualBalance()),
    differenceBalance: formatter.format(budget.getDifferenceBalance()),
    projectedCost: formatter.format(budget.getProjectedCost()),
    actualCost: formatter.format(budget.getActualCost()),
    differenceCost: formatter.format(budget.getDifferenceCost()),
  };
};

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
const formatBudget = (budget, formatter) => {
  return formatNegativeValues(formatCurrency(budget, formatter));
};

/**
 *
 * @param {Object} entries The entries to be formatted.
 * @param {Object} formatter The formatter instantiated with
 * the Intl.NumberFormat() constructor.
 * @returns {Object} Formatted entries.
 */
const formatEntries = (entries, formatter) => {
  if (!entries?.length) return [];
  return entries.map((entry) => {
    return {
      id: entry.id,
      category: entry.category,
      projectedCost: formatter.format(entry.projectedCost),
      actualCost: formatter.format(entry.actualCost),
      difference: formatter.format(entry.getDifference()),
    };
  });
};

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
    this.state.user.budgets[0].entries = defaultEntries;
    this.state.background = backgrounds[0];
  }

  componentDidMount() {
    this.setBackgroundFromLocalStorage();
  }

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

  setMessage = (code) => {
    const message = { ...this.state.message, code, show: true };
    this.setState({ message });
  };

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
  handleEntryCategoryInputChange = (event) => {
    const input = { ...this.state.input, entryCategory: event.target.value };
    this.setState({ input });
  };

  // Create entry object.
  // If input entry category is empty, set to 'No category set'.
  getNewEntry = () => {
    const category = this.state.input.entryCategory || 'No category set';

    return {
      id:
        this.state.user.budgets[this.state.user.currentBudgetIndex].entries[
          this.state.user.budgets[this.state.user.currentBudgetIndex].entries
            .length - 1
        ]?.id + 1 || 0,
      category,
      projectedCost: 0,
      actualCost: 0,
      getDifference() {
        return this.projectedCost - this.actualCost;
      },
    };
  };

  // Event handler for add entry button.
  // Add entry and reset entry category input.
  handleAddEntry = () => {
    const user = cloneDeep(this.state.user);
    user.budgets[user.currentBudgetIndex].entries.push(this.getNewEntry());
    const input = { ...this.state.input, entryCategory: '' };
    this.setState({ user, input });
  };

  // Event handler for delete entry button.
  handleDeleteEntry = (index) => {
    const user = cloneDeep(this.state.user);
    const entries = user.budgets[user.currentBudgetIndex].entries;
    const filteredEntries = entries.filter((entry) => entry.id !== index);
    user.budgets[user.currentBudgetIndex].entries = filteredEntries;
    this.setState({ user });
  };

  // Event handler for initial delete button.
  // Changes delete button to confirm delete button.
  handleUserClickedDeleteBudget = (userClicked) => {
    const user = { ...this.state.user };
    if (userClicked) {
      user.clickedDeleteBudget = true;
      this.setState({ user });
    } else {
      user.clickedDeleteBudget = false;
      this.setState({ user });
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
      clickedDeleteBudget: false,
      budgetsDeleted: this.state.user.budgetsDeleted + 1,
    });
    this.setState({
      user,
      route: 'saved-budgets',
    });
    this.setMessage('budget-deleted');
    this.clearMessage();
  };

  getNewBudgetName = () => {
    const budgetsNotCopies = this.state.user.budgets.filter(
      (budget) => !/\(\d+\)$/.test(budget.name)
    ).length;

    const date = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + budgetsNotCopies
    );

    return date.toLocaleDateString('default', {
      month: 'long',
      year: 'numeric',
    });
  };

  // Create budget object. Budget name is set using the Date object.
  // Name depends on current date and current number of budgets.
  getNewBudget = () => {
    return {
      id: this.state.user.budgetsCreated,
      name: this.getNewBudgetName(),
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
        if (this.entries.length === 0) return 0;
        else {
          const projectedCosts = this.entries.map(
            (entry) => entry.projectedCost
          );
          return projectedCosts.reduce((acc, value) => acc + value);
        }
      },
      getActualCost() {
        if (this.entries.length === 0) return 0;
        else {
          const actualCosts = this.entries.map((entry) => entry.actualCost);
          return actualCosts.reduce((acc, value) => acc + value);
        }
      },
      getDifferenceCost() {
        return this.getProjectedCost() - this.getActualCost();
      },
      entries: defaultEntries,
    };
  };

  // Event handler for view budget link.
  // Sets user.currentBudgetIndex to the selected budget's index
  // and route to 'budget'.
  handleViewBudget = (index) => {
    const user = { ...this.state.user, currentBudgetIndex: index };
    this.setState({ user, route: 'budget' });
  };

  handleCreateBudget = () => {
    if (this.state.user.budgets.length === this.state.user.maxBudgets) {
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
    const budgetCopy = cloneDeep(this.state.user.budgets[index]);
    budgetCopy.id = this.state.user.budgetsCreated;
    budgetCopy.name = this.getBudgetCopyName(budgetCopy.name);

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

  // Event handler for save budgets button.
  handleSaveBudgets = () => {
    this.setMessage('budgets-saved');
    this.clearMessage();
  };

  handleBudgetNameChange = (event) => {
    if (
      this.state.user.budgets[this.state.user.currentBudgetIndex].name !==
        event.target.value.trim() &&
      event.target.value.trim()
    ) {
      const user = cloneDeep(this.state.user);
      user.budgets[this.state.user.currentBudgetIndex].name =
        event.target.value.trim();
      const isEditing = { ...this.state.isEditing, budgetName: false };
      this.setState({ user, isEditing });
      this.setMessage('budget-name-changed');
      this.clearMessage();
    } else {
      const isEditing = { ...this.state.isEditing, budgetName: false };
      this.setState({ isEditing });
    }
  };

  editBudgetName = () => {
    const isEditing = { ...this.state.isEditing, budgetName: true };
    this.setState({ isEditing });
  };

  // Update entry category if input is not empty.
  handleFocusOutEntryCategory = (id) => (text) => {
    const user = cloneDeep(this.state.user);
    const entries = user.budgets[user.currentBudgetIndex].entries;

    const updatedEntries = entries.map((entry) => {
      if (entry.id === id) {
        entry.category = text || 'No category set';
        return entry;
      }
      return entry;
    });

    user.budgets[this.state.user.currentBudgetIndex].entries = updatedEntries;

    this.setState({ user });
  };

  handleBlurProjectedMonthlyIncome = (event) => {
    let income = event.target.value;

    if (income > 1e11) income = 1e11;

    if (
      Math.round(income * 100) / 100 ===
      this.state.user.budgets[this.state.user.currentBudgetIndex]
        .projectedMonthlyIncome
    ) {
      // If input is equal to current state, don't update state.
      this.clearMessage(0);
    }
    // Update state.
    else {
      const user = cloneDeep(this.state.user);
      user.budgets[user.currentBudgetIndex].projectedMonthlyIncome =
        Math.round(income * 100) / 100;

      this.setState({ user });
      this.setMessage('projected-monthly-income-updated');
      this.clearMessage(5000);
    }
  };

  handleFocusOutProjectedMonthlyIncome = (text) => {
    let filteredText = text;

    // Format text enclosed in parentheses as a negative number.
    // Ex '(100)' = '-100'.
    if (filteredText.startsWith('(') && filteredText.endsWith(')'))
      filteredText = filteredText.replace('(', '-').replace(')', '');

    // Remove commas. Ex '-10,000' = '10000'.
    filteredText = filteredText.replace(/,/g, '').replace(/\$/g, '');

    // If text is not a number, don't update state.
    if (isNaN(filteredText)) {
      this.setMessage('projected-monthly-income-invalid');
      this.clearMessage();
    }

    // If input is equal to current state, don't update state.
    else if (
      Math.round(filteredText * 100) / 100 ===
      this.state.user.budgets[this.state.user.currentBudgetIndex]
        .projectedMonthlyIncome
    ) {
      this.clearMessage(0);
    }
    // Update state.
    else {
      const user = cloneDeep(this.state.user);
      user.budgets[user.currentBudgetIndex].projectedMonthlyIncome =
        Math.round(filteredText * 100) / 100;
      this.setState({ user });
      this.setMessage('projected-monthly-income-updated');
      this.clearMessage(5000);
    }
  };

  handleFocusOutActualMonthlyIncome = (text) => {
    let filteredText = text;

    if (filteredText.startsWith('(') && filteredText.endsWith(')'))
      filteredText = filteredText.replace('(', '-').replace(')', '');

    filteredText = filteredText.replace(/,/g, '').replace(/\$/g, '');

    if (isNaN(filteredText)) {
      this.setMessage('actual-monthly-income-invalid');
      this.clearMessage();
    } else if (
      Math.round(filteredText * 100) / 100 ===
      this.state.user.budgets[this.state.user.currentBudgetIndex]
        .actualMonthlyIncome
    ) {
      this.clearMessage(0);
    } else {
      const user = cloneDeep(this.state.user);
      user.budgets[user.currentBudgetIndex].actualMonthlyIncome =
        Math.round(filteredText * 100) / 100;
      this.setState({ user });
      this.setMessage('actual-monthly-income-updated');
      this.clearMessage(5000);
    }
  };

  handleFocusOutProjectedCost = (text, index) => {
    let filteredText = text;

    if (filteredText.startsWith('(') && filteredText.endsWith(')'))
      filteredText = filteredText.replace('(', '-').replace(')', '');

    filteredText = filteredText.replace(/,/g, '').replace(/\$/g, '');

    if (isNaN(filteredText)) {
      this.setMessage('projected-cost-invalid');
      this.clearMessage();
    } else if (
      Math.round(filteredText * 100) / 100 ===
      this.state.user.budgets[this.state.user.currentBudgetIndex].entries[index]
        .projectedCost
    ) {
      this.clearMessage(0);
    } else {
      const user = cloneDeep(this.state.user);
      user.budgets[user.currentBudgetIndex].entries[index].projectedCost =
        Math.round(filteredText * 100) / 100;
      this.setState({ user });
      this.clearMessage(0);
    }
  };

  handleFocusOutActualCost = (text, index) => {
    let filteredText = text;

    if (filteredText.startsWith('(') && filteredText.endsWith(')'))
      filteredText = filteredText.replace('(', '-').replace(')', '');

    filteredText = filteredText.replace(/,/g, '').replace(/\$/g, '');

    if (isNaN(filteredText)) {
      this.setMessage('actual-cost-invalid');
      this.clearMessage();
    } else if (
      Math.round(filteredText * 100) / 100 ===
      this.state.user.budgets[this.state.user.currentBudgetIndex].entries[index]
        .actualCost
    ) {
      this.clearMessage(0);
    } else {
      const user = cloneDeep(this.state.user);
      user.budgets[user.currentBudgetIndex].entries[index].actualCost =
        Math.round(filteredText * 100) / 100;
      this.setState({ user });
      this.clearMessage(0);
    }
  };

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

  // Update display name if display name input is different from current
  // display name and display name input is not an empty string.
  handleDisplayNameChange = () => {
    if (
      this.state.user.displayName.value !==
        this.state.input.displayName.value &&
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
    const toggledExpandNav = this.state.user.toggledExpandNav ? false : true;
    const user = { ...this.state.user, toggledExpandNav };
    this.setState({ user });
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
      !this.state.user.isLoggedIn &&
      !this.state.user.isGuest
    ) {
      localStorage.setItem('background', this.state.background.name);

      const user = { ...this.state.user, isLoggedIn: true, joined: new Date() };
      this.setState({
        user,
        route,
        input: initialState.input,
        landingMessageCode: null,
      });
      this.setMessage('user-logged-in');
      this.clearMessage(6000);
    }
    // Handle guest sign in (don't set background in localStorage).
    else if (
      route !== this.state.route &&
      route !== 'signup' &&
      route !== 'signin' &&
      !this.state.user.isLoggedIn &&
      this.state.user.isGuest
    ) {
      const user = { ...this.state.user, isLoggedIn: true, joined: new Date() };
      this.setState({
        user,
        route,
        input: initialState.input,
        landingMessageCode: null,
      });
      this.setMessage('user-logged-in');
      this.clearMessage(6000);
    }
    // Handle user/guest sign out.
    else if (
      route !== this.state.route &&
      (route === 'signup' || route === 'signin') &&
      this.state.user.isLoggedIn
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
      landingMessageCode,
      input,
      isEditing,
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
      entryCategory,
      projectedMonthlyIncome,
      actualMonthlyIncome,
      ...landingInput
    } = input;

    return (
      <>
        <CustomScrollbars
          classlist="bg--scrollbar-app br-pill o-90"
          heightmax="100vh"
        >
          <BackgroundWrapper background={background}>
            <div className="App clr-light ff-primary fs-body">
              <Nav
                handleRouteChange={this.handleRouteChange}
                loggedIn={user.isLoggedIn}
                isGuest={user.isGuest}
                route={route}
                handleUserToggledExpandNav={this.handleUserToggledExpandNav}
                toggledExpandNav={user.toggledExpandNav}
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
                  currentBudgetIndex={user.currentBudgetIndex}
                  isEditingBudgetName={isEditing.budgetName}
                  editBudgetName={this.editBudgetName}
                  handleBudgetNameChange={this.handleBudgetNameChange}
                  handleFocusProjectedMonthlyIncome={
                    this.handleFocusProjectedMonthlyIncome
                  }
                  handleFocusActualMonthlyIncome={
                    this.handleFocusActualMonthlyIncome
                  }
                  handleFocusOutProjectedMonthlyIncome={
                    this.handleFocusOutProjectedMonthlyIncome
                  }
                  handleFocusOutActualMonthlyIncome={
                    this.handleFocusOutActualMonthlyIncome
                  }
                  inputEntryCategory={input.entryCategory}
                  handleEntryCategoryInputChange={
                    this.handleEntryCategoryInputChange
                  }
                  handleKeyDown={this.handleKeyDown}
                  handleAddEntry={this.handleAddEntry}
                  handleDeleteEntry={this.handleDeleteEntry}
                  handleFocusOutEntryCategory={this.handleFocusOutEntryCategory}
                  handleFocusOutProjectedCost={this.handleFocusOutProjectedCost}
                  handleFocusOutActualCost={this.handleFocusOutActualCost}
                  handleCreateBudgetCopy={this.handleCreateBudgetCopy}
                  handleUserClickedDeleteBudget={
                    this.handleUserClickedDeleteBudget
                  }
                  handleDeleteBudget={this.handleDeleteBudget}
                  clickedDeleteBudget={user.clickedDeleteBudget}
                  formattedBudget={formattedBudget}
                  formattedEntries={formattedEntries}
                  setMessage={this.setMessage}
                  clearMessage={this.clearMessage}
                />
              ) : route === 'saved-budgets' ? (
                <SavedBudgets
                  user={user}
                  handleViewBudget={this.handleViewBudget}
                  handleCreateBudget={this.handleCreateBudget}
                  handleSaveBudgets={this.handleSaveBudgets}
                  currentBudgetIndex={user.currentBudgetIndex}
                />
              ) : route === 'profile' ? (
                <Profile
                  user={user}
                  inputDisplayName={input.displayName.value}
                  handleDisplayNameInputChange={
                    this.handleDisplayNameInputChange
                  }
                  handleDisplayNameChange={this.handleDisplayNameChange}
                  handleKeyDown={this.handleKeyDown}
                  handleBackgroundChange={this.handleBackgroundChange}
                  backgrounds={backgrounds}
                  currentBackground={background}
                  maxBudgets={user.maxBudgets}
                />
              ) : route === 'about' ? (
                <About />
              ) : null}
              <CSSTransition
                in={message.show}
                classNames="message"
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
