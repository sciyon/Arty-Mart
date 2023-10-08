import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ShoppingCartIcon, HomeIcon} from "@heroicons/react/24/solid";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const handleIconClick = (e) => {
    if (!sidebarOpen) {
      e.preventDefault();
      toggleSidebar();
    }
  };

  return (
    <div
      className={`${
        sidebarOpen
          ? "w-64 transition-width duration-300"
          : "w-20 transition-width duration-300"
      } fixed top-14 left-0 z-10 h-screen bg-tier1 transform-gpu border-r-2 border-tier4 opacity-75`}
    >
      <Link to="/" className="flex items-center pl-5 hover:bg-tier4">
        <div className={`h-14 flex items-center`}>
          <HomeIcon className={`h-8 w-8 text-white cursor-pointer hover:scale-90 hover:text-red-300 mr-5`} />
          {sidebarOpen && (
            <h5 className={`transition-opacity duration-300`}>Home</h5>
          )}
        </div>
      </Link>
      <Link to="/Store" className="flex items-center pl-5 hover:bg-tier4">
      <div className="h-14 flex items-center">
          <ShoppingCartIcon className="h-8 w-8 text-white cursor-pointer hover:scale-90 hover:text-red-300 mr-5" />
          {sidebarOpen && (
            <h5 className={`transition-opacity duration-300`}>Store</h5>
          )}
      </div>
      </Link>
    </div>
  );
};

export default Sidebar;
