import React from 'react';
import WindowBox from '../WindowBox/WindowBox';

const About = () => {
  return (
    <div className="flex justify-center mt4 ph4">
      <WindowBox>
        <p className="clr-light fs-body mb0">
          CSBudget is maintained by Christopher Straub and distributed under the
          MIT License. You can get in touch with Christopher{' '}
          <a
            href="
http://www.chrisstraub.com/
            "
            className="clr-accent-light anchor hover-opacity"
            target="_blank"
            style={{ textDecoration: 'none' }}
          >
            here
          </a>
          .
        </p>
      </WindowBox>
    </div>
  );
};

export default About;
