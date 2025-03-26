import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="w-full max-w-[1280px] flex justify-between items-center py-4 border-b border-gray-300 fixed top-0 left-0 right-0 bg-white z-10">
      <Link to="/" className="flex items-center">
        <div className="w-6 h-6 bg-gray-800 rounded-full mr-2"></div>
        <span className="text-xl font-bold text-gray-800">VibeTravel</span>
      </Link>
      <div className="space-x-4">
        <Link to="/create-trip" className="text-blue-600 hover:underline">
          Create Trip
        </Link>
        <Link to="/explore" className="text-blue-600 hover:underline">
          Explore
        </Link>
        <a href="/about" className="text-blue-600 hover:underline">
          About
        </a>
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
