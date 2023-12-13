import React, { useState } from "react";

import LOGO from "../images/logoNew.png";
import { Bars3Icon } from "@heroicons/react/24/solid";


import SearchBar from '../layouts/searchBar.jsx'; 
import Sidebar from "./sidebar.jsx";
import Login from "./LoginModal.jsx";
import Register from "./RegisterModal.jsx";

const SignedOut = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)

  return (
    <div>
      {/* Sidebar component */}
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={setSidebarOpen} />

      {/* Main content */}
      <div className="fixed top-0 left-0 z-10 w-full flex items-center justify-between pl-5 pr-8 py-2 border-b-2 border-tier4 bg-tier1 opacity-75">
        <div className="flex items-center">
         {/* Burger menu icon */}
          <button onClick={() => setSidebarOpen(!sidebarOpen)}><Bars3Icon className="w-8 h-8 mr-6 hover:text-red-300"/></button> 
          <img
            src={LOGO}
            width="3%"
            height="3%"
            alt="Logo"
            className="mr-3 transition-transform transform-gpu hover:scale-110 hover:drop-shadow-3xl"
          />
          <p className="text-white text-2xl font-bold ml-2 transition-transform transform-gpu hover:text-red-300">
            Arty mArt
          </p>
          <SearchBar />
        </div>
        <div className="text-white text-1xl font-semibold transition-transform transform-gpu" onClick={() => console.log("click")}>
          <button onClick={() => setOpen(true)} className="mr-6 hover:text-red-300">Login</button>
            <Login isOpen={open} onClose={() => setOpen(false)}>
              Login
            </Login>
          <button onClick={() => setOpen2(true)} className="mr-6 hover:text-red-300">Register</button>
            <Register isOpen={open2} onClose={() => setOpen2(false)}>
              Register
            </Register>
        </div>
      </div>
    </div>
  );
};

export default SignedOut;
