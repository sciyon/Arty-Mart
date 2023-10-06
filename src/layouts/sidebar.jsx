import React from "react";
import { Link } from "react-router-dom";

import Home from "../images/home.svg";
import Store from "../images/shopping-cart.svg";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <div
      className={`${
        sidebarOpen
          ? "w-72 transition-width duration-300"
          : "w-16 transition-width duration-300"
      } fixed top-14 left-0 z-10 h-screen bg-tier1 transform-gpu border-r-2 border-tier4 opacity-75`}
    >
      {/* Sidebar content */}
      <div className={`hover:bg-tier4 h-14`}>
        <Link to="/" className="flex items-center pl-5 pt-5">
          <img
            src={Home}
            width="20"
            height="20"
            className="cursor-pointer hover:scale-90"
          />
          <h1 className={`ml-8 ${!sidebarOpen ? 'invisible' : ''} transition-opacity duration-300`}>Home</h1>
        </Link>
      </div>
      <div className="hover:bg-tier4 h-14">
        <Link to="/Store" className="flex items-center pl-5 pt-5">
          <img
            src={Store}
            width="20"
            height="20"
            className="cursor-pointer hover:scale-90"
          />
          <h1 className={`ml-8 ${!sidebarOpen ? 'invisible' : ''} transition-opacity duration-300`}>Store</h1>
        </Link>
      </div>
      {/* Add more sidebar links here */}
    </div>
  );
};

export default Sidebar;
