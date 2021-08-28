import React from 'react';

const BackgroundWrapper = ({ background, children }) => {
  const { path, useDarkLanding } = background;

  return (
    <div
      className={`background
      ${useDarkLanding ? 'bg--light' : 'bg--dark'}
      `}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0.75)), url(${path})`,
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundWrapper;
