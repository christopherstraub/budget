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

import './App.scss';

const initialState = {
  // Valid routes: 'signin', 'signup', 'create', 'saved', 'profile', 'about'
  route: 'saved',
  // Valid messages: 'budget-deleted'
  message: 'budget-deleted',
  input: { category: '', name: '' },
  backgrounds: [
    { name: 'ALPINE MOUNTAINS', url: Background1, useDarkMode: false },
    { name: 'MACHU PICCHU', url: Background2, useDarkMode: true },
    { name: 'YOSEMITE VALLEY', url: Background3, useDarkMode: true },
    { name: 'SPACE', url: Background4, useDarkMode: false },
  ],
  isLoggedIn: true,
  user: {
    id: 1,
    name: 'Carola',
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
        title: 'April 2020',
        // title: { month: new Date().getMonth(), year: new Date().getFullYear() },
        projectedMonthlyIncome: 5000,
        actualMonthlyIncome: 5500,
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
          const projectedCosts = this.entries.map(
            (entry) => entry.projectedCost
          );
          return projectedCosts.reduce((acc, value) => acc + value);
        },
        getActualCost() {
          const actualCosts = this.entries.map((entry) => entry.actualCost);
          return actualCosts.reduce((acc, value) => acc + value);
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
      { title: 'May 2020' },
      { title: 'June 2020' },
      { title: 'June 2020' },
      { title: 'August 2021' },
    ],
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  handleRouteChange = (route) => {
    this.setState({ route });
    // If we get user, log them in
    if (route !== 'signin' && route !== 'signup')
      this.setState({ isLoggedIn: true });
    else {
      this.setState({ isLoggedIn: false });
    }
  };

  handleBackgroundChange = (event) => {
    // Only filter through backgrounds if selected background is different
    // from current background.
    if (this.state.user.background.name !== event.target.textContent) {
      const selectedBackground = this.state.backgrounds.filter(
        (background) => background.name === event.target.textContent
      );
      const userCopy = { ...this.state.user };
      userCopy.background = selectedBackground[0];
      this.setState({ user: userCopy });
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
      this.setState({ user: userCopy });
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
    return {
      category: this.state.input.category,
      projectedCost: 0,
      actualCost: 0,
      getDifference() {
        return this.projectedCost - this.actualCost;
      },
    };
  };

  handleAddEntry = () => {
    const userCopy = { ...this.state.user };
    userCopy.budgets[0].entries.push(this.createEntry());
    this.setState({ user: userCopy });
    // Reset input field.
    const inputCopy = { ...this.state.input };
    inputCopy.category = '';
    this.setState({ input: inputCopy });
  };

  handleDeleteBudget = (id) => {
    const userCopy = { ...this.state.user };
    const filteredBudgets = userCopy.budgets.filter(
      (budget) => budget.id !== id
    );
    userCopy.budgets = filteredBudgets;
    this.setState({ user: userCopy });
    this.setState({ route: 'saved' });
  };

  render() {
    const { route, message, input, backgrounds, isLoggedIn, user } = this.state;

    user.joined = new Date();
    console.log(user.joined);

    const currentBudgetIndex = 0;

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
                handleDeleteBudget={this.handleDeleteBudget}
              />
            ) : route === 'saved' ? (
              <Saved user={user} message={message} />
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
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
