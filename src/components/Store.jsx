import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EntryMessage from '../layouts/toaster.jsx';
import Navbar from '../layouts/navbar.jsx';
import ImagesMasonry from '../layouts/imagesMasonry.jsx'; // Correct the capitalization

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



