import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config'; // Firebase থেকে DB ইমপোর্ট
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

const UserChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  
  // মেসেজ পাঠানো
  const sendMessage = async (e) => {
    e.preventDefault();
    if (message) {
      try {
        await addDoc(collection(db, "messages"), {
          text: message,
          sender: 'user',  // ইউজারের মেসেজ
          timestamp: new Date(),
        });
        setMessage('');
      } catch (err) {
        console.error('Error sending message:', err);
      }
    }
  };

  // মেসেজ লোড করা
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesArray = [];
      querySnapshot.forEach((doc) => {
        messagesArray.push(doc.data());
      });
      setMessages(messagesArray);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Chat with Admin</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === 'admin' ? 'left' : 'right' }}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default UserChat;