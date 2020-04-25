import React from 'react';

const Create = () => {
  return (
    <div className="window-box mw7">
      <h1 className="window-title edit tc">April 2020</h1>
      <h1
        className="white o-80 flex justify-center items-center mb5 edit"
        style={{ fontSize: '1.8rem' }}
      >
        Click field to edit
      </h1>
      <h2 className="number-label">Projected Monthly Income</h2>
      <h1 className="number edit tc mb4">$9,993,000.00</h1>
      <h2 className="number-label">Actual Monthly Income</h2>
      <h1 className="number edit tc mb4">$3,500.00</h1>
      <h2 className="number-label">Projected Balance</h2>
      <h1 className="number tc mb4">$9,999,500.00</h1>
      <h2 className="number-label">Actual Balance</h2>
      <h1 className="number tc mb4">$1,500.00</h1>
      <h2 className="number-label">Difference</h2>
      <h1 className="number tc mb4 clr-red b">$1,000.00</h1>
      <input
        className="placeholder br2 pv1 ph3 mr3 w-100"
        type="text"
        id="name"
        name="name"
        placeholder="Enter category to add"
      />
    </div>
  );
};

export default Create;
