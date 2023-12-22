import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { TEInput, TERipple } from 'tw-elements-react';
import { XCircleIcon } from '@heroicons/react/24/solid';

import { useUpdateMutation } from '../backend/connect/usersConnectResolvers.ts';
import { useQuery } from '@apollo/client';
import { GETUSER_QUERY } from '../backend/connect/usersConnectQueries.ts';
import { GETUSERTRANSACTION_QUERY } from '../backend/connect/transactionConnectQueries.ts';
import { GETARTWORKSID_QUERY } from '../backend/connect/artworkConnectQueries.ts';
import { useToasts } from '../toastcontext.jsx';


function TransactionModal({ isOpen, onClose, transacID }) {

  const { showToastPositive, showToastNegative } = useToasts(); 

  const { data } = useQuery(GETUSERTRANSACTION_QUERY, {
    variables: { id: transacID || '' },
  });
  
  const transac = data?.transactionGetFromID;

  const { artwork } = useQuery(GETARTWORKSID_QUERY, {
    variables: { id: transac?.artworkID || '' },
  });
  
  const { buyer } = useQuery(GETUSER_QUERY, {
    variables: { id: transac?.buyerID || '' },
  });  

  
  const { user } = useQuery(GETUSER_QUERY, {
    variables: { id: transac?.artistID || '' },
  });  


  const [artTitle, setArtTitle] = useState("N/A");
  const [buyerFname, setBuyerFname] = useState("N/A");
  const [buyerLname, setBuyerLname] = useState("N/A");
  const [artistFname, setArtistFname] = useState("N/A");
  const [artistLname, setArtistLname] = useState("N/A");
  const [total, setTotal] = useState("N/A");
  const [quantity, setQuantity] = useState("N/A");
  const [address, setAddress] = useState("N/A");
  const status = transac?.status || "N/A";

  const { updateUser } = useUpdateMutation();

  const CloseProfile = () => {  
    onClose();
  };

//   const DeactivateProfile = async () => {
//     await updateUser({
//       variables: {
//         id: userId,
//         updateUserInput: {
//           status: "deactivated",
//         },
//       },
//     });
//     showToastPositive(user?.fname + ' has been deactivated');
//     onClose();
//   };
  
//   const ActivateProfile = async () => {
//     await updateUser({
//       variables: {
//         id: userId,
//         updateUserInput: {
//           status: "activated",
//         },
//       },
//     });
//     showToastPositive(user?.fname + ' has been reactivated');
//     onClose();
//   };
  

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
          <h4 className="mb-6 mt-1 pb-1 text-lg font-semibold text-black">
            {(artwork?.title || artTitle)} 
          </h4>
        </div>
        <form>
          <div className="mb-4 flex space-x-8">
            <div flex-1>
              <p className="mb-1 mt-1 pb-1 text-black">
                Buyer First Name
              </p>
              <TEInput
                type="text"
                placeholder="First name"
                className='text-black'
                value={buyer?.fname || buyerFname}
                readonly
              />
            </div>
            <div flex-1>
              <p className="mb-1 mt-1 pb-1 text-black">
              Buyer Last Name
              </p>
              <TEInput
                type="text"
                placeholder="Last name"
                className='text-black'
                value={buyer?.lname || buyerLname}
                readOnly  
              />
            </div>
          </div>
          <div className='mb-4 flex space-x-8'>
            <div flex-1>
              <p className="mb-1 mt-1 pb-1 text-black">
              Artist First Name
              </p>
              <TEInput
                type="text"
                placeholder="First name"
                className='text-black'
                value={user?.fname || artistFname}
                readonly
              />
            </div>
            <div flex-1>
              <p className="mb-1 mt-1 pb-1 text-black">
              Artist Last Name
              </p>
              <TEInput
                type="text"
                placeholder="Last name"
                className='text-black'
                value={user?.lname || artistLname}
                readOnly  
              />
            </div>
          </div>
          <div className="mb-4">
            <div flex-1>
              <p className="mb-1 mt-1 pb-1 text-black">
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
          <div className='mb-4 flex space-x-8'>
           <div flex-1>
              <p className="mb-1 mt-1 pb-1 text-black">
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
              <p className="mb-1 mt-1 pb-1 text-black">
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
            {/* <TERipple rippleColor="light" className="w-full">
                {status === 'activated' ? (
                <button
                    className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                    type="button"
                    onClick={DeactivateProfile}
                    style={{
                    background:
                        'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                    }}
                >
                    PENDING
                </button>
                ) : (
                <button
                    className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                    type="button"
                    onClick={ActivateProfile}
                    style={{
                    background:
                        'linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))',
                    }}
                >
                    COMPLETED
                </button>
                )}
            </TERipple> */}
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default TransactionModal;
