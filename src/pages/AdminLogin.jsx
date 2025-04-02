import React, { useState } from 'react';
import { auth } from '../firebase/config';  // Firebase auth import
import { signInWithEmailAndPassword } from 'firebase/auth';

const AdminLogin = ({ setIsAdminLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAdminLogin(false);  // Hide the login page after successful login
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-md">
        <h2 className="text-xl mb-4">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 mb-4 border rounded w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 mb-4 border rounded w-full"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;