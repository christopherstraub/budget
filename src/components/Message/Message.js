import React from 'react';

const Message = ({ message, invalid = false }) => {
  if (invalid) return <h2 className="message-invalid tc mb4">{message}</h2>;
  else return <h2 className="message tc mb4">{message}</h2>;
};

export default Message;
