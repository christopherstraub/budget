import React from 'react';

const About = () => {
  return (
    <div className="window-box">
      <h1 className="window-title tc mb4">
        Josh, you have <span className="number-saved-budgets blue b">3</span>{' '}
        saved budgets.
      </h1>
      <ul className="ul">
        <li className="mv2">
          <h2 className="window-body dib mr3">April 2020</h2>
          <button className="button btn--edit-budget button-text">EDIT</button>
        </li>
        <li className="mv2">
          <h2 className="window-body dib mr3">May 2020</h2>
          <button className="button btn--edit-budget button-text">EDIT</button>
        </li>
        <li className="mv2">
          <h2 className="window-body dib mr3">June 2020</h2>
          <button className="button btn--edit-budget button-text">EDIT</button>
        </li>
      </ul>
      <button className="button btn--create-new-budget button-text">
        CREATE NEW BUDGET
      </button>
    </div>
  );
};

export default About;
