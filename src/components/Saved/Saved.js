import React from 'react';

const Saved = () => {
  return (
    <div className="window-box mw7">
      <h1 className="window-title tc mb4">
        Josh, you have <span className="clr-blue b">3</span> saved budgets.
      </h1>
      <ul className="ul tc">
        <li className="mv2">
          <p className="window-body dib mr3">April 2020</p>
          <button className="button btn--bg-blue pv1 ph3">EDIT</button>
        </li>
        <li className="mv2">
          <p className="window-body dib mr3">May 2020</p>
          <button className="button btn--bg-blue pv1 ph3">EDIT</button>
        </li>
        <li className="mv2">
          <p className="window-body dib mr3">June 2020</p>
          <button className="button btn--bg-blue pv1 ph3">EDIT</button>
        </li>
        <li>
          <button className="button btn--bg-green pv1 ph3 mt4">
            CREATE NEW BUDGET
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Saved;
