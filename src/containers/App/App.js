import React, { Component } from 'react';

import Nav from '../../components/Nav/Nav';
import Landing from '../../components/Landing/Landing';
import SavedBudgets from '../../components/SavedBudgets/SavedBudgets';
import About from '../../components/About/About';
import Profile from '../../components/Profile/Profile';
import Budget from '../../components/Budget/Budget';
import CustomScrollbars from '../../components/CustomScrollbars/CustomScrollbars';
import Message from '../../components/Message/Message';
import PreloadedBackgrounds from '../../components/PreloadedBackgrounds/PreloadedBackgrounds';

import cloneDeep from 'lodash/cloneDeep';
import { nanoid } from 'nanoid';

import pathBg1 from '../../images/bg1.webp';
import pathBg2 from '../../images/bg2.webp';
import pathBg3 from '../../images/bg3.webp';
import pathBg4 from '../../images/bg4.webp';
import pathBg5 from '../../images/bg5.webp';
import pathBg6 from '../../images/bg6.webp';
import pathBg7 from '../../images/bg7.webp';
import pathBg8 from '../../images/bg8.webp';
import pathBg9 from '../../images/bg9.webp';
import pathBg10 from '../../images/bg10.webp';

import './App.scss';

// VALID ROUTES
// 'signin', 'signup', 'budget', 'saved-budgets', 'profile', 'about'

// Set initial state to be passed into App state.
const initialState = {
  route: 'signup',
  messageCode: null,
  input: {
    category: '',
    displayName: '',
    projectedMonthlyIncome: '',
    actualMonthlyIncome: '',
  },
  user: {
    id: null,
    isLoggedIn: false,
    isGuest: true,
    displayName: 'Guest',
    username: null,
    joined: new Date(),
    maxBudgets: 100,
    currentBudgetIndex: 0,
    clickedDeleteBudget: false,
    budgets: [
      {
        id: nanoid(),
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
        entries: [],
      },
    ],
  },
};

const backgrounds = [
  {
    name: 'ALPINE MOUNTAINS',
    path: pathBg1,
    useDarkLanding: false,
    initial: true,
  },
  {
    name: 'YOSEMITE VALLEY',
    path: pathBg2,
    useDarkLanding: true,
    initial: true,
  },
  { name: 'BANFF', path: pathBg3, useDarkLanding: false, initial: false },
  { name: 'MACHU PICCHU', path: pathBg4, useDarkLanding: true, initial: true },
  { name: 'LAKESIDE', path: pathBg5, useDarkLanding: true, initial: false },
  { name: 'WHISTLER', path: pathBg6, useDarkLanding: false, initial: false },
  { name: 'MITTENWALD', path: pathBg7, useDarkLanding: false, initial: true },
  { name: 'GRAND CANYON', path: pathBg8, useDarkLanding: true, initial: true },
  { name: 'TRAIL', path: pathBg9, useDarkLanding: true, initial: false },
  { name: 'SILHOUETTE', path: pathBg10, useDarkLanding: false, initial: true },
];

// Intl.NumberFormat object is a constructor that enables language sensitive
// number formatting.
// Takes parameters ([locales[, options]]).
const formatterUnitedStatesDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.state.background = backgrounds[0];
  }

  componentDidMount() {
    this.setBackgroundFromLocalStorage();
  }

  /**
   *
   * @param {number} milliseconds Number of milliseconds to clear message after.
   */
  clearMessageCode = (milliseconds = 3000) => {
    if (this.messageCodeTimeout) clearTimeout(this.messageCodeTimeout);

    this.messageCodeTimeout = setTimeout(() => {
      this.setState({ messageCode: null });
    }, milliseconds);
  };

  // Sets background from localStorage if it exists there,
  // otherwise set a random background.
  setBackgroundFromLocalStorage() {
    const localStorageBackgroundName = localStorage.getItem('background');
    if (localStorageBackgroundName) {
      const background = backgrounds.filter(
        (background) => background.name === localStorageBackgroundName
      );
      const stateCopy = { ...this.state };
      stateCopy.background = background[0];
      this.setState(stateCopy);
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

    const background = backgrounds.filter(
      (background) => background.name === randomBackgroundName
    );
    const stateCopy = { ...this.state };
    stateCopy.background = background[0];
    this.setState(stateCopy);
  }

  handleRouteChange = (route) => {
    // Create a budget if user routes to Budget with no saved-budgets.
    if (route === 'budget' && this.state.user.budgets.length === 0) {
      this.handleAddBudget();
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
      const userCopy = { ...this.state.user };
      userCopy.isLoggedIn = true;
      this.setState({ user: userCopy, route, messageCode: 'user-logged-in' });
      this.clearMessageCode(12000);
    }
    // Handle guest sign in (don't set background in localStorage).
    else if (
      route !== this.state.route &&
      route !== 'signup' &&
      route !== 'signin' &&
      !this.state.user.isLoggedIn &&
      this.state.user.isGuest
    ) {
      const userCopy = { ...this.state.user };
      userCopy.isLoggedIn = true;
      this.setState({ user: userCopy, route, messageCode: 'user-logged-in' });
      this.clearMessageCode(12000);
    }
    // Handle user/guest sign out.
    else if (
      route !== this.state.route &&
      (route === 'signup' || route === 'signin') &&
      this.state.user.isLoggedIn
    )
      this.setState({
        route,
        messageCode: null,
        input: initialState.input,
        user: initialState.user,
      });
    else if (route !== this.state.route) {
      this.setState({ route });
    }
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
      setTimeout(() => {
        if (this.state.messageCode !== 'background-changed') {
          this.setState({ messageCode: 'background-changed' });
          this.clearMessageCode(4000);
        }
      }, 3000);
    } else if (localStorage.getItem('background') !== event.target.textContent)
      localStorage.setItem('background', event.target.textContent);
  };

  // Update state displayName input with user input.
  handleDisplayNameInputChange = (event) => {
    const inputCopy = { ...this.state.input };
    inputCopy.displayName = event.target.value;
    this.setState({ input: inputCopy });
  };

  // Update display name if display name input is different from current
  // display name and display name input is not empty.
  handleDisplayNameChange = () => {
    if (
      this.state.user.displayName !== this.state.input.displayName &&
      this.state.input.displayName !== ''
    ) {
      const stateCopy = cloneDeep(this.state);
      stateCopy.user.displayName = this.state.input.displayName;
      stateCopy.input.displayName = '';
      stateCopy.messageCode = 'display-name-changed';
      this.setState(stateCopy);
      this.clearMessageCode();
    }
  };

  // Update state category input with user input.
  handleEntryCategoryInputChange = (event) => {
    const inputCopy = { ...this.state.input };
    inputCopy.category = event.target.value;
    this.setState({ input: inputCopy });
  };

  handleEntryCategoryInputKeyDown = (event) => {
    if (event.keyCode === 13 && event.target.value !== '') {
      this.handleAddEntry();
    }
  };

  // Create entry object.
  // If input category is empty, set category to 'No category set'.
  createEntry = () => {
    const category = this.state.input.category || 'No category set';

    return {
      id: nanoid(),
      category,
      projectedCost: 0,
      actualCost: 0,
      getDifference() {
        return this.projectedCost - this.actualCost;
      },
    };
  };

  // Event handler for add entry button.
  // Add entry, then reset the category input field.
  handleAddEntry = () => {
    const userCopy = cloneDeep(this.state.user);

    userCopy.budgets[this.state.user.currentBudgetIndex].entries.push(
      this.createEntry()
    );
    this.setState({ user: userCopy });

    const inputCopy = { ...this.state.input };
    inputCopy.category = '';
    this.setState({ input: inputCopy });
  };

  // Event handler for delete entry button.
  handleDeleteEntry = (index) => {
    const userCopy = cloneDeep(this.state.user);
    const entries =
      userCopy.budgets[this.state.user.currentBudgetIndex].entries;
    const filteredEntries = entries.filter((entry) => entry.id !== index);
    userCopy.budgets[this.state.user.currentBudgetIndex].entries =
      filteredEntries;
    this.setState({ user: userCopy });
  };

  // Event handler for initial delete button.
  // Changes delete button to confirm delete button.
  handleUserClickedDeleteBudget = (userClicked) => {
    const userCopy = cloneDeep(this.state.user);
    if (userClicked) {
      userCopy.clickedDeleteBudget = true;
      this.setState({ user: userCopy });
    } else {
      userCopy.clickedDeleteBudget = false;
      this.setState({ user: userCopy });
    }
  };

  // Event handler for confirm delete button.
  handleDeleteBudget = () => {
    const filteredBudgets = this.state.user.budgets.filter(
      (budget, i) => i !== this.state.user.currentBudgetIndex
    );

    const updatedUser = Object.assign(cloneDeep(this.state.user), {
      budgets: filteredBudgets,
      currentBudgetIndex:
        this.state.user.currentBudgetIndex >= 1
          ? this.state.user.currentBudgetIndex - 1
          : 0,
      clickedDeleteBudget: false,
    });

    this.setState({
      user: updatedUser,
      route: 'saved-budgets',
      messageCode: 'budget-deleted',
    });
    this.clearMessageCode();
  };

  // Create budget object. Budget name is set using the Date object.
  // Name depends on current date and current number of budgets.
  createBudget = () => {
    const date = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + this.state.user.budgets.length
    );

    return {
      id: nanoid(),
      name: `${date.toLocaleString('default', {
        month: 'long',
      })} ${date.getFullYear()}`,
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
      entries: [],
    };
  };

  // Event handler for view budget link.
  // Sets user.currentBudgetIndex to the selected budget's index
  // and route to 'budget'.
  handleViewBudget = (index) => {
    const stateCopy = cloneDeep(this.state);
    stateCopy.user.currentBudgetIndex = index;
    stateCopy.route = 'budget';
    this.setState(stateCopy);
  };

  handleAddBudget = () => {
    if (this.state.user.budgets.length === this.state.user.maxBudgets) {
      this.setState({ messageCode: 'budgets-max-allowed' });
      this.clearMessageCode(6000);
      return;
    }
    const stateCopy = cloneDeep(this.state);
    stateCopy.user.budgets.push(this.createBudget());
    this.setState(stateCopy);

    if (
      this.state.user.budgets.length >= 4 &&
      this.state.user.budgets.length <= 9
    ) {
      this.setState({ messageCode: 'budgets-created-many' });
      this.clearMessageCode(5000);
      return;
    }
    this.setState({ messageCode: 'budget-created' });
    this.clearMessageCode();
  };

  // Event handler for save budgets button.
  handleSaveBudgets = () => {
    this.setState({ messageCode: 'budgets-saved' });
    this.clearMessageCode();
  };

  // Update budget name if user input is not empty.
  handleFocusOutBudgetName = (text) => {
    const userCopy = cloneDeep(this.state.user);

    userCopy.budgets[this.state.user.currentBudgetIndex].name =
      text === ''
        ? userCopy.budgets[this.state.user.currentBudgetIndex].name
        : text;

    this.setState({ user: userCopy });
  };

  // Update entry category if input is not empty.
  handleFocusOutEntryCategory = (id) => (text) => {
    const userCopy = cloneDeep(this.state.user);
    const entries =
      userCopy.budgets[this.state.user.currentBudgetIndex].entries;

    const updatedEntries = entries.map((entry) => {
      if (entry.id === id) {
        entry.category = text || 'No category set';
        return entry;
      }
      return entry;
    });

    userCopy.budgets[this.state.user.currentBudgetIndex].entries =
      updatedEntries;

    this.setState({ user: userCopy });
  };

  handleFocusOutProjectedMonthlyIncome = (text) => {
    let filteredText = text;

    // Format text enclosed in parentheses as a negative number.
    // Ex '(100)' = '-100'.
    if (filteredText.startsWith('(') && filteredText.endsWith(')'))
      filteredText = filteredText.replace('(', '-').replace(')', '');

    // Remove commas. Ex '-10,000' = '10000'.
    filteredText = filteredText.replace(/,/g, '').replace(/\$/g, '');

    // If text isNaN, don't update state.
    if (isNaN(filteredText)) {
      this.setState({ messageCode: 'projected-monthly-income-invalid' });
      this.clearMessageCode(4000);
    }

    // If input is equal to current state, don't update state.
    else if (
      Math.round(filteredText * 100) / 100 ===
      this.state.user.budgets[this.state.user.currentBudgetIndex]
        .projectedMonthlyIncome
    )
      this.setState({ messageCode: null });
    // Update state.
    else {
      const stateCopy = cloneDeep(this.state);
      stateCopy.user.budgets[
        this.state.user.currentBudgetIndex
      ].projectedMonthlyIncome = Math.round(filteredText * 100) / 100;
      stateCopy.messageCode = 'projected-monthly-income-updated';
      this.setState(stateCopy);
      this.clearMessageCode();
    }
  };

  handleFocusOutActualMonthlyIncome = (text) => {
    let filteredText = text;

    if (filteredText.startsWith('(') && filteredText.endsWith(')'))
      filteredText = filteredText.replace('(', '-').replace(')', '');

    filteredText = filteredText.replace(/,/g, '').replace(/\$/g, '');

    if (isNaN(filteredText)) {
      this.setState({ messageCode: 'actual-monthly-income-invalid' });
      this.clearMessageCode(4000);
    } else if (
      Math.round(filteredText * 100) / 100 ===
      this.state.user.budgets[this.state.user.currentBudgetIndex]
        .actualMonthlyIncome
    )
      this.setState({ messageCode: null });
    else {
      const stateCopy = cloneDeep(this.state);
      stateCopy.user.budgets[
        this.state.user.currentBudgetIndex
      ].actualMonthlyIncome = Math.round(filteredText * 100) / 100;
      stateCopy.messageCode = 'actual-monthly-income-updated';
      this.setState(stateCopy);
      this.clearMessageCode(4000);
    }
  };

  handleFocusOutProjectedCost = (text, index) => {
    let filteredText = text;

    if (filteredText.startsWith('(') && filteredText.endsWith(')'))
      filteredText = filteredText.replace('(', '-').replace(')', '');

    filteredText = filteredText.replace(/,/g, '').replace(/\$/g, '');

    if (isNaN(filteredText)) {
      this.setState({ messageCode: 'projected-cost-invalid' });
      this.clearMessageCode(4000);
    } else if (
      Math.round(filteredText * 100) / 100 ===
      this.state.user.budgets[this.state.user.currentBudgetIndex].entries[index]
        .projectedCost
    )
      this.setState({ messageCode: null });
    else {
      const stateCopy = cloneDeep(this.state);
      stateCopy.user.budgets[this.state.user.currentBudgetIndex].entries[
        index
      ].projectedCost = Math.round(filteredText * 100) / 100;

      this.setState(stateCopy);
    }
  };

  handleFocusOutActualCost = (text, index) => {
    let filteredText = text;

    if (filteredText.startsWith('(') && filteredText.endsWith(')'))
      filteredText = filteredText.replace('(', '-').replace(')', '');

    filteredText = filteredText.replace(/,/g, '').replace(/\$/g, '');

    if (isNaN(filteredText)) {
      this.setState({ messageCode: 'actual-cost-invalid' });
      this.clearMessageCode(4000);
    } else if (
      Math.round(filteredText * 100) / 100 ===
      this.state.user.budgets[this.state.user.currentBudgetIndex].entries[index]
        .actualCost
    )
      this.setState({ messageCode: null });
    else {
      const stateCopy = cloneDeep(this.state);
      stateCopy.user.budgets[this.state.user.currentBudgetIndex].entries[
        index
      ].actualCost = Math.round(filteredText * 100) / 100;

      this.setState(stateCopy);
    }
  };

  render() {
    const { route, messageCode, input, background, user } = this.state;

    return (
      <>
        <CustomScrollbars
          classlist="bg--scrollbar-app br-pill o-90"
          heightmax="100vh"
        >
          <div
            className="background"
            style={{ backgroundImage: `url(${background.path})` }}
          >
            <div className="App clr-light ff-primary fs-body">
              <Nav
                handleRouteChange={this.handleRouteChange}
                loggedIn={user.isLoggedIn}
                isGuest={user.isGuest}
              />
              {route === 'signin' || route === 'signup' ? (
                <Landing
                  handleRouteChange={this.handleRouteChange}
                  route={route}
                  useDarkLanding={background.useDarkLanding}
                />
              ) : route === 'budget' ? (
                <>
                  <Budget
                    budget={user.budgets[user.currentBudgetIndex]}
                    handleFocusOutBudgetName={this.handleFocusOutBudgetName}
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
                    inputCategory={input.category}
                    handleEntryCategoryInputChange={
                      this.handleEntryCategoryInputChange
                    }
                    handleEntryCategoryInputKeyDown={
                      this.handleEntryCategoryInputKeyDown
                    }
                    handleAddEntry={this.handleAddEntry}
                    handleDeleteEntry={this.handleDeleteEntry}
                    handleFocusOutEntryCategory={
                      this.handleFocusOutEntryCategory
                    }
                    handleFocusOutProjectedCost={
                      this.handleFocusOutProjectedCost
                    }
                    handleFocusOutActualCost={this.handleFocusOutActualCost}
                    handleUserClickedDeleteBudget={
                      this.handleUserClickedDeleteBudget
                    }
                    clickedDeleteBudget={user.clickedDeleteBudget}
                    handleDeleteBudget={this.handleDeleteBudget}
                    formatter={formatterUnitedStatesDollar}
                  />
                </>
              ) : route === 'saved-budgets' ? (
                <SavedBudgets
                  user={user}
                  handleViewBudget={this.handleViewBudget}
                  handleAddBudget={this.handleAddBudget}
                  handleSaveBudgets={this.handleSaveBudgets}
                  currentBudgetIndex={user.currentBudgetIndex}
                />
              ) : route === 'profile' ? (
                <Profile
                  user={user}
                  inputDisplayName={input.displayName}
                  handleDisplayNameInputChange={
                    this.handleDisplayNameInputChange
                  }
                  handleDisplayNameChange={this.handleDisplayNameChange}
                  handleBackgroundChange={this.handleBackgroundChange}
                  backgrounds={backgrounds}
                  currentBackground={background}
                  maxBudgets={user.maxBudgets}
                />
              ) : route === 'about' ? (
                <About />
              ) : null}
              <Message
                messageCode={messageCode}
                user={user}
                formatter={formatterUnitedStatesDollar}
              />
            </div>
          </div>
        </CustomScrollbars>
        <PreloadedBackgrounds backgrounds={backgrounds} />
      </>
    );
  }
}

export default App;
