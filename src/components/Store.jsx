import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import SignedOut from '../layouts/signedOut.jsx';
import ImagesMasonry from '../layouts/imagesMasonry.jsx'; // Correct the capitalization

const Store = () => {

  return (
    <>
      <SignedOut />      
      <div className='relative w-100% h-20 bg-tier2 top-14' />
      <div className='relative top-36 ml-36 mr-16'>
          <ImagesMasonry />
      </div>
    </>
  );
}

export default Store;