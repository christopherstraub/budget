import React from 'react';

const Create = () => {
  return (
    <div className="flex items-start justify-center mr7">
      <div className="window-box mw6">
        <h1 className="window-title edit tc">April 2020</h1>
        <h1
          className="white o-80 flex justify-center items-center mb4 edit"
          style={{ fontSize: '1.8rem' }}
        >
          Click field to edit
        </h1>
        <h2 className="number-label">Projected Monthly Income</h2>
        <h1 className="number edit tc mb4">$3,000.00</h1>
        <h2 className="number-label">Actual Monthly Income</h2>
        <h1 className="number edit tc mb4">$3,500.00</h1>
        <h2 className="number-label">Projected Balance</h2>
        <h1 className="number tc mb4">$9,500.00</h1>
        <h2 className="number-label">Actual Balance</h2>
        <h1 className="number tc mb4">$1,500.00</h1>
        <h2 className="number-label">Balance Difference</h2>
        <h1 className="number tc clr-red">($1,000.00)</h1>
        <h2 className="number-label">Projected Cost</h2>
        <h1 className="number edit tc mb4">$3,000.00</h1>
        <h2 className="number-label">Actual Cost</h2>
        <h1 className="number edit tc mb4">$3,500.00</h1>
        <h2 className="number-label">Cost Difference</h2>
        <h1 className="number tc clr-green">$1,500.00</h1>
      </div>
      <div className="window-box">
        <h1 className="window-title tc mb5">Entries</h1>

        <div className="flex">
          <input
            className="placeholder br2 pv1 ph3 mr3 w-100"
            type="text"
            id="name"
            name="name"
            placeholder="Enter category to add"
          />
          <button className="button btn--bg-blue pv1 ph3">ADD</button>
        </div>
      </div>
    </div>
  );
};

export default Create;
