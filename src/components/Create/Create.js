import React from 'react';

const Create = () => {
  return (
    <div className="flex items-start justify-center">
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
        <h1 className="number tc mb4">$3,000.00</h1>
        <h2 className="number-label">Actual Cost</h2>
        <h1 className="number tc mb4">$3,500.00</h1>
        <h2 className="number-label">Cost Difference</h2>
        <h1 className="number tc clr-green">$1,500.00</h1>
      </div>
      <div className="window-box flex-grow-1 mh3">
        <h1 className="window-title tc mb5">Entries</h1>

        <div className="flex justify-center">
          <input
            className="placeholder br2 pv3 ph3 mr3 w-50"
            type="text"
            id="name"
            name="name"
            placeholder="Enter category to add"
          />
          <button className="button btn--bg-blue ph4 dim">ADD CATEGORY</button>
        </div>
        <table className="bg-white mt4 table table-striped table-bordered table-hover text-break">
          <thead className="entry-title">
            <tr>
              <th scope="col">Category</th>
              <th scope="col" style={{ width: '165px' }}>
                Projected Cost
              </th>
              <th scope="col" style={{ width: '165px' }}>
                Actual Cost
              </th>
              <th scope="col" style={{ width: '165px' }}>
                Difference
              </th>
            </tr>
          </thead>
          <tbody className="entry">
            <tr>
              <td>Rent or mortgage</td>
              <td className="tr">$100,999,999.00</td>
              <td className="tr">$1,500.00</td>
              <td className="tr">$0.00</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td className="tr">$9,999,999.00</td>
              <td className="tr">$60.00</td>
              <td className="tr">-$15.00</td>
            </tr>
            <tr>
              <td>Rent or mortgage</td>
              <td className="tr">$9,999,999.00</td>
              <td className="tr">$1,500.00</td>
              <td className="tr">$0.00</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td className="tr">$9,999,999.00</td>
              <td className="tr">$60.00</td>
              <td className="tr">-$15.00</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-center pt5">
          <button className="button btn--bg-green pv3 ph4 dim">
            SAVE BUDGET
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
