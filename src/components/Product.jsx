import React, { useState } from 'react';
import { TEInput, TERipple } from 'tw-elements-react';
import SignedIn from '../layouts/signedin.jsx';



const Product = () => {
  
  return (
    <>
      <SignedIn />      
      <div className='relative w-100% h-20 bg-tier2 top-14 flex justify-center items-center'>
        <div className='font-medium uppercase ml-16 text-xl'>
        Title of Product 
        </div>
      </div>
      <div className='relative top-36 ml-36 mr-16'>
          Hello
      </div>   
    </>
  );
}

export default Product;
