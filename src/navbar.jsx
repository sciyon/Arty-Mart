import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="z-10 w-[100%] h-20 fixed top-0 left-0 bg-cover bg-center bg-no-repeat flex items-center justify-between px-12 py-12">
      <div className="flex items-center">
        <p className="text-white text-3xl font-bold ml-2 transition-transform transform-gpu hover:text-green-200">
          Arty mArt
        </p>
      </div>
      <div className="hidden md:flex space-x-10">
        <Link
          to="/"
          className="text-white text-1xl font-semibold transition-transform transform-gpu hover:text-green-200"
        >
          Home
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
