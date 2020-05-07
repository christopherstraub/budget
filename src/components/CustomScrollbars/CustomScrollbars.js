import React, { Component } from 'react';

import { Scrollbars } from 'react-custom-scrollbars';

export default class CustomScrollbars extends Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = { bgColor: props.bgcolor };
    this.renderThumb = this.renderThumb.bind(this);
  }

  renderThumb({ style, ...props }) {
    return (
      <div
        className={`${this.state.bgColor} br-pill o-40`}
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
        autoHeightMax={'82vh'}
        {...this.props}
      />
    );
  }
}
