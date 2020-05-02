import React from 'react';
import WindowBox from '../WindowBox/WindowBox';

const About = () => {
  return (
    <div className="flex justify-center">
      <WindowBox classList="mw8">
        <p className="window-title mb0 tc">
          <span className="i">CSBudget</span> is maintained by Christopher
          Straub and distributed under the MIT License. You can get in touch
          with Christopher
          <span className="clr-blue dim pointer"> here</span>.
        </p>
      </WindowBox>
    </div>
  );
};

export default About;

// CCUSTOM BUTTON ANIM
