import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import SignedIn from '../layouts/signedin.jsx';


import { useAuth } from '../backend/middleware/authContext.jsx';
import { useQuery } from '@apollo/client';
import { GETBUYERTRANSACTION_QUERY } from '../backend/connect/transactionConnectQueries.ts';

const Transaction = () => {
  const [activeColumn, setActiveColumn] = useState('Purchases');
  const { authState } = useAuth();
  const { isLoggedIn, user } = authState;

  const handleColumnClick = (column) => {
    setActiveColumn(column);
  };

  const { data, refetch, loading, error } = useQuery(GETBUYERTRANSACTION_QUERY, {
    variables: { buyerID: user?._id || '' },
  });  
  
  
  useEffect(() => {
    refetch();
  }, [refetch]);
  
  useEffect(() => {
    console.log(data);
  }, [data]);
  
  const renderContent = () => {
    switch (activeColumn) {
      case 'Purchases':
        return (
          <div>
            <div className="mb-1 color-red flex x-4 text-red-400">
              <div className='flex-1 flex items-center uppercase font-medium'>
                ART PIECE
              </div>
              <div className='flex-1 flex items-center uppercase font-medium'>
                CATEGORIES
              </div>
              <div className='flex-1 flex items-center uppercase font-medium'>
                PRICE
              </div>
              <div className='flex-1 flex items-center uppercase font-medium'>
                QUANTITIES
              </div>
            </div>
            <div className="flex pl-5 pr-8 py-2 border-b-2 mb-6 border-tier2" />
          </div>
        );
      case 'Sold':
        return <div>Content for Sold Transactions</div>;
      default:
        return null;
    }
  };

  return (
    <>
      <SignedIn />
      <div className='relative w-100% h-20 bg-tier2 top-14 flex justify-center items-center'>
        <div className='font-medium uppercase ml-16 text-xl'>
          Transaction
        </div>
      </div>
      <div className='relative ml-36 mr-16 mt-28'>
        {/* Navigation for columns */}
        <div className="flex pl-5 pr-8 py-2 border-b-2 mb-6 border-tier4">
          <div
            className={`flex-1 ml-8 uppercase cursor-pointer text-lg font-medium text-center ${activeColumn === 'Purchases' ? 'text-tier3' : ''}`}
            onClick={() => handleColumnClick('Purchases')}
          >
            PURCHASES
          </div>
          <div
            className={`flex-1 ml-8 uppercase cursor-pointer text-lg font-medium text-center ${activeColumn === 'Sold' ? 'text-tier3' : ''}`}
            onClick={() => handleColumnClick('Sold')}
          >
            SOLD
          </div>
        </div>

        {/* Render content based on the active column */}
        {renderContent()}
      </div>
    </>
  );
};

export default Transaction;
