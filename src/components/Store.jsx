import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EntryMessage from '../layouts/toaster.jsx';
import SignedOut from '../layouts/signedOut.jsx';
import ImagesMasonry from '../layouts/imagesMasonry.jsx'; // Correct the capitalization

function App() {

  return (
    <>
      <EntryMessage />
      <SignedOut />      
      <div className='relative w-100% h-20 bg-tier2 top-14' />
      <div className='relative top-36 ml-36 mr-16'>
          <ImagesMasonry />
      </div>
    </>
  );
}

export default App;



