import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { TERipple } from 'tw-elements-react';

import SignedIn from '../layouts/signedin.jsx';
import { useAuth } from '../backend/middleware/authContext.jsx';
import { useQuery } from '@apollo/client';
import { GETBUYERTRANSACTION_QUERY } from '../backend/connect/transactionConnectQueries.ts';
import { GETARTWORKSID_QUERY } from '../backend/connect/artworkConnectQueries.ts';
import TransactionModal from "../layouts/TransactionModal.jsx";

const Transaction = () => {
  const [activeColumn, setActiveColumn] = useState('Purchases');
  const { authState } = useAuth();
  const { isLoggedIn, user } = authState;
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  const handleColumnClick = (column) => {
    setActiveColumn(column);
  };

  const handleViewDetails = (transacID) => {
    setOpenTransactionModal(true);
    setSelectedTransactionId(transacID);
  };

  const { data, refetch, loading, error } = useQuery(GETBUYERTRANSACTION_QUERY, {
    variables: { buyerID: user?._id || '' },
  });  

  useEffect(() => {
    refetch();
  }, [refetch]);

  const ArtworkTitle = ({ artworkID }) => {
    const { data: data2 } = useQuery(GETARTWORKSID_QUERY, {
      variables: { id: artworkID },
    });
  
    return <p>{data2?.artworkGetByID?.title ?? 'N/A'}</p>;
  };

  const ArtworkCategory = ({ artworkID }) => {
    const { data: data2 } = useQuery(GETARTWORKSID_QUERY, {
      variables: { id: artworkID },
    });
  
    return <p>{data2?.artworkGetByID?.categories ?? 'N/A'}</p>;
  };

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
              <div className='flex-1 flex items-center uppercase font-medium' />
            </div>
            <div className="flex pl-5 pr-8 py-2 border-b-2 mb-6 border-tier2" />
            {data?.transactionGetFromUser ? (
              data.transactionGetFromUser.map((transacData) => (
                <React.Fragment key={transacData._id}>
                    <>
                      <div key={transacData._id} className="color-red flex x-4">
                        <div className='flex-1'>
                          <ArtworkTitle artworkID={transacData.artworkID} />
                        </div>
                        <div className='flex-1'>
                          <ArtworkCategory artworkID={transacData.artworkID} />
                        </div>
                        <div className='flex-1'>
                          <p>{transacData.total ?? 'N/A'}</p>
                        </div>
                        <div className='flex-1'>
                          <p>{transacData.quantity ?? 'N/A'}</p>
                        </div>
                        <div className='flex-1'>
                          <TERipple rippleColor="light" className="w-1/2 h-2/3">
                              <button
                                className="mb-3 items-center justify-center flex w-1/2 h-2/3 rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                type="button"
                                onClick={() => handleViewDetails(transacData._id)}
                                style={{
                                  background: 'linear-gradient(to right, #007BFF, #00BFFF)',
                                  width: '100%',
                                  height: '100%',
                                }}
                              >
                                VIEW DETAILS
                              </button>
                          </TERipple>
                        </div>
                      </div>
                      <div className="flex pl-5 pr-8 py-2 border-b-2 mb-6 border-tier2" />
                    </>
                    <TransactionModal
                      isOpen={openTransactionModal}
                      onClose={() => setOpenAdminUsersModal(false)}
                      transacID={selectedTransactionId}
                    ></TransactionModal>
                </React.Fragment>
              ))
            ) : (
              <p>No data available</p>
            )}
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
