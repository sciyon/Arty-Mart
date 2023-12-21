import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

import SignedIn from '../layouts/signedin.jsx';
import SignedOut from '../layouts/signedOut.jsx';
import { useAuth } from '../backend/middleware/authContext.jsx';

import homeChessboard from '../images/homeChessboard.png';

const Home = () => {
  const { authState } = useAuth();
  const { isLoggedIn, user } = authState;
  const navigate = useNavigate(); 

  return (
    <>
      <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${homeChessboard})`, filter: 'brightness(75%)' }}></div>
      {isLoggedIn && user.role === "user" ? (
        <>
          <SignedIn />
        </>
      ) : isLoggedIn && user.role === "admin" ? (
        navigate('/AdminDashboard')
      ) : (
        <SignedOut />
      )}
    </>
  );
}

export default Home;
