import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { TERipple } from 'tw-elements-react';

import AdminSignedIn from '../layouts/AdminSignedin.jsx';
import { useQuery } from '@apollo/client';
import { GETALLUSER_QUERY } from '../backend/connect/usersConnectQueries.ts';
import AdminUsersModal from "../layouts/AdminUsersModal.jsx";

const AdminUsers = () => {
  const [activeColumn, setActiveColumn] = useState('Pending');
  const [openAdminUsersModal, setOpenAdminUsersModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { data, refetch } = useQuery(GETALLUSER_QUERY, {
    variables: { limit: 100 },
  });

  const userGetLimit = data?.userGetLimit;

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    // After data is fetched, set the active column to 'Activated'
    if (userGetLimit && userGetLimit.length > 0) {
      setActiveColumn('Activated');
    }
  }, [userGetLimit]);

  const handleViewDetails = (userId) => {
    setOpenAdminUsersModal(true);
    setSelectedUserId(userId);
  };

  const handleColumnClick = (column) => {
    setActiveColumn(column);
  };

  const renderContent = () => {
    switch (activeColumn) {
      case 'Activated':
        return (
          <div>
            <div className="mb-1 color-red flex x-4 text-red-400">
              <div className='flex-1 flex items-center uppercase font-medium'>
                FULL NAME
              </div>
              <div className='flex-1 flex items-center uppercase font-medium'>
                EMAIL
              </div>
              <div className='flex-1 flex items-center uppercase font-medium'>
                ROLES
              </div>
              <div className='flex-1 flex items-center uppercase font-medium'>
                DETAILS
              </div>
            </div>
            <div className="flex pl-5 pr-8 py-2 border-b-2 mb-6 border-tier2" />
            {userGetLimit?.map((userData) => (
              <React.Fragment key={userData._id}>
                {/* Add a condition to check if user status is "activated" */}
                {userData.status === 'activated' && (
                  <>
                    <div key={userData._id} className="color-red flex x-4">
                      <div className='flex-1'>
                        {userData.fname}&nbsp;&nbsp;&nbsp;{userData.lname}
                      </div>
                      <div className='flex-1'>
                        {userData.email}
                      </div>
                      <div className='flex-1'>
                        {userData.roles}
                      </div>
                      <div className='flex-1'>
                        {userData.roles === 'user' && (
                          <TERipple rippleColor="light" className="w-1/2 h-2/3">
                            <button
                              className="mb-3 items-center justify-center flex w-1/2 h-2/3 rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                              type="button"
                              onClick={() => handleViewDetails(userData._id)}
                              style={{
                                background: 'linear-gradient(to right, #007BFF, #00BFFF)',
                                width: '100%', // Adjusted width to 100%
                                height: '100%', // Adjusted height to 100%
                              }}
                            >
                              VIEW DETAILS
                            </button>
                          </TERipple>
                        )}
                      </div>
                    </div>
                    <div className="flex pl-5 pr-8 py-2 border-b-2 mb-6 border-tier2" />
                  </>
                )}
              </React.Fragment>
            ))}

            {/* Pass selectedUserId to AdminUsersModal */}
            <AdminUsersModal
              isOpen={openAdminUsersModal}
              onClose={() => setOpenAdminUsersModal(false)}
              userId={selectedUserId}
            ></AdminUsersModal>
          </div>
        );
      case 'Deactivated':
        return (
          <div>
            <div className="mb-1 color-red flex x-4 text-red-400">
              <div className='flex-1 flex items-center uppercase font-medium'>
                FULL NAME
              </div>
              <div className='flex-1 flex items-center uppercase font-medium'>
                EMAIL
              </div>
              <div className='flex-1 flex items-center uppercase font-medium'>
                ROLES
              </div>
              <div className='flex-1 flex items-center uppercase font-medium'>
                DETAILS
              </div>
            </div>
            <div className="flex pl-5 pr-8 py-2 border-b-2 mb-6 border-tier2" />
            {userGetLimit?.map((userData) => (
              <React.Fragment key={userData._id}>
                {/* Add a condition to check if user status is "activated" */}
                {userData.status === 'deactivated' && (
                  <>
                    <div key={userData._id} className="color-red flex x-4">
                      <div className='flex-1'>
                        {userData.fname}&nbsp;&nbsp;&nbsp;{userData.lname}
                      </div>
                      <div className='flex-1'>
                        {userData.email}
                      </div>
                      <div className='flex-1'>
                        {userData.roles}
                      </div>
                      <div className='flex-1'>
                        {userData.roles === 'user' && (
                          <TERipple rippleColor="light" className="w-1/2 h-2/3">
                            <button
                              className="mb-3 items-center justify-center flex w-1/2 h-2/3 rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                              type="button"
                              onClick={() => handleViewDetails(userData._id)}
                              style={{
                                background: 'linear-gradient(to right, #007BFF, #00BFFF)',
                                width: '100%', // Adjusted width to 100%
                                height: '100%', // Adjusted height to 100%
                              }}
                            >
                              VIEW DETAILS
                            </button>
                          </TERipple>
                        )}
                      </div>
                    </div>
                    <div className="flex pl-5 pr-8 py-2 border-b-2 mb-6 border-tier2" />
                  </>
                )}
              </React.Fragment>
            ))}

            {/* Pass selectedUserId to AdminUsersModal */}
            <AdminUsersModal
              isOpen={openAdminUsersModal}
              onClose={() => setOpenAdminUsersModal(false)}
              userId={selectedUserId}
            ></AdminUsersModal>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <AdminSignedIn />
      <div className='relative w-100% h-20 bg-tier2 top-14 flex justify-center items-center'>
        <div className='font-medium uppercase ml-16 text-xl'>
          Users Table
        </div>
      </div>
      <div className='relative ml-36 mr-16 mt-28'>
        {/* Navigation for columns */}
        <div className="flex pl-5 pr-8 py-2 border-b-2 mb-6 border-tier4">
          <div
            className={`flex-1 ml-8 uppercase cursor-pointer text-lg font-medium text-center ${activeColumn === 'Pending' ? 'text-tier3' : ''}`}
            onClick={() => handleColumnClick('Activated')}
          >
            Activated
          </div>
          <div
            className={`flex-1 ml-8 uppercase cursor-pointer text-lg font-medium text-center ${activeColumn === 'Completed' ? 'text-tier3' : ''}`}
            onClick={() => handleColumnClick('Deactivated')}
          >
            Deactivated
          </div>
        </div>

        {/* Render content based on the active column */}
        {renderContent()}
      </div>
    </>
  );
};

export default AdminUsers;
