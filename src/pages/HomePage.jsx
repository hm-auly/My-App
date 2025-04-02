import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <h2 className='font-bold text-2xl'>Welcome to the Chat Application</h2>
      <div className='flex justify-between w-[20%] pt-8'>   
      <Link to="/admin-login">
        <button className='bg-cyan-500 px-2 py-1 text-white'>Admin Login</button>
      </Link>
      <Link to="/user-chat">
        <button className='bg-cyan-500 px-2 py-1 text-white'>User Chat</button>
      </Link>
      </div>
    </div>
  );
}

export default HomePage;