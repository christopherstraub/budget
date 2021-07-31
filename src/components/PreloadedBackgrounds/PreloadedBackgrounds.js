import React from 'react';

const PreloadedBackgrounds = ({ backgrounds }) => {
  return (
    <div className="dn">
      {backgrounds.map((background) => (
        <img
          key={background.name}
          src={background.path}
          alt={background.name}
        />
      ))}
    </div>
  );
};

export default PreloadedBackgrounds;
