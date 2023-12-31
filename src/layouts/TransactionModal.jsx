import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { TEInput, TERipple } from 'tw-elements-react';
import { XCircleIcon } from '@heroicons/react/24/solid';
import defaultProfile from '../images/defaultProfile.jpg'; //Skeleton rani na image, we make it dynamic soon lezgo

import { transactionUpdateMutation } from '../backend/connect/transactionConnectResolvers.ts';
import { useAuth } from '../backend/middleware/authContext.jsx';
import { useQuery } from '@apollo/client';
import { GETUSER_QUERY } from '../backend/connect/usersConnectQueries.ts';
import { GETUSERTRANSACTION_QUERY } from '../backend/connect/transactionConnectQueries.ts';
import { GETARTWORKSID_QUERY } from '../backend/connect/artworkConnectQueries.ts';
import { useToasts } from '../toastcontext.jsx';


function TransactionModal({ isOpen, onClose, transacID }) {

  const { showToastPositive, showToastNegative } = useToasts(); 
  const { authState } = useAuth();
  const { isLoggedIn, user } = authState;


  const { data } = useQuery(GETUSERTRANSACTION_QUERY, {
    variables: { id: transacID || '' },
  });
  
  const transac = data?.transactionGetFromID;

  const { data: { artworkGetByID: artwork } = {} } = useQuery(GETARTWORKSID_QUERY, {
    variables: { id: transac?.artworkID || '' },
  });

  
  const { data: { userGet: buyer } = {} } = useQuery(GETUSER_QUERY, {
    variables: { id: transac?.buyerID || '' },
  });
  
  const { data: { userGet: user2 } = {} } = useQuery(GETUSER_QUERY, {
    variables: { id: transac?.artistID || '' }, 
  });
    
  const [artTitle, setArtTitle] = useState("N/A");
  const [buyerFname, setBuyerFname] = useState("N/A");
  const [buyerLname, setBuyerLname] = useState("N/A");
  const [buyerEmail, setEmail] = useState("N/A");
  const [artistFname, setArtistFname] = useState("N/A");
  const [artistLname, setArtistLname] = useState("N/A");
  const [artistEmail, setArtistEmail] = useState("N/A"); 
  const [total, setTotal] = useState("N/A");
  const [quantity, setQuantity] = useState("N/A");
  const [address, setAddress] = useState("N/A");
  const status = transac?.status || "N/A";

  const { updateTransaction } = transactionUpdateMutation();

  const CloseProfile = () => {  
    onClose();
  };

  const DeactivateTransac = async () => {
    if(user?._id != transac?.artistID){
      await updateTransaction({
        variables: {
          id: transac._id,
          updateTransactionInput: {
            status: "Completed",
          },
        },
      });
      showToastPositive(artwork?.title + ' transaction has been completed');
      onClose();
    } else {
      showToastNegative('User cannot edit his own transactions');
      onClose();
    }
  };
  
  const ActivateTransac = async () => {
    if(user?._id != transac?.artistID){
      await updateTransaction({
        variables: {
          id: transac._id,
          updateTransactionInput: {
            status: "Pending",
          },
        },
      });
      showToastNegative(artwork?.title + '  transaction is still pending');
      onClose();
    } else {
      showToastNegative('User cannot edit his own transactions');
      onClose();
    }
  };
  

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80"></div>
      <div className="z-10 w-full max-w-md p-4 bg-white rounded-2xl shadow-md relative">
        <button
          className="absolute top-2 right-2 text-white text-1xl font-semibold transition-transform transform-gpu hover:text-red-300"
          onClick={CloseProfile}
        >
          <XCircleIcon className="w-8 h-8 text-red-400 hover:text-red-600" />
        </button>
        <div className="text-center">
          <h4 className=" mt-1 pb-1 text-lg font-semibold text-black">
            {(artwork?.title || artTitle)} 
          </h4>
          <img
            src={`https://res.cloudinary.com/dyqbjfpka/image/upload/${artwork?.imageURL}.jpg`}
            className='h-48 w-full object-cover rounded-2xl border-2 border-tier4 '
            alt='Artwork Image'
          />
        </div>
        <form>
          <div className=" flex space-x-8">
            <div flex-1>
              <p className=" mt-1 pb-1 text-black">
                Buyer Full Name
              </p>
              <TEInput
                type="text"
                placeholder="First name"
                className='text-black'
                value={(buyer?.fname ? buyer?.fname + ' ' : '') + (buyer?.lname || '') || (buyerFname + ' ' + buyerLname)}
                readonly
              />
            </div>
            <div flex-1>
              <p className=" mt-1 pb-1 text-black">
              Buyer Email
              </p>
              <TEInput
                type="text"
                placeholder="Last name"
                className='text-black'
                value={buyer?.email || buyerEmail}
                readOnly  
              />
            </div>
          </div>
          <div className=' flex space-x-8'>
            <div flex-1>
              <p className=" mt-1 pb-1 text-black">
              Artist Full Name
              </p>
              <TEInput
                type="text"
                placeholder="First name"
                className='text-black'
                value={(user2?.fname ? user2?.fname + ' ' : '') + (user2?.lname || '') || (artistFname + ' ' + artistLname)}
                readonly
              />
            </div>
            <div flex-1>
              <p className=" mt-1 pb-1 text-black">
              Artist Last Name
              </p>
              <TEInput
                type="text"
                placeholder="Last name"
                className='text-black'
                value={user2?.email || artistEmail}
                readOnly  
              />
            </div>
          </div>
          <div className="">
            <div flex-1>
              <p className=" mt-1 pb-1 text-black">
              Address
              </p>
              <TEInput
                type="text"
                placeholder="First name"
                className='text-black'
                value={transac?.address || address}
                readonly
              />
            </div>
          </div>
          <div className=' flex space-x-8 mb-3'>
           <div flex-1>
              <p className=" mt-1 pb-1 text-black">
              Total
              </p>
              <TEInput
                type="text"
                placeholder="First name"
                className='text-black'
                value={transac?.total || total}
                readonly
              />
            </div>
            <div flex-1>
              <p className=" mt-1 pb-1 text-black">
              Quantity
              </p>
              <TEInput
                type="text"
                placeholder="Last name"
                className='text-black'
                value={transac?.quantity || quantity}
                readOnly  
              />
            </div>
           </div>
          <div className="flex justify-end">
            <TERipple rippleColor="light" className="w-full">
                {transac?.status === 'Pending' ? (
                <button
                    className=" inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                    type="button"
                    onClick={DeactivateTransac}
                    style={{
                    background:
                        'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                    }}
                >
                    PENDING
                </button>
                ) : (
                <button
                    className=" inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                    type="button"
                    onClick={ActivateTransac}
                    style={{
                    background:
                        'linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))',
                    }}
                >
                    COMPLETED
                </button>
                )}
            </TERipple>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default TransactionModal;
