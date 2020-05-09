import React from 'react';

import CustomScrollbars from '../CustomScrollbars/CustomScrollbars';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const WindowBox = (props) => {
  return (
    <div
      className={`bg--window-box br3 ${props.classList}`}
      style={props.style ? props.style : null}
    >
      <CustomScrollbars
        classList="bg--scrollbar-window-box br-pill o-90"
        heightMax="82vh"
      >
        <ErrorBoundary>
          <div className="pv5 ph4">{props.children}</div>
        </ErrorBoundary>
      </CustomScrollbars>
    </div>
  );
};

export default WindowBox;
