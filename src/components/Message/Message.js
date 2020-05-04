import React from 'react';

const Message = ({ message, invalid = false }) => {
  if (invalid)
    return (
      <h2 className="message-invalid bg--dark-red br-pill tc pv3">{message}</h2>
    );
  else return <h2 className="message tc text-break mb0">{message}</h2>;
};

export default Message;
