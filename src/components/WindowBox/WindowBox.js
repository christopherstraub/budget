import React from 'react';

import CustomScrollbars from '../CustomScrollbars/CustomScrollbars';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const WindowBox = (props) => {
  return (
    <div className={`bg--window-box br3 ${props.classlist}`}>
      <CustomScrollbars
        classlist="bg--scrollbar-window-box hover-opacity br-pill o-90"
        heightmax="86vh"
      >
        <ErrorBoundary>
          <div className="pv5 ph4">{props.children}</div>
        </ErrorBoundary>
      </CustomScrollbars>
    </div>
  );
};

export default WindowBox;
