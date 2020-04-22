import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Homepage from '../../components/Homepage/Homepage';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';

import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = null;
  }

  render() {
    return (
      <div className="background">
        <div className="App">
          <Header />
          <Homepage />
          <SignIn />
          {/* <SignUp /> */}
        </div>
      </div>
    );
  }
}

export default App;
