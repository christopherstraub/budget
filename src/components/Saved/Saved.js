import React from 'react';

import './Saved.scss';

const Saved = () => {
  return (
    <div className="window-box mw8">
      <h1 className="window-title tc mb4">
        Josh, you have <span className="clr-blue b">3</span> saved budgets.
      </h1>
      <ul className="ul">
        <li className="mv2">
          <p className="window-body dib mr3">April 2020</p>
          <button className="button btn--edit-budget button-text">EDIT</button>
        </li>
        <li className="mv2">
          <p className="window-body dib mr3">May 2020</p>
          <button className="button btn--edit-budget button-text">EDIT</button>
        </li>
        <li className="mv2">
          <p className="window-body dib mr3">June 2020</p>
          <button className="button btn--edit-budget button-text">EDIT</button>
        </li>
      </ul>
      <button className="button btn--create-new-budget button-text">
        CREATE NEW BUDGET
      </button>
    </div>
  );
};

export default Saved;
