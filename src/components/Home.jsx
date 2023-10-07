import React, { useEffect } from 'react';
import SignedOut from '../layouts/signedOut.jsx';
import homeChessboard from '../images/homeChessboard.png'; // Assuming homeChessboard is your image path

function Home() {
  return (
    <>
      <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${homeChessboard})`, filter: 'brightness(75%)' }}></div>
      <SignedOut />
    </>
  );
}

export default Home;
