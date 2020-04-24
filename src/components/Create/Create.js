import React from 'react';

const Create = () => {
  return (
    <div className="window-box mw7">
      <h1 className="number tc">April 2020</h1>
      <h1 className="subtitle tc mb5" style={{ fontSize: '1.8rem' }}>
        Click on any field to edit
      </h1>
      <h2 className="number-label">Projected Monthly Income</h2>
      <h1
        style={{ textShadow: '4px 2px 2px #302e2e' }}
        className="number tc mb4"
      >
        $9,993,000.00
      </h1>
      <h2 className="number-label">Actual Monthly Income</h2>
      <h1
        style={{ textShadow: '4px 2px 2px #302e2e' }}
        className="number tc mb4"
      >
        $3,500.00
      </h1>
      <h2 className="number-label">Projected Balance</h2>
      <h1
        style={{ textShadow: '4px 2px 2px #302e2e' }}
        className="number tc mb4"
      >
        $9,999,500.00
      </h1>
      <h2 className="number-label">Actual Balance</h2>
      <h1
        style={{ textShadow: '4px 2px 2px #302e2e' }}
        className="number tc mb4"
      >
        $1,500.00
      </h1>
      <h2 className="number-label">Difference</h2>
      <h1
        className="number tc mb4 clr-green b"
        style={{ textShadow: '4px 2px 2px #302e2e' }}
      >
        $1,000.00
      </h1>
    </div>
  );
};

export default Create;
