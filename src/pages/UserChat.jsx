import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { signInAnonymously } from 'firebase/auth';
import { collection, addDoc, query, where, onSnapshot, serverTimestamp } from 'firebase/firestore';

const UserChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 🔹 ইউজার যদি লগইন না করে, তাহলে অ্যানোনিমাস অ্যাকাউন্ট তৈরি হবে
    signInAnonymously(auth)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        console.error("Error signing in anonymously: ", error);
      });
  }, []);

  useEffect(() => {
    if (!user) return;

    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, where('userId', '==', user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [user]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    try {
      await addDoc(collection(db, 'messages'), {
        userId: user.uid,
        text: message,
        createdAt: serverTimestamp(),
        sender: 'user'
      });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="p-4 bg-blue-600 text-white text-center font-bold">User Chat</div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`mb-2 p-2 rounded ${msg.sender === 'user' ? 'bg-green-200' : 'bg-gray-300'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="p-4 flex">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded-l"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">Send</button>
      </form>
    </div>
  );
};

export default UserChat;