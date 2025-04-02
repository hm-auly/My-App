import React, { useState } from 'react';

const UserChat = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    // Logic to send message
    console.log('Sending message:', message);
    setMessage('');
  };

  return (
    <div className="chat-window">
      <h3>Chat with Admin</h3>
      <div className="messages">
        {/* Display messages here */}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default UserChat;