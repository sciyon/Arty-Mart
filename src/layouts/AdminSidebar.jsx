import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import { ClipboardDocumentCheckIcon, PaintBrushIcon, UserCircleIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { useLogoutMutation } from '../backend/connect/usersConnectResolvers.ts';

const AdminSidebar = ({ sidebarOpen, toggleSidebar }) => {

  const navigate = useNavigate(); // Initialize useNavigate
  const { logoutUser } = useLogoutMutation();

  const handleIconClick = (e) => {
    if (!sidebarOpen) {
      e.preventDefault();
      toggleSidebar();
    }
  };

  const handleLogout = () => {
    logoutUser(); 
    navigate('/') 
  };  

  return (
    <div
      className={`${
        sidebarOpen
          ? "w-44 transition-width duration-300"
          : "w-20 transition-width duration-300"
      } fixed top-14 left-0 z-10 h-screen bg-tier1 transform-gpu border-r-2 border-tier4 opacity-75`}
    >
      <Link to="/AdminDashboard" className="flex items-center pl-5 mb-6 mt-6 hover:bg-tier4">
        <div className={`h-14 flex items-center`}>
          <ClipboardDocumentCheckIcon className={`h-8 w-8 text-white cursor-pointer hover:scale-90 hover:text-red-300 mr-5`} />
          {sidebarOpen && (
            <h5 className={`transition-opacity duration-300`}>Dashboard</h5>
          )}
        </div>
      </Link>
      <Link to="/AdminUsers" className="flex items-center pl-5 mb-6 mt-6 hover:bg-tier4">
        <div className={`h-14 flex items-center`}>
          <UserCircleIcon className={`h-8 w-8 text-white cursor-pointer hover:scale-90 hover:text-red-300 mr-5`} />
          {sidebarOpen && (
            <h5 className={`transition-opacity duration-300`}>Users</h5>
          )}
        </div>
      </Link>
      <Link to="/AdminArt" className="flex items-center pl-5 mb-6 mt-6 hover:bg-tier4">
        <div className={`h-14 flex items-center`}>
          <PaintBrushIcon className={`h-8 w-8 text-white cursor-pointer hover:scale-90 hover:text-red-300 mr-5`} />
          {sidebarOpen && (
            <h5 className={`transition-opacity duration-300`}>Artworks</h5>
          )}
        </div>
      </Link>
      <div className="absolute h-14 flex items-center pl-5 bottom-20">
          <ArrowLeftOnRectangleIcon 
            className="h-8 w-8 text-white cursor-pointer hover:scale-90 hover:text-red-300 mr-5" 
            onClick={handleLogout}
          />
          {sidebarOpen && (
            <h5 className={`transition-opacity duration-300`}>Logout</h5>
          )}
      </div>
    </div>
  );
};

export default AdminSidebar;
