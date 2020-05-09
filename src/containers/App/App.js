import React, { Component } from 'react';

import Header from '../../components/Header/Header';
import Landing from '../../components/Landing/Landing';
import Budgets from '../../components/Budgets/Budgets';
import About from '../../components/About/About';
import Profile from '../../components/Profile/Profile';
import Create from '../../components/Create/Create';

import cloneDeep from 'lodash/cloneDeep';

import Background1 from '../../images/bg1.jpg';
import Background2 from '../../images/bg2.jpg';
import Background3 from '../../images/bg3.jpg';
import Background4 from '../../images/bg4.jpg';

import './App.scss';

// VALID ROUTES
// 'signin', 'signup', 'create', 'budgets', 'profile', 'about'

// VALID MESSAGE CODES
// 'updated-projected-monthly-income', 'updated-actual-monthly-income',
// 'invalid-projected-monthly-income', 'invalid-actual-monthly-income',
// 'updated-projected-cost', 'updated-actual-cost',
// 'invalid-projected-cost', 'invalid-actual-cost',
// 'deleted-budget', 'created-budget', 'saved-budgets',
// 'changed-name', 'changed-background'

// Set initial state to be passed into App state upon application load.
const initialState = {
  route: 'create',
  messageCode: null,
  input: {
    category: '',
    name: '',
    projectedMonthlyIncome: '',
    actualMonthlyIncome: '',
  },
  backgrounds: [
    { name: 'ALPINE MOUNTAINS', url: Background1, useDarkMode: false },
    { name: 'MACHU PICCHU', url: Background2, useDarkMode: true },
    { name: 'YOSEMITE VALLEY', url: Background3, useDarkMode: true },
    { name: 'SPACE', url: Background4, useDarkMode: false },
  ],
  isLoggedIn: true,
  currentBudgetIndex: 0,
  userClickedDeleteBudget: false,
  user: {
    id: 1,
    name: 'Chris',
    email: 'chris@gmail.com',
    joined: null,
    background: {
      name: 'YOSEMITE VALLEY',
      url: Background3,
      useDarkMode: true,
    },
    budgets: [
      {
        id: Math.round(Math.random() * 1000), //temp assignment of id
        name: `${new Date(2020, 4, 4).toLocaleString('default', {
          month: 'long',
        })} ${new Date(2020, 4, 4).getFullYear()}`,
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

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  // If user routes to Create and they have no budgets, add a budget.
  // Else if user is routing to a non-selected route, change route.
  // If route does not equal 'signin' or 'signup', log user in.
  handleRouteChange = (route) => {
    if (route === 'create' && this.state.user.budgets.length === 0) {
      this.handleAddBudget();
      this.setState({ route: 'create' });
    } else if (this.state.route !== route)
      this.setState({ route, messageCode: null });

    // If we get user, log them in
    if (route !== 'signin' && route !== 'signup')
      this.setState({ isLoggedIn: true });
    else {
      this.setState({ isLoggedIn: false });
    }
  };

  // Only filter through backgrounds if selected background is different
  // from current background.
  handleBackgroundChange = (event) => {
    if (this.state.user.background.name !== event.target.textContent) {
      const selectedBackground = this.state.backgrounds.filter(
        (background) => background.name === event.target.textContent
      );

      const userCopy = { ...this.state.user };
      userCopy.background = selectedBackground[0];
      this.setState({ user: userCopy, messageCode: 'changed-background' });
    }
  };

  // Update state name input with user input.
  handleNameInputChange = (event) => {
    const inputCopy = { ...this.state.input };
    inputCopy.name = event.target.value;
    this.setState({ input: inputCopy });
  };

  // Update name if name input is different from current name
  // and name input is not empty.
  handleNameChange = () => {
    if (
      this.state.user.name !== this.state.input.name &&
      this.state.input.name !== ''
    ) {
      const userCopy = { ...this.state.user };
      userCopy.name = this.state.input.name;
      this.setState({ user: userCopy, messageCode: 'changed-name' });
      // Reset input field.
      const inputCopy = { ...this.state.input };
      inputCopy.name = '';
      this.setState({ input: inputCopy });
    }
  };

  // Update state category input with user input.
  handleCategoryInputChange = (event) => {
    const inputCopy = { ...this.state.input };
    inputCopy.category = event.target.value;
    this.setState({ input: inputCopy });
  };

  // Create entry object. If category is empty, set category to 'No category set'.
  createEntry = () => {
    const category =
      this.state.input.category === ''
        ? 'No category set'
        : this.state.input.category;

    return {
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

    userCopy.budgets[this.state.currentBudgetIndex].entries.push(
      this.createEntry()
    );
    this.setState({ user: userCopy });

    const inputCopy = { ...this.state.input };
    inputCopy.category = '';
    this.setState({ input: inputCopy });
  };

  // Event handler for delete entry button.
  handleDeleteEntry = (index) => {
    console.log(index);
    const userCopy = cloneDeep(this.state.user);
    const filteredEntries = userCopy.budgets[
      this.state.currentBudgetIndex
    ].entries.filter((entry, i) => i !== index);
    userCopy.budgets[this.state.currentBudgetIndex].entries = filteredEntries;
    console.log(filteredEntries);
    this.setState({ user: userCopy });
  };

  // Event handler for initial delete button.
  // Changes delete button to confirm delete button.
  handleUserClickedDeleteBudget = (userClicked) => {
    if (userClicked) this.setState({ userClickedDeleteBudget: true });
    else this.setState({ userClickedDeleteBudget: false });
  };

  // Event handler for confirm delete button.
  handleDeleteBudget = () => {
    const userCopy = cloneDeep(this.state.user);

    const filteredBudgets = userCopy.budgets.filter(
      (budget, i) => i !== this.state.currentBudgetIndex
    );
    userCopy.budgets = filteredBudgets;
    this.setState({
      user: userCopy,
      route: 'budgets',
      messageCode: 'deleted-budget',
      userClickedDeleteBudget: false,
    });
  };

  // Create budget object. Budget name is set using the Date object.
  // Name depends on current date and current number of budgets.
  createBudget = () => {
    const date = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + this.state.user.budgets.length,
      new Date().getDate()
    );

    return {
      id: Math.round(Math.random() * 1000), //temp assignment of id
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
  // Sets currentBudgetIndex to the selected budget's index and route to 'create'.
  handleViewBudget = (index) => {
    this.setState({ currentBudgetIndex: index, route: 'create' });
  };

  handleAddBudget = () => {
    const userCopy = cloneDeep(this.state.user);

    userCopy.budgets.push(this.createBudget());
    this.setState({
      user: userCopy,
      messageCode: 'created-budget',
    });
  };

  // Event handler for save budgets button.
  handleSaveBudgets = () => {
    this.setState({ messageCode: 'saved-budgets' });
  };

  // Update budget name if user input is not empty.
  handleFocusOutBudgetName = (text) => {
    const userCopy = cloneDeep(this.state.user);

    userCopy.budgets[this.state.currentBudgetIndex].name =
      text === '' ? userCopy.budgets[this.state.currentBudgetIndex].name : text;

    this.setState({ user: userCopy });
  };

  // Update monthly income with user input.
  // Handle parentheses by formatting as negative number.
  // If user input isNaN, set messageCode to invalid.
  // If rounded user input is equal to current monthly income, do not update.
  // Else, update monthly income.
  handleFocusOutProjectedMonthlyIncome = (text) => {
    let filteredText = text;

    if (filteredText.startsWith('(') && filteredText.endsWith(')'))
      filteredText = filteredText.replace('(', '-').replace(')', '');

    filteredText = filteredText.replace(/,/g, '').replace(/\$/g, '');

    if (isNaN(filteredText))
      this.setState({ messageCode: 'invalid-projected-monthly-income' });
    else if (
      Math.round(filteredText * 100) / 100 ===
      this.state.user.budgets[this.state.currentBudgetIndex]
        .projectedMonthlyIncome
    ) {
      this.setState({ messageCode: null });
    } else {
      const userCopy = cloneDeep(this.state.user);
      userCopy.budgets[this.state.currentBudgetIndex].projectedMonthlyIncome =
        Math.round(filteredText * 100) / 100;

      this.setState({
        user: userCopy,
        messageCode: 'updated-projected-monthly-income',
      });
    }
  };

  handleFocusOutActualMonthlyIncome = (text) => {
    let filteredText = text;

    if (filteredText.startsWith('(') && filteredText.endsWith(')'))
      filteredText = filteredText.replace('(', '-').replace(')', '');

    filteredText = filteredText.replace(/,/g, '').replace(/\$/g, '');

    if (isNaN(filteredText))
      this.setState({ messageCode: 'invalid-actual-monthly-income' });
    else if (
      Math.round(filteredText * 100) / 100 ===
      this.state.user.budgets[this.state.currentBudgetIndex].actualMonthlyIncome
    ) {
      this.setState({ messageCode: null });
    } else {
      const userCopy = cloneDeep(this.state.user);
      userCopy.budgets[this.state.currentBudgetIndex].actualMonthlyIncome =
        Math.round(filteredText * 100) / 100;

      this.setState({
        user: userCopy,
        messageCode: 'updated-actual-monthly-income',
      });
    }
  };

  // Update entry category if input is not empty.
  handleFocusOutCategory = (text, index) => {
    const userCopy = cloneDeep(this.state.user);

    userCopy.budgets[this.state.currentBudgetIndex].entries[index].category =
      text === ''
        ? userCopy.budgets[this.state.currentBudgetIndex].entries[index]
            .category
        : text;

    this.setState({ user: userCopy });
  };

  // See comments for handleFocusOutProjectedMonthlyIncome/handleFocusOutActualMonthlyIncome
  handleFocusOutProjectedCost = (text, index) => {
    let filteredText = text;

    if (filteredText.startsWith('(') && filteredText.endsWith(')'))
      filteredText = filteredText.replace('(', '-').replace(')', '');

    filteredText = filteredText.replace(/,/g, '').replace(/\$/g, '');

    if (isNaN(filteredText))
      this.setState({ messageCode: 'invalid-projected-cost' });
    else if (
      Math.round(filteredText * 100) / 100 ===
      this.state.user.budgets[this.state.currentBudgetIndex].entries[index]
        .projectedCost
    ) {
      this.setState({ messageCode: null });
    } else {
      const userCopy = cloneDeep(this.state.user);
      userCopy.budgets[this.state.currentBudgetIndex].entries[
        index
      ].projectedCost = Math.round(filteredText * 100) / 100;

      this.setState({
        user: userCopy,
        messageCode: 'updated-projected-cost',
      });
    }
  };

  handleFocusOutActualCost = (text, index) => {
    let filteredText = text;

    if (filteredText.startsWith('(') && filteredText.endsWith(')'))
      filteredText = filteredText.replace('(', '-').replace(')', '');

    filteredText = filteredText.replace(/,/g, '').replace(/\$/g, '');

    if (isNaN(filteredText))
      this.setState({ messageCode: 'invalid-actual-cost' });
    else if (
      Math.round(filteredText * 100) / 100 ===
      this.state.user.budgets[this.state.currentBudgetIndex].entries[index]
        .actualCost
    ) {
      this.setState({ messageCode: null });
    } else {
      const userCopy = cloneDeep(this.state.user);
      userCopy.budgets[this.state.currentBudgetIndex].entries[
        index
      ].actualCost = Math.round(filteredText * 100) / 100;

      this.setState({
        user: userCopy,
        messageCode: 'updated-actual-cost',
      });
    }
  };

  render() {
    const {
      route,
      messageCode,
      input,
      backgrounds,
      isLoggedIn,
      currentBudgetIndex,
      userClickedDeleteBudget,
      user,
    } = this.state;

    return (
      <div
        className="background"
        style={{ backgroundImage: `url(${this.state.user.background.url})` }}
      >
        <div className={`App ${user.background.useDarkMode ? 'dark' : null}`}>
          <Header
            isLoggedIn={isLoggedIn}
            handleRouteChange={this.handleRouteChange}
          />
          {route === 'signin' || route === 'signup' ? (
            <Landing route={route} handleRouteChange={this.handleRouteChange} />
          ) : route === 'create' ? (
            <Create
              budget={user.budgets[currentBudgetIndex]}
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
              messageCode={messageCode}
              inputCategory={input.category}
              handleCategoryInputChange={this.handleCategoryInputChange}
              handleAddEntry={this.handleAddEntry}
              handleDeleteEntry={this.handleDeleteEntry}
              handleFocusOutCategory={this.handleFocusOutCategory}
              handleFocusOutProjectedCost={this.handleFocusOutProjectedCost}
              handleFocusOutActualCost={this.handleFocusOutActualCost}
              handleUserClickedDeleteBudget={this.handleUserClickedDeleteBudget}
              userClickedDeleteBudget={userClickedDeleteBudget}
              handleDeleteBudget={this.handleDeleteBudget}
            />
          ) : route === 'budgets' ? (
            <Budgets
              user={user}
              handleViewBudget={this.handleViewBudget}
              handleAddBudget={this.handleAddBudget}
              handleSaveBudgets={this.handleSaveBudgets}
              messageCode={messageCode}
            />
          ) : route === 'profile' ? (
            <Profile
              user={user}
              inputName={input.name}
              handleNameInputChange={this.handleNameInputChange}
              handleNameChange={this.handleNameChange}
              handleBackgroundChange={this.handleBackgroundChange}
              backgrounds={backgrounds}
              messageCode={messageCode}
            />
          ) : route === 'about' ? (
            <About />
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
