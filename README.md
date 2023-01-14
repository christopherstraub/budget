# CSBudget

CSBudget is a budgeting application composed of a sleek and responsive front-end built with React and an [API](https://github.com/christopherstraub/csbudget-api) built with Node.js and Express that queries a PostgreSQL database. With it, you can easily create, edit, and save your budgets from any device.

## View

CSBudget is served live at [chrisstraub.com/csbudget/](https://chrisstraub.com/csbudget/).

### Run locally

1. Having Node.js and npm installed is a prerequisite for running the project locally. The npm Docs offer download and installation instructions [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
2. [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) or download the project and open the project directory in your shell of choice.
3. Install dependencies with command `npm install`.
4. Run the app in development mode with script `npm start`. The app will be served locally at [localhost:3000](http://localhost:3000).

## Navigating the app

- Sign up or sign in from the landing page (all passwords are hashed and stored securely). Or...
- Continue as guest and lose access to certain features. Then...
- You will be greeted with a welcome message at the _View Budget_ page. Here you may:
  - Save your budget.
  - Create a copy of your budget.
  - Update the name of your budget.
  - Manage your budget entries, each containing an editable category, projected cost, and actual cost.
  - View the cost difference of each entry.
  - View when your budget was last saved.
  - Delete your budget.
- To the right of or below your budget entries, you will find your budget summary, where you may:
  - Update your projected and actual monthly incomes.
  - View the total projected and actual costs, and total cost difference of your budget.
  - View the projected and actual balances, and balance difference of your budget.
- Navigate to the _Saved Budgets_ page, where you may:
  - View or edit any of your budgets.
  - Save all of your budgets at once.
  - Create a new budget.
- View your _Profile_, where you may:
  - Select your background from a variety of curated options.
  - Change your display name.
  - Change your currency.
  - Change your password (if signed in).
- View the _About_ page or _Sign Out_/_Sign Up_.

### Future features

- View short- and long-term trends and trajectories that help monitor and predict income and spending.
- Improve your workflow by creating a budget with recommended values.
- Export your data to Excel or CSV.

## What the app looks like

![view budget](https://raw.githubusercontent.com/christopherstraub/csbudget/master/screenshots/view-budget.PNG)
![saved budgets](https://raw.githubusercontent.com/christopherstraub/csbudget/master/screenshots/saved-budgets.PNG)
![profile](https://raw.githubusercontent.com/christopherstraub/csbudget/master/screenshots/profile.PNG)

### Looks great on mobile, as well

![view budget mobile](https://raw.githubusercontent.com/christopherstraub/csbudget/master/screenshots/view-budget-mobile.png)

## Dependencies

- node-sass
- react-custom-scrollbars-2
- react-transition-group
- tachyons

### Dev dependencies

- gh-pages (deployment)

## License

CSBudget is [MIT licensed](https://github.com/christopherstraub/csbudget/blob/master/LICENSE).
