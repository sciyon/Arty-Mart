import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

import AdminSignedIn from '../layouts/AdminSignedin.jsx';

const AdminDashboard = () => {

  return (
    <>   
      <AdminSignedIn />
      <div className='relative w-100% h-20 bg-tier2 top-14 flex justify-center items-center'>
        Dashboard
      </div>
    </>
  );
}

export default AdminDashboard;