import React from 'react';
import WindowBox from '../WindowBox/WindowBox';

const About = () => {
  return (
    <div className="flex justify-center">
      <WindowBox classList="mw8">
        <div>
          <p className="window-title">
            <span className="i">CSBudget</span> is maintained by Christopher
            Straub and distributed under the MIT License.
          </p>
          <p className="window-title mb0">
            You can get in touch with Christopher
            <span className="clr-blue dim pointer"> here</span>.
          </p>
        </div>
      </WindowBox>
    </div>
  );
};

export default About;

// CCUSTOM BUTTON ANIM
