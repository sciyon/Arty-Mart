import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EntryMessage from './toaster.jsx';
import Navbar from './navbar.jsx';
import ImagesMasonry from './imagesMasonry.jsx'; // Correct the capitalization

function App() {

  return (
    <>
      <EntryMessage />
      <Navbar />
      <div className='relative top-32 mx-16'>
          <ImagesMasonry />
      </div>
    </>
  );
}

export default App;



