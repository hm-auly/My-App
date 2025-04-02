import React, { useState } from 'react';

const UserChat = () => {
  // message - ইনপুট ফিল্ডের জন্য
  const [message, setMessage] = useState('');
  // messages - মেসেজগুলির তালিকা
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // মেসেজ পাঠানোর পর, নতুন মেসেজটি messages array তে যোগ করব
      setMessages([...messages, { sender: 'user', message }]);
      setMessage(''); // ইনপুট ফিল্ডটি ক্লিয়ার করতে
    }
  };

  return (
    <div className="chat-window">
      <h3>Chat with Admin</h3>
      <div className="messages">
        {/* messages array থেকে প্রতিটি মেসেজ রেন্ডার করা হবে */}
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'admin' ? 'admin-message' : 'user-message'}>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>

      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
          className="p-2 border rounded"
        />
        <button onClick={handleSendMessage} className="p-2 bg-blue-500 text-white rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default UserChat;