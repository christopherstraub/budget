import React from 'react';

import './Tooltip.scss';

const Tooltip = ({ tooltip, showTooltipLeft, mousePosition }) => (
  <span
    className={`fixed pointer-events-none clr-light fs-body bg--accent-dark tc mb0 pa3 br3
    ${showTooltipLeft ? 'arrow-right' : 'arrow-left'}
    `}
    style={{
      left: mousePosition.x,
      top: mousePosition.y,
      transform: showTooltipLeft
        ? 'translate(-100%, -50%)'
        : 'translateY(-50%)',
      marginLeft: showTooltipLeft ? '-15px' : '15px',
      width: 'max-content',
      maxWidth: '75vw',
      zIndex: '999',
    }}
  >
    {tooltip}
  </span>
);
export default Tooltip;
