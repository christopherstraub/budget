import React, { Component } from 'react';

import { Scrollbars } from 'react-custom-scrollbars';

export default class CustomScrollbars extends Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = { classlist: props.classlist, heightmax: props.heightmax };
    this.renderThumb = this.renderThumb.bind(this);
  }

  renderThumb({ style, ...props }) {
    return (
      <div
        className={`${this.state.classlist}`}
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
        autoHeightMax={this.state.heightmax}
        {...this.props}
      />
    );
  }
}
