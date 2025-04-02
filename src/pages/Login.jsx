import React, { useState } from 'react';
import { auth } from '../firebase/config';  // Firebase config ফাইল থেকে auth ইমপোর্ট
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';  // react-router-dom থেকে useNavigate ইমপোর্ট

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();  // useNavigate হুক ব্যবহার

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully');
      navigate('/admin-dashboard');  // লগইন সফল হলে admin-dashboard পেজে রিডিরেক্ট হবে
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Log In</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;