import React from 'react';

const BackgroundWrapper = ({ background, children }) => {
  const { path } = background;

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${path})`,
      }}
    >
      <div
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0.75))',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BackgroundWrapper;
