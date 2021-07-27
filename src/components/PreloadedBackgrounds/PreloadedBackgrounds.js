import React from 'react';

const PreloadedBackgrounds = ({ backgrounds }) => {
  return (
    <div className="dn">
      {backgrounds.map((background, index) => (
        <img key={index} src={background.url} alt={background.name} />
      ))}
    </div>
  );
};

export default PreloadedBackgrounds;
