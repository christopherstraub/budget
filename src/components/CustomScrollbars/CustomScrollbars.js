import React, { Component } from 'react';

import { Scrollbars } from 'react-custom-scrollbars';

export default class CustomScrollbars extends Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = { classList: props.classList, heightMax: props.heightMax };
    this.renderThumb = this.renderThumb.bind(this);
  }

  renderThumb({ style, ...props }) {
    return (
      <div
        className={`${this.state.classList}`}
        style={{ ...style }}
        {...props}
      />
    );
  }

  render() {
    return (
      <Scrollbars
        renderThumbHorizontal={this.renderThumb}
        renderThumbVertical={this.renderThumb}
        autoHeight
        autoHeightMin={0}
        autoHeightMax={this.state.heightMax}
        {...this.props}
      />
    );
  }
}
