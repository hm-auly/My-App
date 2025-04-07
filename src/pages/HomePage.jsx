import React from 'react';
import { Link } from 'react-router-dom';
import Hiro from '../Hiro';
import Vision from '../Vision';
import Offer from '../Offer';
import DebitCard from '../DebitCard';
import PerfectCard from '../PerfectCard';
import UserComment from '../UserComment';
import IIiit from '../IIiit';
import Navber from '../Navber';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function HomePage() {
  return (


    <div >
      {/* <h2 className='font-bold text-2xl'>Welcome to the Chat Application</h2>
      <div className='flex justify-between w-[20%] pt-8'>   
      <Link to="/admin-login">
        <button className='bg-cyan-500 px-2 py-1 text-white'>Admin Login</button>
      </Link>
      <Link to="/user-chat">
        <button className='bg-cyan-500 px-2 py-1 text-white'>User Chat</button>
      </Link>
      </div> */}

      {/* <Navberfull />
       <Hiro />
       <Vision />
       <Offer />
       <DebitCard />
       <PerfectCard />
       <UserComment />
       <Faqs />
       <Footer />      */}
       
      <div className='p-0 fixed md:relative w-full  z-50 '>
      <Navber  />
      </div>
      <div className='pt-24 md:pt-0'>
      <Hiro />
       <Vision />
       <Offer />
       <DebitCard />
       <PerfectCard />
       <UserComment />
       <IIiit />
      </div>
   



       

    // </div>






  );
}

export default HomePage;