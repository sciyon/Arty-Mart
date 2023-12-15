import React, { useState } from "react";
import { Link } from "react-router-dom";

import LOGO from "../images/logoNew.png";
import { Bars3Icon, UserCircleIcon, TruckIcon } from "@heroicons/react/24/solid";
import { TERipple } from "tw-elements-react";

import SearchBar from './SearchBar.jsx';
import Sidebar from "./Sidebar.jsx";
import Profile from "./ProfileModal.jsx";

const SignedIn = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

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
        <div className="hidden md:flex space-x-10">
          <button className="hover:text-red-300">
            <Link to="/Product" type="button"> {/* This is just a skeleton of a product, will be removed kung naa nay backend*/}
              Product
            </Link>
          </button>
          <button onClick={() => setOpen4(true)} className="hover:text-red-300">
            <Link to="/Transaction" type="button">
              <TruckIcon className="w-10 h-10 pt-1 hover:scale-90 hover:text-red-300" />
            </Link>
          </button>
          <button onClick={() => setOpen3(true)} className="hover:text-red-300">
            <UserCircleIcon className="w-8 h-8 hover:scale-90 hover:text-red-300" />
          </button>
            <Profile isOpen={open3} onClose={() => setOpen3(false)} />
          <TERipple rippleColor="light" className="w-full flex justify-center items-center">
            <Link
              className="inline-block rounded border-2 hover:scale-90 border-danger px-10 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
              to="/Create"
              type="button"
              style={{
                background:
                  "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
              }}
            >
              CREATE
            </Link>
          </TERipple>
        </div>
      </div>
    </div>
  );
};

export default SignedIn;
