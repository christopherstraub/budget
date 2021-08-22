import React from 'react';
import WindowBox from '../WindowBox/WindowBox';

const About = ({ toggledExpandNav }) => (
  <div className="flex justify-center pa4">
    <WindowBox toggledExpandNav={toggledExpandNav}>
      <div className="pv5 ph4">
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
      </div>
    </WindowBox>
  </div>
);

export default About;
