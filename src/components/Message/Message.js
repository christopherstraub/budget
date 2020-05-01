import React from 'react';

const Message = ({ message, invalid = false }) => {
  if (invalid)
    return (
      <h2 className="message-invalid bg--dark-red br-pill tc pv3 mb5">
        {message}
      </h2>
    );
  else return <h2 className="message tc mb5">{message}</h2>;
};

export default Message;
