import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NotFound() {
  const naviget = useNavigate()
  const navi = ()=>{
    naviget('/')
  }
  return (
    <div className='h-screen text-center flex items-center flex-col justify-center'>
      <h2 className='text-xl font-bold text-cyan-500'>404 Page Not Found</h2>
      <p className='text-gray-400 font-bold '>The page you're looking for does not exist.</p>
    
   
      <button onClick={navi} className='btn mt-10'>Back Home Page</button>
   

    </div>
  );
}

export default NotFound;