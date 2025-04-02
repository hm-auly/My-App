// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const Sidebar = () => {
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <ul>
        <li><Link to="/admin" className="block p-2">Dashboard</Link></li>
        <li><Link to="/user" className="block p-2">User Chat</Link></li>
      </ul>
      <button onClick={handleLogout} className="mt-4 text-red-500">Logout</button>
    </div>
  );
};

export default Sidebar;