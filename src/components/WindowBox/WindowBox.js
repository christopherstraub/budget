import React from 'react';

import CustomScrollbars from '../CustomScrollbars/CustomScrollbars';

const WindowBox = (props) => {
  return (
    <div
      className={`bg--gradient br3 ${props.classList}`}
      style={props.style ? props.style : null}
    >
      <CustomScrollbars backgroundColor="bg--blue">
        <div className="pa4">{props.children}</div>
      </CustomScrollbars>
    </div>
  );
};

export default WindowBox;
