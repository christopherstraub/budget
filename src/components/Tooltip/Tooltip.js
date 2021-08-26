import React from 'react';

import './Tooltip.scss';

const Tooltip = ({ tooltip, mousePosition }) =>
  tooltip.value ? (
    <span
      className={`fixed pointer-events-none clr-light fs-body bg--accent-dark tc mb0 pa3 br3
    ${tooltip.showToLeft ? 'arrow-right' : 'arrow-left'}
    `}
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        transform: tooltip.showToLeft
          ? 'translate(-100%, -50%)'
          : 'translateY( -50%)',
        marginLeft: tooltip.showToLeft ? '-15px' : '15px',
        width: 'max-content',
        maxWidth: '75vw',
        zIndex: '999',
      }}
    >
      {tooltip.value}
    </span>
  ) : null;

export default Tooltip;
