import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from '../firebase/config';
import { signInAnonymously } from 'firebase/auth';
import { collection, addDoc, query, where, onSnapshot, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';

const UserChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const messagesEndRef = useRef(null);  // Ref to scroll to bottom

  // 🔹 ইউজার যদি লগইন না করে, তাহলে অ্যানোনিমাস অ্যাকাউন্ট তৈরি হবে
  useEffect(() => {
    signInAnonymously(auth)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        console.error("Error signing in anonymously: ", error);
      });
  }, []);

  // 🔹 নির্দিষ্ট ইউজারের মেসেজ দেখানোর জন্য
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

  // 🔹 মেসেজ পাঠানোর ফাংশন
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

  // 🔹 মেসেজ ডিলিট করার ফাংশন (এডমিনের জন্য)
  const deleteMessage = async (id) => {
    try {
      const messageRef = doc(db, 'messages', id);
      await deleteDoc(messageRef);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  // 🔹 নতুন মেসেজ আসলে স্ক্রল নিচে নিয়ে আসা
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="p-4 bg-blue-600 text-white text-center font-bold">User Chat</div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 p-2 rounded ${msg.sender === 'user' ? 'bg-green-200' : 'bg-gray-300'}`}
          >
            <div>{msg.text}</div>
            {/* 🔹 ডিলিট বাটন (এডমিনের জন্য) */}
            {msg.sender === 'admin' && (
              <button
                onClick={() => deleteMessage(msg.id)}
                className="text-red-500 mt-1 text-sm"
              >
                Delete
              </button>
            )}
          </div>
        ))}
        {/* 🔹 মেসেজ শেষ হওয়ার পর স্ক্রল নিচে চলে আসবে */}
        <div ref={messagesEndRef} />
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