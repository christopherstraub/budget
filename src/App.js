import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="App">
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <a className="nav-link active" href="#">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Build Budget
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            View Saved
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Plan
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Profile
          </a>
        </li>
      </ul>
      {/* next */}
      <ul className="list-group">
        <li className="list-group-item text-center">Income and Balance</li>
        <li className="list-group-item">Projected Monthly Income</li>
        <li className="list-group-item">Actual Monthly Income</li>
        <li className="list-group-item">
          Projected Balance (Projected income minus expenses)
        </li>
        <li className="list-group-item">
          Actual Balance (Actual income minus expenses)
        </li>
        <li className="list-group-item">Difference (Actual minus projected)</li>
        <li className="list-group-item text-center">Categories</li>
        <li>
          <div className="input-group">
            <div className="input-group-prepend">
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon1"
              >
                Add a category:
              </button>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder=""
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
            />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App;
