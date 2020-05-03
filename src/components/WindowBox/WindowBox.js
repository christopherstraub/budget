import React from 'react';

import CustomScrollbars from '../CustomScrollbars/CustomScrollbars';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const WindowBox = (props) => {
  return (
    <div
      className={`bg--gradient br3 ${props.classList}`}
      style={props.style ? props.style : null}
    >
      <CustomScrollbars backgroundColor="bg--blue">
        <ErrorBoundary>
          <div className="pv5 ph4">{props.children}</div>
        </ErrorBoundary>
      </CustomScrollbars>
    </div>
  );
};

export default WindowBox;
