import React from "react";
import { Link } from "react-router-dom";

import { ShoppingCartIcon, HomeIcon, FireIcon, UserGroupIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { useAuth } from '../backend/middleware/authContext.jsx';
import { useLogoutMutation } from '../backend/connect/usersConnect.ts';

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {

  const { authState } = useAuth();
  const { isLoggedIn } = authState;
  const { logoutUser } = useLogoutMutation();

  const handleIconClick = (e) => {
    if (!sidebarOpen) {
      e.preventDefault();
      toggleSidebar();
    }
  };

  const handleLogout = () => {
    logoutUser(); 
  };  

  return (
    <div
      className={`${
        sidebarOpen
          ? "w-44 transition-width duration-300"
          : "w-20 transition-width duration-300"
      } fixed top-14 left-0 z-10 h-screen bg-tier1 transform-gpu border-r-2 border-tier4 opacity-75`}
    >
      <Link to="/" className="flex items-center pl-5 mb-6 mt-6 hover:bg-tier4">
        <div className={`h-14 flex items-center`}>
          <HomeIcon className={`h-8 w-8 text-white cursor-pointer hover:scale-90 hover:text-red-300 mr-5`} />
          {sidebarOpen && (
            <h5 className={`transition-opacity duration-300`}>Home</h5>
          )}
        </div>
      </Link>
      <Link to="/Store" className="flex items-center pl-5 mb-6 hover:bg-tier4">
        <div className="h-14 flex items-center">
          <ShoppingCartIcon className="h-8 w-8 text-white cursor-pointer hover:scale-90 hover:text-red-300 mr-5" />
          {sidebarOpen && (
            <h5 className={`transition-opacity duration-300`}>Store</h5>
          )}
        </div>
      </Link>
      <Link to="/Trending" className="flex items-center pl-5 mb-6 hover:bg-tier4">
        <div className="h-14 flex items-center">
          <FireIcon className="h-8 w-8 text-white cursor-pointer hover:scale-90 hover:text-red-300 mr-5" />
          {sidebarOpen && (
            <h5 className={`transition-opacity duration-300`}>Trending</h5>
          )}
        </div>
      </Link>
      <Link to="/Social" className="flex items-center pl-5 mb-6 hover:bg-tier4">
        <div className="h-14 flex items-center">
          <UserGroupIcon className="h-8 w-8 text-white cursor-pointer hover:scale-90 hover:text-red-300 mr-5" />
          {sidebarOpen && (
            <h5 className={`transition-opacity duration-300`}>Social</h5>
          )}
        </div>
      </Link>
      {isLoggedIn ? (
          <div className="absolute h-14 flex items-center pl-5 bottom-20">
            <ArrowLeftOnRectangleIcon 
              className="h-8 w-8 text-white cursor-pointer hover:scale-90 hover:text-red-300 mr-5" 
              onClick={handleLogout}
            />
            {sidebarOpen && (
              <h5 className={`transition-opacity duration-300`}>Logout</h5>
            )}
          </div>
      ) : null}
    </div>
  );
};

export default Sidebar;
