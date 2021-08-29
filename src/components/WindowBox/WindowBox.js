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

const WindowBox = ({ classlist, toggledExpandNav, children }) => {
  const { width, height } = useWindowDimensions();

  return (
    <div className={`bg--window-box br3 ${classlist ? classlist : ''}`}>
      <CustomScrollbars
        classlist="bg--accent-light hover-opacity br-pill o-90"
        autoHide
      >
        <ErrorBoundary>
          <div
            className="dynamic-height"
            style={{
              maxHeight:
                height - (toggledExpandNav && width <= 900 ? 355 : 100),
            }}
          >
            {children}
          </div>
        </ErrorBoundary>
      </CustomScrollbars>
    </div>
  );
};

export default WindowBox;
