import React from 'react';
import WindowBox from '../WindowBox/WindowBox';

const About = () => {
  return (
    <div className="flex justify-center pv5 ph4">
      <WindowBox classlist="mw7">
        <div className="text-shadow">
          <p className="window-body">
            <span className="clr-accent-light i">CSBudget</span> is maintained
            by Christopher Straub and distributed under the MIT License.
          </p>
          <p className="window-body mb0">
            You can get in touch with Christopher
            <a
              href="
http://www.chrisstraub.com/
            "
              className="anchor link"
              target="_blank"
              style={{ textDecoration: 'none' }}
            >
              {' '}
              here
            </a>
            .
          </p>
        </div>
      </WindowBox>
    </div>
  );
};

export default About;
// CCUSTOM BUTTON ANIM
