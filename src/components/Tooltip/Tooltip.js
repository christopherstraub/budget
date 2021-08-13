import React from 'react';

/*  
Valid tooltip codes:
Entries:
'save-budget', 'copy-budget', 'edit-budget-name'
Summary:
'edit-projected-monthly-income', 'edit-actual-monthly-income'
*/

const getTooltip = (code) => {
  switch (code) {
    case 'save-budget':
      return 'Save budget';
    case 'copy-budget':
      return 'Create a copy of this budget';
    case 'edit-budget-name':
      return 'Edit budget name';
    case 'edit-projected-monthly-income':
      return 'Edit projected monthly income';
    case 'edit-actual-monthly-income':
      return 'Edit actual monthly income';
    default:
      return null;
  }
};

const Tooltip = ({ tooltip, mousePosition }) => (
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
      width: 'fit-content',
    }}
  >
    {getTooltip(tooltip.code)}
  </span>
);

export default Tooltip;
