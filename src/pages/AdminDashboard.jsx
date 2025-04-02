// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { db, collection, query, onSnapshot, deleteDoc, doc } from '../firebase/config';
import Sidebar from '../components/Sidebar';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'messages'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleDeleteMessage = async (messageId) => {
    await deleteDoc(doc(db, 'messages', messageId));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <h3 className="text-xl mb-4">Users</h3>
        <ul className="bg-white p-4 shadow-md rounded">
          {users.map(user => (
            <li key={user.id} className="p-2 border-b">{user.email || `User ${user.id}`}</li>
          ))}
        </ul>
        <h3 className="text-xl mb-4 mt-8">Messages</h3>
        <ul className="bg-white p-4 shadow-md rounded">
          {messages.map(msg => (
            <li key={msg.id} className="p-2 border-b flex justify-between items-center">
              <div>{msg.text || 'Image'}</div>
              <button onClick={() => handleDeleteMessage(msg.id)} className="text-red-500">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;