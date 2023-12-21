import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useUpdateMutation } from '../backend/connect/usersConnectResolvers.ts';
import { useQuery } from '@apollo/client';
import { GETUSER_QUERY } from '../backend/connect/usersConnectQueries.ts';
import { GETALLUSER_QUERY } from '../backend/connect/usersConnectQueries.ts';

import { TEInput, TERipple } from 'tw-elements-react';
import { XCircleIcon } from '@heroicons/react/24/solid';

function AdminUsersModal({ isOpen, onClose, userId }) {

  const { data, refetch } = useQuery(GETUSER_QUERY, {
    variables: { id: userId || '' },
  });

  const user = data?.userGet;

  const [email, setEmail] = useState("N/A");
  const [firstname, setFirstName] = useState("N/A");
  const [lastname, setLastName] = useState("N/A");
  const [gender, setGender] = useState("N/A");
  const [role, setRole] = useState("N/A");
  const [birthdate, setBirthDate] = useState("N/A");
  const [createdon, setCreatedOn] = useState("N/A");
  const status = user?.status || "N/A";

  const { updateUser } = useUpdateMutation();

  const CloseProfile = () => {  
    onClose();
  };

  const DeactivateProfile = async () => {
    await updateUser({
      variables: {
        id: userId,
        updateUserInput: {
          status: "deactivated",
        },
      },
      refetchQueries: [
        { query: GETUSER_QUERY, variables: { id: userId } },
        { query: GETALLUSER_QUERY, variables: { limit: 100 } },
      ],
    });
    onClose();
  };
  
  const ActivateProfile = async () => {
    await updateUser({
      variables: {
        id: userId,
        updateUserInput: {
          status: "activated",
        },
      },
      refetchQueries: [
        { query: GETUSER_QUERY, variables: { id: userId } },
        { query: GETALLUSER_QUERY, variables: { limit: 100 } },
      ],
    });
    onClose();
  };
  

  useEffect(() => {
    refetch();
  }, [user, refetch]);

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
            {(user?.fname || firstname) + ' ' + (user?.lname || lastname) + ' Profile'} 
          </h4>
        </div>
        <form>
          <div className="mb-4">
            <p className="mb-1 mt-1 pb-1 text-black">
              Email
            </p>
            <TEInput
                type="text"
                placeholder="First name"
                className='text-black'
                value={user?.email || firstname}
                readonly
            />
          </div>
          <div className="mb-4 flex space-x-8">
            <div flex-1>
              <p className="mb-1 mt-1 pb-1 text-black">
                First Name
              </p>
              <TEInput
                type="text"
                placeholder="First name"
                className='text-black'
                value={user?.fname || firstname}
                readonly
              />
            </div>
            <div flex-1>
              <p className="mb-1 mt-1 pb-1 text-black">
                Last Name
              </p>
              <TEInput
                type="text"
                placeholder="Last name"
                className='text-black'
                value={user?.lname || lastname}
                readOnly  
              />
            </div>
          </div>
          <div className="mb-4">
            <p className="mb-1 mt-1 pb-1 text-black">
              Birth Date
            </p>
            <TEInput
                type="text"
                placeholder="First name"
                className='text-black'
                value={user?.birthDate || birthdate}
                readonly
            />
          </div>
          <div className="mb-4 flex space-x-8">
            <div flex-1>
              <p className="mb-1 mt-1 pb-1 text-black">
                Gender
              </p>
              <TEInput
                type="text"
                placeholder="First name"
                className='text-black'
                value={user?.gender || gender}
                readonly
              />
            </div>
            <div flex-1>
              <p className="mb-1 mt-1 pb-1 text-black">
                Role
              </p>
              <TEInput
                type="text"
                placeholder="Last name"
                className='text-black'
                value={user?.role || role}
                readOnly  
              />
            </div>
          </div>
          <div className="mb-4">
            <p className="mb-1 mt-1 pb-1 text-black">
              Joined On
            </p>
            <TEInput
                type="text"
                placeholder="First name"
                className='text-black'
                value={user?.createdOn || createdon}
                readonly
            />
          </div>
          <div className="flex justify-end">
            <TERipple rippleColor="light" className="w-full">
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
                    DEACTIVATE
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
                    ACTIVATE
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

export default AdminUsersModal;
