import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import SignedIn from '../layouts/signedin.jsx';

const Transaction = () => {
  const [activeColumn, setActiveColumn] = useState('Pending');

  const handleColumnClick = (column) => {
    // Add your logic to handle column clicks and update the activeColumn state
    setActiveColumn(column);
  };

  const renderContent = () => {
    switch (activeColumn) {
      case 'Pending':
        return <div>Content for Pending Transactions</div>;
      case 'Completed':
        return <div>Content for Completed Transactions</div>;
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
            className={`flex-1 ml-8 uppercase cursor-pointer text-lg font-medium text-center ${activeColumn === 'Pending' ? 'text-tier3' : ''}`}
            onClick={() => handleColumnClick('Pending')}
          >
            Pending
          </div>
          <div
            className={`flex-1 ml-8 uppercase cursor-pointer text-lg font-medium text-center ${activeColumn === 'Completed' ? 'text-tier3' : ''}`}
            onClick={() => handleColumnClick('Completed')}
          >
            Completed
          </div>
        </div>

        {/* Render content based on the active column */}
        {renderContent()}
      </div>
    </>
  );
};

export default Transaction;
