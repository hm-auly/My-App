import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');

  // 🔹 ইউজার লিস্ট দেখানোর জন্য
  useEffect(() => {
    const usersRef = collection(db, 'messages');
    const q = query(usersRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const uniqueUsers = [];
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (!uniqueUsers.some((user) => user.userId === data.userId)) {
          uniqueUsers.push({ userId: data.userId });
        }
      });
      setUsers(uniqueUsers);
    });

    return () => unsubscribe();
  }, []);

  // 🔹 নির্দিষ্ট ইউজারের মেসেজ দেখানোর জন্য
  useEffect(() => {
    if (!selectedUser) return;

    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, where('userId', '==', selectedUser));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [selectedUser]);

  // 🔹 এডমিনের রিপ্লাই পাঠানোর জন্য
  const sendReply = async (e) => {
    e.preventDefault();
    if (!reply.trim() || !selectedUser) return;

    try {
      await addDoc(collection(db, 'messages'), {
        userId: selectedUser,
        text: reply,
        createdAt: serverTimestamp(),
        sender: 'admin'
      });
      setReply('');
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* 🔹 ইউজার লিস্ট */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="font-bold text-lg">User List</h2>
        {users.map((user) => (
          <button
            key={user.userId}
            onClick={() => setSelectedUser(user.userId)}
            className="block p-2 bg-white mt-2 rounded w-full text-left"
          >
            {user.userId}
          </button>
        ))}
      </div>

      {/* 🔹 চ্যাট উইন্ডো */}
      <div className="w-3/4 flex flex-col">
        <div className="p-4 bg-blue-600 text-white text-center font-bold">
          {selectedUser ? `Chat with ${selectedUser}` : 'Select a user'}
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {messages.map((msg) => (
            <div key={msg.id} className={`mb-2 p-2 rounded ${msg.sender === 'admin' ? 'bg-blue-200' : 'bg-green-200'}`}>
              {msg.text}
            </div>
          ))}
        </div>
        {selectedUser && (
          <form onSubmit={sendReply} className="p-4 flex">
            <input
              type="text"
              placeholder="Type your reply..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="flex-1 p-2 border rounded-l"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">Send</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;