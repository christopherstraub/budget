import React from 'react';
import WindowBox from '../WindowBox/WindowBox';

const About = () => {
  return (
    <div className="flex justify-center mt4 ph4">
      <WindowBox classlist="mw9 tc">
        <p className="window-body">
          CSBudget is maintained by Christopher Straub and distributed under the
          MIT License.
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
      </WindowBox>
    </div>
  );
};

export default About;
// CCUSTOM BUTTON ANIM
