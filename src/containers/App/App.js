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
  //route options: ['signin', 'signup', 'create', 'saved', 'profile', 'about']
  route: 'create',
  isLoggedIn: true,
  inputCategory: '',
  inputName: '',
  backgrounds: [
    { name: 'ALPINE MOUNTAINS', url: Background1, useDarkMode: false },
    { name: 'MACHU PICCHU', url: Background2, useDarkMode: true },
    { name: 'YOSEMITE VALLEY', url: Background3, useDarkMode: true },
    { name: 'SPACE', url: Background4, useDarkMode: false },
  ],
  user: {
    id: 1,
    name: 'Chris',
    email: 'ccstraub@gmail.com',
    joined: new Date(),
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
          return this.projectedMonthlyIncome - this.getTotalProjectedCost();
        },
        getActualBalance() {
          return this.actualMonthlyIncome - this.getTotalActualCost();
        },
        getDifferenceBalance() {
          return this.getActualBalance() - this.getProjectedBalance();
        },
        getTotalProjectedCost() {
          const projectedCosts = this.entries.map(
            (entry) => entry.projectedCost
          );
          return projectedCosts.reduce((acc, value) => acc + value);
        },
        getTotalActualCost() {
          const actualCosts = this.entries.map((entry) => entry.actualCost);
          return actualCosts.reduce((acc, value) => acc + value);
        },
        getTotalDifferenceCost() {
          return this.getTotalActualCost() - this.getTotalProjectedCost();
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
            projectedCost: 45,
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

  render() {
    const { route, isLoggedIn, backgrounds, user } = this.state;

    console.log(user.budgets[0].getTotalProjectedCost());
    console.log(user.budgets[0].getTotalActualCost());

    console.log(user.budgets[0].entries[2].getDifference());

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
              <Create />
            ) : route === 'saved' ? (
              <Saved user={user} />
            ) : route === 'about' ? (
              <About />
            ) : route === 'profile' ? (
              <Profile
                handleBackgroundChange={this.handleBackgroundChange}
                backgrounds={backgrounds}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
