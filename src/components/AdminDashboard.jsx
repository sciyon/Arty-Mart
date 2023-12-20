import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

import AdminSignedIn from '../layouts/AdminSignedin.jsx';

import chessOceanBG from '../images/chessOceanBG.jpg';

const AdminDashboard = () => {

  return (
    <>   
      <AdminSignedIn />
      <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${chessOceanBG})`, filter: 'brightness(75%)' }} />

    </>
  );
}

export default AdminDashboard;