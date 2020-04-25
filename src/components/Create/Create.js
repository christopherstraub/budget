import React from 'react';

const Create = () => {
  return (
    <div className="window-box mw7">
      <h1 className="window-title edit tc">April 2020</h1>
      <h1
        className="subtitle flex justify-center items-center mb5 edit"
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
      <h1 className="number tc mb4 clr-green b">$1,000.00</h1>
    </div>
  );
};

export default Create;
