import React, { Component } from 'react';

import Header from '../../components/Header/Header';
import Landing from '../../components/Landing/Landing';
import Saved from '../../components/Saved/Saved';
import About from '../../components/About/About';
import Profile from '../../components/Profile/Profile';
import Create from '../../components/Create/Create';

import Background1 from '../../images/bg1.jpg';
import Background2 from '../../images/bg2.jpg';
import Background3 from '../../images/bg3.jpg';
import Background4 from '../../images/bg4.jpg';

import cloneDeep from 'lodash/cloneDeep';

import './App.scss';

// VALID ROUTES
// 'signin', 'signup', 'create', 'saved', 'profile', 'about'

// VALID MESSAGE CODES
// 'updated-projected-monthly-income', 'updated-actual-monthly-income',
// 'invalid-projected-monthly-income', 'invalid-actual-monthly-income',
// 'deleted-budget', 'created-budget', 'changed-name', 'changed-background'

const initialState = {
  route: 'create',
  messageCode: '',
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
    email: 'ccstraub@gmail.com',
    joined: null,
    background: {
      name: 'ALPINE MOUNTAINS',
      url: Background1,
      useDarkMode: false,
    },
    budgets: [
      {
        id: 1,
        name: 'April 2020',
        // name: { month: new Date().getMonth(), year: new Date().getFullYear() },
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
        entries: [
          {
            category: 'Mortgage or rent',
            projectedCost: 1500,
            actualCost: 1500,
            getDifference() {
              return this.projectedCost - this.actualCost;
            },
          },
          {
            category: 'Phone',
            projectedCost: 80,
            actualCost: 60,
            getDifference() {
              return this.projectedCost - this.actualCost;
            },
          },
          {
            category: 'Car',
            projectedCost: 100,
            actualCost: 150,
            getDifference() {
              return this.projectedCost - this.actualCost;
            },
          },
        ],
      },
    ],
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  handleRouteChange = (route) => {
    if (this.state.route !== route) this.setState({ route, messageCode: null });
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

  handleNameInputChange = (event) => {
    const inputCopy = { ...this.state.input };
    inputCopy.name = event.target.value;
    this.setState({ input: inputCopy });
  };

  handleNameChange = () => {
    // Update name if name input is different from current name
    // and name input is not empty
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

  handleCategoryInputChange = (event) => {
    const inputCopy = { ...this.state.input };
    inputCopy.category = event.target.value;
    this.setState({ input: inputCopy });
  };

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

  handleAddEntry = () => {
    const userCopy = cloneDeep(this.state.user);

    userCopy.budgets[this.state.currentBudgetIndex].entries.push(
      this.createEntry()
    );
    this.setState({ user: userCopy });

    // Reset input field.
    const inputCopy = { ...this.state.input };
    inputCopy.category = '';
    console.log(this.state.input);
    console.log(inputCopy);
    this.setState({ input: inputCopy });
  };

  handleUserClickedDeleteBudget = (userClicked) => {
    if (userClicked) this.setState({ userClickedDeleteBudget: true });
    else this.setState({ userClickedDeleteBudget: false });
  };

  handleDeleteBudget = () => {
    const userCopy = cloneDeep(this.state.user);

    const filteredBudgets = userCopy.budgets.filter(
      (budget, index) => index !== this.state.currentBudgetIndex
    );
    userCopy.budgets = filteredBudgets;
    this.setState({
      user: userCopy,
      route: 'saved',
      messageCode: 'deleted-budget',
      userClickedDeleteBudget: false,
    });
  };

  createBudget = () => {
    return {
      id: Math.round(Math.random() * 1000), //temp assignment of id
      name: `${new Date().getMonth()}`,
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

  handleFocusOutBudgetName = (text, id) => {
    const userCopy = cloneDeep(this.state.user);

    userCopy.budgets[this.state.currentBudgetIndex].name =
      text === '' ? userCopy.budgets[this.state.currentBudgetIndex].name : text;

    this.setState({ user: userCopy });
  };

  handleFocusProjectedMonthlyIncome = (text) => {
    const inputCopy = { ...this.state.input };
    inputCopy.projectedMonthlyIncome = text;
    this.setState({ input: inputCopy });
  };

  handleFocusActualMonthlyIncome = (text) => {
    const inputCopy = { ...this.state.input };
    inputCopy.actualMonthlyIncome = text;
    this.setState({ input: inputCopy });
  };

  handleFocusOutProjectedMonthlyIncome = (text) => {
    const filteredText = text.replace(/,/g, '').replace(/\$/g, '');

    if (isNaN(filteredText))
      this.setState({ messageCode: 'invalid-projected-monthly-income' });
    else if (
      Math.round(filteredText * 100) / 100 ===
      this.state.user.budgets[this.state.currentBudgetIndex]
        .projectedMonthlyIncome
    ) {
      this.setState({ messageCode: '' });
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
    const filteredText = text.replace(/,/g, '').replace(/\$/g, '');

    if (isNaN(filteredText))
      this.setState({ messageCode: 'invalid-actual-monthly-income' });
    else if (
      Math.round(filteredText * 100) / 100 ===
      this.state.user.budgets[this.state.currentBudgetIndex].actualMonthlyIncome
    ) {
      this.setState({ messageCode: '' });
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

    user.joined = new Date();

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
          <div className="ph4 pv5">
            {route === 'signin' || route === 'signup' ? (
              <Landing
                route={route}
                handleRouteChange={this.handleRouteChange}
              />
            ) : route === 'create' ? (
              <Create
                budget={user.budgets[currentBudgetIndex]}
                handleCategoryInputChange={this.handleCategoryInputChange}
                handleAddEntry={this.handleAddEntry}
                inputCategory={input.category}
                handleUserClickedDeleteBudget={
                  this.handleUserClickedDeleteBudget
                }
                userClickedDeleteBudget={userClickedDeleteBudget}
                handleDeleteBudget={this.handleDeleteBudget}
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
              />
            ) : route === 'saved' ? (
              <Saved
                user={user}
                messageCode={messageCode}
                handleAddBudget={this.handleAddBudget}
                handleViewBudget={this.handleViewBudget}
              />
            ) : route === 'about' ? (
              <About />
            ) : route === 'profile' ? (
              <Profile
                handleBackgroundChange={this.handleBackgroundChange}
                backgrounds={backgrounds}
                user={user}
                handleNameInputChange={this.handleNameInputChange}
                handleNameChange={this.handleNameChange}
                inputName={input.name}
                messageCode={messageCode}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
