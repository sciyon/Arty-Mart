import React, { useEffect } from 'react';

import EntryMessage from '../layouts/toaster.jsx';
import SignedIn from '../layouts/signedin.jsx';

import chessCastle from '../images/chessCastle.png';

const Create = () => {

  useEffect(() => {
    EntryMessage();
  }, []);
  
  return (
    <>
      <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${chessCastle})`, filter: 'brightness(75%)' }}></div>    
      <SignedIn />
    </>
  );
}

export default Create;
