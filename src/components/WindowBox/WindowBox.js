import React, { useState, useEffect } from 'react';

import CustomScrollbars from '../CustomScrollbars/CustomScrollbars';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const getWindowDimensions = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions());
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

const WindowBox = (props) => {
  const { width, height } = useWindowDimensions();
  console.log(width, height);

  return (
    <div className={`bg--window-box br3 ${props.classlist}`}>
      <CustomScrollbars
        classlist="bg--accent-light hover-opacity br-pill o-90"
        autoHide
      >
        <ErrorBoundary>
          <div style={{ maxHeight: height - 100 }}>
            {props.children}
          </div>
        </ErrorBoundary>
      </CustomScrollbars>
    </div>
  );
};

export default WindowBox;
