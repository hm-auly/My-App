import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // এখানে আপনার লগইন লজিক প্রয়োগ করতে হবে, এখন শুধু চেক করছি
    if (email === 'admin@example.com' && password === 'adminpassword') {
      navigate('/admin-dashboard'); // এডমিন লগইন হলে ড্যাশবোর্ডে যাবে
    } else {
      navigate('/user-chat'); // ইউজার লগইন হলে চ্যাট পেজে যাবে
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
    </div>
  );
};

export default Login;