import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import SignedOut from '../layouts/signedOut.jsx';
import SignedIn from '../layouts/signedin.jsx';
import { useAuth } from '../backend/middleware/authContext.jsx';

import ImagesMasonry from '../layouts/imagesMasonry.jsx'; 


const Trending = () => {

  const { authState } = useAuth();
  const { isLoggedIn, user } = authState;
  const navigate = useNavigate(); 

  return (
    <>
      {isLoggedIn && user.role === "user" ? (
        <>
          <SignedIn />
        </>
      ) : isLoggedIn && user.role === "admin" ? (
        navigate('/AdminDashboard') 
      ) : (
        <SignedOut />
      )}
      <div className='relative w-100% h-20 bg-tier2 top-14 flex justify-center items-center'>
        <div className='font-medium uppercase ml-16 text-xl'>
        Trending
        </div>
      </div>
      <div className='relative top-36 ml-36 mr-16'>
          <ImagesMasonry limit={2} />
      </div>
    </>
  );
}

export default Trending;