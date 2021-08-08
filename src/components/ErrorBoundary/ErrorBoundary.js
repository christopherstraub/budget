import React from 'react';

class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="pv5 ph4 tc">
          <span className="clr-light fs-body">
            Unfortunately, we've encountered an error.
          </span>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
