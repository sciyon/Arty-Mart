// Home.jsx
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import EntryMessage from '../layouts/toaster.jsx';
import SignedIn from '../layouts/signedin.jsx';
import SignedOut from '../layouts/signedOut.jsx';
import { useAuth } from '../backend/middleware/authContext.jsx';

import homeChessboard from '../images/homeChessboard.png';

const Home = () => {
  const { authState } = useAuth();
  const { isLoggedIn, user } = authState;

  useEffect(() => {
    if (user && user.email) {
      EntryMessage(user.email); // Pass user.email to EntryMessage
    }
  }, [user]);

  return (
    <>
      <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${homeChessboard})`, filter: 'brightness(75%)' }}></div>
      {isLoggedIn ? (
        <>
          <SignedIn />
          <ToastContainer />    
        </>
      ) : 
      <SignedOut />
      }
    </>
  );
}

export default Home;
