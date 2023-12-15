import React, { useState } from "react";

import LOGO from "../images/logoNew.png";
import { Bars3Icon } from "@heroicons/react/24/solid";

import SearchBar from './SearchBar.jsx'; 
import Sidebar from "./Sidebar.jsx";
import Login from "./LoginModal.jsx";
import Register from "./RegisterModal.jsx";
import LoginAdmin from "./LoginAdminModal.jsx";

const SignedOut = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(0);
  const [openRegister, setOpenRegister] = useState(0);
  const [openLoginAdmin, setOpenLoginAdmin] = useState(0);

  const handleLoginAndRegisterClick = (action) => {

    // 1 - Close the login or register modal
    // 2 - Close the login but open the register
    // 3 - Close the register but open the login
    // 4 - Open the login
    // 5 - Open the Register
    // 6 - Close login and open admin login
    // Do not touch this, if libog ni tanawon ang code, just ask me I have a reasonable explanation for this <3

    switch (action) {
      case 1:
        setOpenLogin(0);
        setOpenLoginAdmin(0)
        setOpenRegister(0);
        break;
      case 2:
        setOpenLogin(0);
        setOpenLoginAdmin(0)
        setOpenRegister(1);
        break;
      case 3:
        setOpenLogin(1);
        setOpenLoginAdmin(0)
        setOpenRegister(0);
        break;
      case 4:
        setOpenLogin(1);
        setOpenLoginAdmin(0)
        setOpenRegister(0);
        break;
      case 5:
        setOpenLogin(0);
        setOpenLoginAdmin(0)
        setOpenRegister(1);
        break;
      case 6:
        setOpenLogin(0);
        setOpenLoginAdmin(1);
        setOpenRegister(0);
        break;
      default:
        setOpenLogin(1);
        setOpenLoginAdmin(1);
        setOpenRegister(1);
        break;
    }
  };

  return (
    <div>
      {/* Sidebar component */}
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={setSidebarOpen} />

      {/* Main content */}
      <div className="fixed top-0 left-0 z-10 w-full flex items-center justify-between pl-5 pr-8 py-2 border-b-2 border-tier4 bg-tier1 opacity-75">
        <div className="flex items-center">
          {/* Burger menu icon */}
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Bars3Icon className="w-8 h-8 mr-6 hover:text-red-300" />
          </button>
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
        <div className="text-white text-1xl font-semibold transition-transform transform-gpu">
          <button onClick={() => handleLoginAndRegisterClick(4)} className="mr-6 hover:text-red-300">
            Login
          </button>
          <Login isOpen={openLogin} onClose={(action) => handleLoginAndRegisterClick(action)}>
            Login
          </Login>
          <button onClick={() => handleLoginAndRegisterClick(5)} className="mr-6 hover:text-red-300">
            Register
          </button>
          <Register isOpen={openRegister} onClose={(action) => handleLoginAndRegisterClick(action)}>
            Register
          </Register>
        </div>

        {/* Invisible functionality for accessing admin login page */}
        <LoginAdmin isOpen={openLoginAdmin} onClose={(action) => handleLoginAndRegisterClick(action)} />
      </div>
    </div>
  );
};

export default SignedOut;
