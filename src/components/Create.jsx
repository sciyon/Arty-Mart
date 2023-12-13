import React from 'react';

import SignedIn from '../layouts/signedin.jsx';

import chessCastle from '../images/chessCastle.png';

const Create = () => {
  
  return (
    <>
      <div className="h-screen bg-cover bg-center relative flex" style={{ backgroundImage: `url(${chessCastle})`, filter: 'brightness(75%)' }}>
        <div className='fixed left-32 top-24 bg-tier1 h-[600px] w-[1350px] p-4 transform-gpu border-r-2 border-tier4 opacity-95 flex space-x-4'>
          {/* First Column */}
          <div className="flex-1">
            Hello
          </div>

          {/* Second Column */}
          <div className="flex-1">
            Hello
          </div>

          {/* Third Column */}
          <div className="flex-1">
            Hello
          </div>
        </div>
      </div>    
      <SignedIn />
    </>
  );
}

export default Create;
