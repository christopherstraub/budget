import React from 'react';

import './Message.scss';

const Message = ({ message }) => (
  <span
    className="message fixed pointer-events-none clr-light fs-body bg--accent-dark tc mb0 pa4 br3 br--top"
    style={{
      zIndex: '999',
      boxShadow: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px',
    }}
  >
    {message}
  </span>
);

export default Message;
