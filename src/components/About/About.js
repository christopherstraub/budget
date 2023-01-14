import React from 'react';
import { Helmet } from 'react-helmet';

import WindowBox from '../WindowBox/WindowBox';

const About = ({ toggledExpandNav }) => (
  <div className="flex justify-center pa4">
    <Helmet>
      <title>About | CSBudget</title>
    </Helmet>
    <WindowBox toggledExpandNav={toggledExpandNav}>
      <div className="pv5 ph4">
        <p className="clr-light fs-body">
          CSBudget is maintained by Christopher Straub and distributed under the
          MIT License. You can get in touch with Christopher{' '}
          <a
            href="https://chrisstraub.com/"
            className="clr-accent-light anchor hover-opacity"
            style={{ textDecoration: 'none' }}
            target="_blank"
            rel="noreferrer"
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
