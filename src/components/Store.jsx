import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import SignedOut from '../layouts/signedOut.jsx';
import SignedIn from '../layouts/signedin.jsx';
import { useAuth } from '../backend/middleware/authContext.jsx';

import ImagesMasonry from '../layouts/ImagesMasonry.jsx'; 

const Store = () => {
  const { authState } = useAuth();
  const { isLoggedIn, user } = authState;
  const navigate = useNavigate(); 

  return (
    <>
      {isLoggedIn && user.roles === "user" ? (
        <>
          <SignedIn />
        </>
      ) : isLoggedIn && user.roles === "admin" ? (
        navigate('/AdminDashboard') // Use navigate for admin role
      ) : (
        <SignedOut />
      )}
      <div className='relative w-100% h-20 bg-tier2 top-14 flex justify-center items-center'>
        <div className='font-medium uppercase ml-16 text-xl'>
        Store
        </div>
      </div>
      <div className='relative top-36 ml-36 mr-16'>
          <ImagesMasonry />
      </div>
    </>
  );
}

export default Store;