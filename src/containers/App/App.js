import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Landing from '../../components/Landing/Landing';
import Saved from '../../components/Saved/Saved';
import About from '../../components/About/About';

import './App.scss';

const initialState = {
  //route options: ['signin', 'signup', 'create', 'saved', 'profile', 'about']
  route: 'about',
  loggedIn: true,
  inputCategory: '',
  inputName: '',
  backgrounds: [
    { name: 'ALPINE MOUNTAINS', url: '', useDarkMode: false },
    { name: 'MACHU PICCHU', url: '', useDarkMode: true },
    { name: 'YOSEMITE VALLEY', url: '', useDarkMode: true },
  ],
  user: {
    id: '',
    name: '',
    email: '',
    joined: '',
    background: '',
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

  render() {
    const { route, loggedIn } = this.state;
    return (
      <div className="background">
        <div className="App">
          <Header loggedIn={loggedIn} />
          <div className="active-window ph4 pv6">
            {route === 'signin' || route === 'signup' ? (
              <Landing route={route} />
            ) : route === 'saved' ? (
              <Saved />
            ) : route === 'about' ? (
              <About />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
