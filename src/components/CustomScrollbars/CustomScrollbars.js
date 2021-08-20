import React, { Component } from 'react';

import { Scrollbars } from 'react-custom-scrollbars-2';

class CustomScrollbars extends Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    const { classlist, autoHide } = props;
    this.state = { classlist, autoHide };
    this.renderThumb = this.renderThumb.bind(this);
  }

  renderThumb = ({ style, ...props }) => (
    <div
      className={`${this.state.classlist}`}
      style={{ ...style }}
      {...props}
    />
  );

  renderThumbHorizontal = ({ style, ...props }) => (
    <div className="dn" {...props} />
  );

  render() {
    return (
      <Scrollbars
        renderThumbHorizontal={this.renderThumbHorizontal}
        renderThumbVertical={this.renderThumb}
        autoHeight
        autoHeightMin={0}
        autoHeightMax="100vh"
        autoHide={this.state.autoHide}
        autoHideTimeout={2000}
        autoHideDuration={500}
        {...this.props}
      />
    );
  }
}

export default CustomScrollbars;
