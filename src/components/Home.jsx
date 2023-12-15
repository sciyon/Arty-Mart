import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import EntryMessage from '../layouts/toaster.jsx';
import SignedIn from '../layouts/signedin.jsx';

import homeChessboard from '../images/homeChessboard.png';

const Home = () => {

  useEffect(() => {
    EntryMessage();
  }, []);
  
  return (
    <>
      <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${homeChessboard})`, filter: 'brightness(75%)' }}></div>
      <ToastContainer />      
      <SignedIn />
    </>
  );
}

export default Home;
