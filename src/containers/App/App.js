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

const allFormatArgs = [
  { locale: 'es-AR', currency: 'ARS' },
  { locale: 'en-AU', currency: 'AUD' },
  { locale: [], currency: 'BOB' },
  { locale: 'pt-BR', currency: 'BRL' },
  { locale: 'en-CA', currency: 'CAD' },
  { locale: [], currency: 'CHF' },
  { locale: 'es-CL', currency: 'CLP' },
  { locale: 'zh-CN', currency: 'CNY' },
  { locale: 'es-CO', currency: 'COP' },
  { locale: [], currency: 'EUR' },
  { locale: 'en-GB', currency: 'GBP' },
  { locale: 'zh-HK', currency: 'HKD' },
  { locale: 'jp-JP', currency: 'JPY' },
  { locale: 'es-MX', currency: 'MXN' },
  { locale: 'en-NZ', currency: 'NZD' },
  { locale: [], currency: 'PEN' },
  { locale: 'en-US', currency: 'USD' },
  { locale: [], currency: 'VES' },
];

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
  background: backgrounds[0],
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
  loading: false,
  user: {
    id: null,
    username: null,
    displayName: 'Guest',
    joinDate: null,
    currentBudgetIndex: 0,
    formatArgs: allFormatArgs[16], // ['en-US', 'USD']
    budgetsCreated: 0,
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.state.user.budgets = [this.getNewBudget()];
    this.state.user.budgetsCreated++;
  }

  /* Set background from localStorage if it exists there,
  otherwise set background randomly. */
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

  /* Only filter through backgrounds if selected background is different
  from current background. */
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

  /* Create entry object.
  If input entry category is empty, set to 'No category set'. */
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

  // Change delete button to confirm delete button.
  handleClickedDeleteBudget = (userClicked) => {
    this.setState({ clickedDeleteBudget: userClicked ? true : false });
  };

  handleDeleteBudget = (id) => {
    if (this.state.isGuest) {
      const filteredBudgets = this.state.user.budgets.filter(
        (budget) => budget.id !== id
      );

      const user = Object.assign(cloneDeep(this.state.user), {
        budgets: filteredBudgets,
        currentBudgetIndex: this.state.user.currentBudgetIndex
          ? this.state.user.currentBudgetIndex - 1
          : 0,
      });
      this.setState({
        user,
        route: 'saved-budgets',
        clickedDeleteBudget: false,
      });
      this.setMessage('Budget deleted.');
      this.clearMessage();
    } else this.deleteBudget(id);
  };

  deleteBudget = (id) =>
    fetch('https://csbudget-api.herokuapp.com/budget', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        app_user_id: this.state.user.id,
        id,
        current_budget_index: this.state.user.currentBudgetIndex
          ? this.state.user.currentBudgetIndex - 1
          : 0,
      }),
    })
      .then((response) =>
        response.status === 400 ? Promise.reject(Error()) : response.json()
      )
      .then((data) => {
        const filteredBudgets = this.state.user.budgets.filter(
          (budget) => budget.id !== data.id
        );

        this.setState({
          user: {
            ...this.state.user,
            budgets: filteredBudgets,
            currentBudgetIndex: this.state.user.currentBudgetIndex
              ? this.state.user.currentBudgetIndex - 1
              : 0,
          },
          route: 'saved-budgets',
          clickedDeleteBudget: false,
        });
        this.setMessage('Budget deleted.');
        this.clearMessage();
      })
      .catch((error) => {
        this.setMessage(
          'There was a problem deleting your budget. Please try again later.'
        );
        this.clearMessage(6000);
      });

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
    lastSaved: budget.last_saved ? new Date(budget.last_saved) : null,
    projectedMonthlyIncome: Number(budget.projected_monthly_income),
    actualMonthlyIncome: Number(budget.actual_monthly_income),
    ...budgetMethods,
    entriesCreated: Number(budget.entries_created),
    entries: budget.entries.map((entry) => ({ ...entry, ...entryMethods })),
  });

  /* Sets currentBudgetIndex to the selected budget's index
  and route to 'budget'. */
  handleViewBudget = (index) => {
    this.setState({
      user: { ...this.state.user, currentBudgetIndex: index },
      route: 'budget',
    });
    if (!this.state.isGuest) this.updateCurrentBudgetIndex(index);
  };

  // Update user's current budget index.
  updateCurrentBudgetIndex = (index) =>
    fetch('https://csbudget-api.herokuapp.com/current-budget-index', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.user.id,
        current_budget_index: index,
      }),
    });

  handleCreateBudget = () => {
    // Check max budget constraint.
    if (this.state.user.budgets.length === this.state.maxBudgets) {
      this.setMessage(
        "Maximum number of budgets created. That's a lot of budgets!"
      );
      this.clearMessage(6000);
      return;
    }

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
        this.setMessage('Budget created.');
        this.clearMessage();
      }

      // Return resolved promise to make function thenable.
      return Promise.resolve();
    } else return this.createBudget();
  };

  loadBudget = (data) =>
    this.setState({
      user: {
        ...this.state.user,
        budgets: [...this.state.user.budgets, this.getBudgetFromData(data)],
      },
    });

  loadBudgetCopy = (data) =>
    this.setState({
      user: {
        ...this.state.user,
        currentBudgetIndex: this.state.user.budgets.length,
        budgets: [...this.state.user.budgets, this.getBudgetFromData(data)],
      },
    });

  loadBudgets = (data) =>
    this.setState({
      user: {
        ...this.state.user,
        budgets: data.map((budget) => this.getBudgetFromData(budget)),
      },
    });

  createBudget = () =>
    fetch('https://csbudget-api.herokuapp.com/budget', {
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
          this.setMessage('Budget created.');
          this.clearMessage();
        }
      })
      .catch((error) => {
        this.setMessage(
          'There was a problem creating your budget. Please try again later.'
        );
        this.clearMessage(6000);
      });

  /**
   *
   * @param {string} name The budget name that is being copied.
   * @returns {string} The budget copy name.
   * Ex. 'August 2021 (2)' if there are no copies of 'August 2021' or
   * 'August 2021 (5)' if the newest copy is 'August 2021 (4)'.
   */
  getBudgetCopyName = (name) => {
    const regex = /\(\d+\)$/;
    /*
    \( matches the character '('.
    \d matches a digit (equivalent to [0-9])
    + matches the previous token (a digit) between one and unlimited times.
    \) matches the character ')'.
    $ asserts position at the end of the string.
    */
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

    const copyNameSuffix = ` (${
      copyNumberArray[0] ? copyNumberArray[0] + 1 : 2
    })`;
    const copyName = name + copyNameSuffix;

    // Return shortened copy name if it is too long.
    return copyName.length <= this.state.input.budgetName.maxLength
      ? copyName
      : name
          .substr(
            0,
            this.state.input.budgetName.maxLength -
              copyNameSuffix.length -
              '...'.length
          )
          .concat('...') + copyNameSuffix;
  };

  handleCreateBudgetCopy = (budget) => {
    if (this.state.user.budgets.length === this.state.maxBudgets) {
      this.setMessage(
        "Maximum number of budgets created. That's a lot of budgets!"
      );
      this.clearMessage(6000);
      return;
    }

    if (this.state.isGuest) {
      const budgetCopy = {
        ...cloneDeep(budget),
        id: this.state.user.budgetsCreated,
        name: this.getBudgetCopyName(budget.name),
        lastSaved: null,
      };

      const user = cloneDeep(this.state.user);
      user.budgets.splice(
        this.state.user.currentBudgetIndex + 1,
        0,
        budgetCopy
      );
      user.currentBudgetIndex++;
      user.budgetsCreated++;
      this.setState({ user });

      if (this.state.user.budgets.length === 4) {
        this.setMessage(
          `${user.budgets.length} budgets! You're a savvy financial planner.`
        );
        this.clearMessage(5000);
        return;
      }
      this.setMessage('Budget copy created.');
      this.clearMessage();
    } else this.createBudgetCopy(budget);
  };

  createBudgetCopy = (budget) =>
    fetch('https://csbudget-api.herokuapp.com/budget-copy', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        app_user_id: this.state.user.id,
        name: this.getBudgetCopyName(budget.name),
        projected_monthly_income: budget.projectedMonthlyIncome,
        actual_monthly_income: budget.actualMonthlyIncome,
        entries_created: budget.entriesCreated,
        entries: budget.entries,
      }),
    })
      .then((response) =>
        response.status === 400 ? Promise.reject(Error()) : response.json()
      )
      .then((data) => {
        this.loadBudgetCopy(data);

        if (this.state.user.budgets.length === 5) {
          this.setMessage(
            `${this.state.user.budgets.length} budgets! You're a savvy financial planner.`
          );
          this.clearMessage(5000);
        } else {
          this.setMessage('Budget copy created.');
          this.clearMessage();
        }
      })
      .catch((error) => {
        this.setMessage(
          'There was a problem creating your budget copy. Please try again later.'
        );
        this.clearMessage(6000);
      });

  handleSaveBudgets = () => {
    if (this.state.isGuest) {
      this.setMessage('Sign in to save your budgets.');
      this.clearMessage();
    } else if (!this.state.user.budgets.length) {
      this.setMessage('No budgets to save.');
      this.clearMessage();
    } else this.saveBudgets();
  };

  saveBudgets = () =>
    fetch('https://csbudget-api.herokuapp.com/budgets', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        app_user_id: this.state.user.id,
        budgets: this.state.user.budgets,
      }),
    })
      .then((response) =>
        response.status === 400 ? Promise.reject(Error()) : response.json()
      )
      .then((data) => {
        this.loadBudgets(data);

        this.setMessage(
          data.length === 1
            ? 'Saved 1 budget.'
            : `Saved ${data.length} budgets.`
        );
        this.clearMessage();
      })
      .catch((error) => {
        this.setMessage(
          'There was a problem saving your budgets. Please try again later.'
        );
        this.clearMessage(6000);
      });

  handleSaveBudget = (budget) => {
    if (this.state.isGuest) {
      this.setMessage('Sign in to save your budgets.');
      this.clearMessage();
    } else this.saveBudget(budget);
  };

  saveBudget = (budget) =>
    fetch('https://csbudget-api.herokuapp.com/budget', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        app_user_id: this.state.user.id,
        id: budget.id,
        name: budget.name,
        projected_monthly_income: budget.projectedMonthlyIncome,
        actual_monthly_income: budget.actualMonthlyIncome,
        entries_created: budget.entriesCreated,
        entries: budget.entries,
      }),
    })
      .then((response) =>
        response.status === 400 ? Promise.reject(Error()) : response.json()
      )
      .then((data) => {
        const user = cloneDeep(this.state.user);
        user.budgets = user.budgets.map((budget) =>
          budget.id === data.id
            ? { ...budget, lastSaved: new Date(data.last_saved) }
            : budget
        );
        this.setState({ user });
        this.setMessage('Budget saved.');
        this.clearMessage();
      })
      .catch((error) => {
        this.setMessage(
          'There was a problem saving your budget. Please try again later.'
        );
        this.clearMessage(6000);
      });

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
      this.setMessage('Budget name updated.');
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
        `Projected monthly income updated to ${new Intl.NumberFormat(
          user.formatArgs.locale,
          {
            style: 'currency',
            currency: user.formatArgs.currency,
          }
        ).format(income)}.`
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
        `Actual monthly income updated to ${new Intl.NumberFormat(
          user.formatArgs.locale,
          {
            style: 'currency',
            currency: user.formatArgs.currency,
          }
        ).format(income)}.`
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

  handleCurrencyChange = (event) => {
    const formatArgs = allFormatArgs.filter(
      (args) => args.currency === event.target.value
    )[0];
    if (formatArgs.currency !== this.state.user.formatArgs.currency) {
      if (this.state.isGuest) {
        this.setState({
          user: {
            ...this.state.user,
            formatArgs,
          },
        });
        this.setMessage('Currency changed successfully.');
        this.clearMessage();
      } else this.changeCurrency(formatArgs);
    }
  };

  changeCurrency = (formatArgs) =>
    fetch('https://csbudget-api.herokuapp.com/currency', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.user.id,
        format_args: formatArgs,
      }),
    })
      .then((response) =>
        response.status === 400 ? Promise.reject(Error()) : response.json()
      )
      .then((data) => {
        this.setState({
          user: {
            ...this.state.user,
            formatArgs: data.format_args,
          },
        });
        this.setMessage('Currency changed successfully.');
        this.clearMessage();
      })
      .catch((error) => {
        this.setMessage(
          'There was a problem changing your currency. Please try again later.'
        );
        this.clearMessage(6000);
      });

  // Update state displayName input with user input.
  handleDisplayNameInputChange = (event) =>
    this.setState({
      input: {
        ...this.state.input,
        displayName: {
          ...this.state.input.displayName,
          value: event.target.value,
          empty: false,
        },
      },
    });

  /* Change display name if input is not empty or whitespace and
  different from current display name. */
  handleDisplayNameChange = () => {
    if (
      this.state.input.displayName.value.trim() &&
      this.state.input.displayName.value !== this.state.user.displayName
    ) {
      if (this.state.isGuest) {
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
      } else this.changeDisplayName();
    }
  };

  changeDisplayName = () =>
    fetch('https://csbudget-api.herokuapp.com/display-name', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.user.id,
        display_name: this.state.input.displayName.value,
      }),
    })
      .then((response) =>
        response.status === 400 ? Promise.reject(Error()) : response.json()
      )
      .then((data) => {
        const { display_name: displayName } = data;
        if (displayName.trim() && displayName !== this.state.user.displayName) {
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
      })
      .catch((error) => {
        this.setMessage(
          'There was a problem changing your display name. Please try again later.'
        );
        this.clearMessage(6000);
      });

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
    // Current password and new password empty.
    if (!this.state.input.newPassword.value && !this.state.input.password.value)
      this.setState({
        input: {
          ...this.state.input,
          password: {
            ...this.state.input.password,
            empty: false,
          },
          newPassword: {
            ...this.state.input.newPassword,
            empty: false,
          },
        },
        windowMessage: null,
      });
    // New password entered but current password empty.
    else if (
      this.state.input.newPassword.value &&
      !this.state.input.password.value
    )
      this.setState({
        input: {
          ...this.state.input,
          password: { ...this.state.input.password, empty: true },
        },
        windowMessage: 'Please enter current password.',
      });
    // Current password entered but new password empty.
    else if (
      this.state.input.password.value &&
      !this.state.input.newPassword.value
    )
      this.setState({
        input: {
          ...this.state.input,
          newPassword: { ...this.state.input.newPassword, empty: true },
        },
        windowMessage: 'Please enter new password.',
      });
    else if (
      this.state.input.newPassword.value.length <
        this.state.input.newPassword.minLength ||
      this.state.input.newPassword.value.length >
        this.state.input.newPassword.maxLength
    )
      this.setState({
        input: {
          ...this.state.input,
          newPassword: { ...this.state.input.newPassword, empty: true },
        },
        windowMessage: `Password should be between ${this.state.input.newPassword.minLength} and ${this.state.input.newPassword.maxLength} characters.`,
      });
    else if (
      this.state.input.password.value.length <
        this.state.input.password.minLength ||
      this.state.input.password.value.length >
        this.state.input.password.maxLength
    )
      this.setState({
        input: {
          ...this.state.input,
          password: {
            ...this.state.input.password,
            empty: true,
          },
        },
        windowMessage: 'Current password invalid.',
      });
    else if (
      this.state.input.password.value === this.state.input.newPassword.value
    )
      this.setState({
        input: {
          ...this.state.input,
          password: {
            ...this.state.input.password,
            empty: true,
          },
          newPassword: {
            ...this.state.input.newPassword,
            empty: true,
          },
        },
        windowMessage: 'New password must be different from current password.',
      });
    else this.changePassword();
  };

  changePassword = () =>
    fetch('https://csbudget-api.herokuapp.com/password', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.user.id,
        password: this.state.input.password.value,
        new_password: this.state.input.newPassword.value,
      }),
    })
      .then((response) =>
        response.status === 401
          ? Promise.reject(Error('Unauthorized'))
          : response.status === 400
          ? Promise.reject(Error())
          : response
      )
      .then(() => {
        const input = cloneDeep(this.state.input);
        input.password = { ...initialState.input.password };
        input.newPassword = { ...initialState.input.newPassword };
        this.setState({ input, windowMessage: null });
        this.setMessage('Password changed successfully.');
        this.clearMessage(6000);
      })
      .catch((error) => {
        if (error.message === 'Unauthorized') {
          const password = {
            ...this.state.input.password,
            empty: true,
          };
          const input = { ...this.state.input, password };
          this.setState({ input, windowMessage: 'Current password invalid.' });
        } else {
          this.setMessage(
            'There was a problem changing your password. Please try again later.'
          );
          this.clearMessage(6000);
        }
      });

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
    } else {
      this.setState({ windowMessage: null, loading: true });
      this.signUp();
    }
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
    else {
      this.setState({ windowMessage: null, loading: true });
      this.signIn();
    }
  };

  loadUser = (data) =>
    this.setState({
      user: {
        id: data.id,
        username: data.username,
        displayName: data.display_name,
        joinDate: new Date(data.join_date),
        currentBudgetIndex: data.current_budget_index,
        formatArgs: data.format_args,
        budgets: data.budgets.map((budget) => this.getBudgetFromData(budget)),
      },
      route: data.budgets.length ? 'budget' : 'saved-budgets',
      input: initialState.input,
      windowMessage: null,
      isLoggedIn: true,
      isGuest: false,
    });

  signUp = () =>
    fetch('https://csbudget-api.herokuapp.com/sign-up', {
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
        this.setMessage(`Welcome, ${data.display_name}.`);
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
      })
      .finally(() => this.setState({ loading: false }));

  signIn = () =>
    fetch('https://csbudget-api.herokuapp.com/sign-in', {
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
        this.setMessage(`Welcome back, ${data.display_name}.`);
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
      })
      .finally(() => this.setState({ loading: false }));

  /**
   *
   * @param {requestCallback} callback The function to be called upon
   * key code press.
   * @param {number} code JavaScript event code.
   * Defaults to 'Enter'.
   */
  handleEnterKey = (callback) => (event) => {
    if (event.target.value !== '' && event.code === 'Enter') callback();
  };

  handleToggledExpandNav = () => {
    this.setState({
      toggledExpandNav: this.state.toggledExpandNav ? false : true,
    });
  };

  handleRouteChange = (route) => {
    /*
    Automatically create a budget if user routes to 'budget' with 0 budgets.
    Only route to 'budget' if budget successfully loads or is created
    (handleCreateBudget returns a fetch request if user is not a guest or a
    resolved promise otherwise to make the function thenable).
    */
    if (route === 'budget' && !this.state.user.budgets.length)
      this.handleCreateBudget().then(() =>
        this.state.user.budgets.length ? this.setState({ route }) : null
      );
    // Handle guest sign in.
    else if (
      route !== this.state.route &&
      route !== 'sign-up' &&
      route !== 'sign-in' &&
      !this.state.isLoggedIn &&
      this.state.isGuest
    ) {
      this.setState({
        route,
        input: initialState.input,
        windowMessage: null,
        isLoggedIn: true,
        user: {
          ...this.state.user,
          joinDate: new Date(),
        },
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
      route === 'sign-up' &&
      this.state.isLoggedIn &&
      this.state.isGuest
    )
      this.setState({
        ...initialState,
        background: this.state.background,
      });
    // Handle user sign out.
    else if (
      route !== this.state.route &&
      route === 'sign-in' &&
      this.state.isLoggedIn &&
      !this.state.isGuest
    )
      this.setState({
        ...initialState,
        route: 'sign-in',
        background: this.state.background,
      });
    /* Reset input and message code when routing between
    SignIn and SignUp components. */ else if (
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
      background,
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
      loading,
      user,
    } = this.state;

    /* Intl.NumberFormat object is a constructor that enables language sensitive
    number formatting. Takes parameters ([locales[, options]]). */
    const currencyFormatter = new Intl.NumberFormat(user.formatArgs.locale, {
      style: 'currency',
      currency: user.formatArgs.currency,
    });

    const formattedBudget =
      user.budgets.length === 0
        ? formatBudget(this.getNewBudget(), currencyFormatter)
        : formatBudget(
            user.budgets[user.currentBudgetIndex],
            currencyFormatter
          );
    const formattedEntries = formatEntries(
      user.budgets[user.currentBudgetIndex]?.entries,
      currencyFormatter
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
                  handleEnterKey={this.handleEnterKey}
                  handleSignUp={this.handleSignUp}
                  handleSignIn={this.handleSignIn}
                  windowMessage={windowMessage}
                  input={landingInput}
                  getPasswordInputStyle={getPasswordInputStyle}
                  loading={loading}
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
                  handleEnterKey={this.handleEnterKey}
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
                  handleEnterKey={this.handleEnterKey}
                  toggledExpandNav={toggledExpandNav}
                />
              ) : route === 'profile' ? (
                <Profile
                  user={user}
                  input={input}
                  windowMessage={windowMessage}
                  isGuest={isGuest}
                  toggledExpandNav={toggledExpandNav}
                  allFormatArgs={allFormatArgs}
                  handleCurrencyChange={this.handleCurrencyChange}
                  handleDisplayNameInputChange={
                    this.handleDisplayNameInputChange
                  }
                  handleDisplayNameChange={this.handleDisplayNameChange}
                  handlePasswordInputChange={this.handlePasswordInputChange}
                  handleNewPasswordInputChange={
                    this.handleNewPasswordInputChange
                  }
                  handlePasswordChange={this.handlePasswordChange}
                  handleEnterKey={this.handleEnterKey}
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
