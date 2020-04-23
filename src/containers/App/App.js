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
  route: 'profile',
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
    id: '',
    name: '',
    email: '',
    joined: '',
    background: {
      name: 'ALPINE MOUNTAINS',
      url: Background1,
      useDarkMode: false,
    },
    budgets: [
      {
        date: { month: 'April', year: '2020' }, //This needs fixing, use a more dynamic date format or something
        projectedMonthlyIncome: '3000',
        actualMonthlyIncome: '3500',
        projectedBalance: '',
        actualBalance: '',
        differenceBalance: '',
        totalProjectedCost: '3000',
        totalActualCost: '3000',
        totalDifferenceCost: '3000',
        entries: [
          {
            category: 'Mortgage or rent',
            projectedCost: '1500',
            actualCost: '1500',
            difference: '',
          },
          {
            category: 'Phone',
            projectedCost: '45',
            actualCost: '60',
            difference: '',
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
            ) : route === 'saved' ? (
              <Saved />
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
