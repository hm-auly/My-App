import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config'; // Firebase থেকে DB ইমপোর্ট
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    // ইউজার লিস্ট ফেচ করা
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersList = [];
      querySnapshot.forEach((doc) => {
        usersList.push(doc.data());
      });
      setUsers(usersList);
    });
    return () => unsubscribe();
  }, []);

  // মেসেজ ডিলিট করা
  const deleteMessage = async (messageId) => {
    await deleteDoc(doc(db, "messages", messageId));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Users List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <button onClick={() => console.log("Chat with user", user.email)}>
              {user.email}
            </button>
          </li>
        ))}
      </ul>
      <h2>Messages</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <p>{msg.text}</p>
            <button onClick={() => deleteMessage(msg.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;