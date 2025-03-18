import React from "react";
import { Link } from "react-router-dom"; 
import beachSunset from "./assets/images/beach-sunset1.svg";

const Home = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Navigation Bar */}
      <nav className="w-full max-w-[1280px] flex justify-between items-center py-4 border-b border-gray-300 fixed top-0 left-0 right-0 bg-white z-10">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-800 rounded-full mr-2"></div>
          <span className="text-xl font-bold text-gray-800">VibeTravel</span>
        </div>
        <div className="space-x-4">
          <Link to="/create-trip" className="text-blue-600 hover:underline">
            Create Trip
          </Link>
          <a href="/search" className="text-blue-600 hover:underline">
            Search
          </a>
          <a href="/about" className="text-blue-600 hover:underline">
            About
          </a>
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </div>
      </nav>

      {/* Main Content Layout */}
      <div className="flex items-center justify-center w-full max-w-[1280px] mt-20 space-x-4 sm:space-x-8">
        {/* Left Side - SVG Image */}
        <div className="w-1/2 h-[600px] overflow-hidden hidden sm:block">
          <img
            src={beachSunset}
            alt="Serene beach sunset"
            className="w-full h-full object-contain rounded-[50px] max-w-full max-h-full"
          />
        </div>

        {/* Right Side - Form */}
        <div className="bg-white rounded-[25px] border border-gray-300 shadow-lg p-8 w-[600px] sm:rounded-l-[25px]">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 text-center">
            Travel for how you want to feel, not where you want to go
          </h1>
          <p className="text-lg text-gray-600 text-center mb-6">
            Discover destinations that match desired emotional experiences.
            No more decision overload, just personalized travel based on your
            vibe.
          </p>

          <div className="flex items-center space-x-3">
            <Link to="/create-trip">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md">
                Create Trip ✨
              </button>
            </Link>
            <input
              type="text"
              placeholder="Search"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>
        </div>
      </div>

      {/* Stack on Mobile */}
      <div className="block sm:hidden mt-4">
        <div className="w-full h-[300px] overflow-hidden mb-4">
          <img
            src={beachSunset}
            alt="Serene beach sunset"
            className="w-full h-full object-contain rounded-[50px] max-w-full max-h-full"
          />
        </div>
        <div className="bg-white rounded-[25px] border border-gray-300 shadow-lg p-6 w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Travel for how you want to feel, not where you want to go
          </h1>
          <p className="text-gray-600 text-center mb-4">
            Discover destinations that match your desired emotional experiences.
            No more decision overload, just personalized travel based on your
            vibe.
          </p>

          <div className="flex items-center space-x-2">
            <Link to="/create-trip">
              <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md">
                Create Trip ✨
              </button>
            </Link>
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;