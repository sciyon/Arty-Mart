import React from "react";
import { Link } from "react-router-dom";

import LOGO from "../images/logoNew.png";

const Navbar = () => {
  return (
    <div className="z-10 w-full h-20 fixed top-0 left-0 flex items-center justify-between px-12 py-12">
      <div className="flex items-center">
       <img
          src={LOGO}
          width="8%"
          height="5%"
          alt="Logo"
          className="mr-3 transition-transform transform-gpu hover:scale-110 hover: drop-shadow-3xl"
        />
        <p className="text-white text-3xl font-bold ml-2 transition-transform transform-gpu hover:text-red-300">
          Arty mArt
        </p>
      </div>
      <div className="hidden md:flex space-x-10">
        <Link
          to="/"
          className="text-white text-1xl font-semibold transition-transform transform-gpu hover:text-red-300"
        >
          Home
        </Link>
        <Link
          to="/Store"
          className="text-white text-1xl font-semibold transition-transform transform-gpu hover:text-red-300"
        >
          Store
        </Link>
        <Link
          to="/Contact"
          className="text-white text-1xl font-semibold transition-transform transform-gpu hover:text-green-200"
        >
          Contacts
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
