import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h2>Welcome to the Chat Application</h2>
      <Link to="/admin-login">
        <button>Admin Login</button>
      </Link>
      <Link to="/user-chat">
        <button>User Chat</button>
      </Link>
    </div>
  );
}

export default HomePage;