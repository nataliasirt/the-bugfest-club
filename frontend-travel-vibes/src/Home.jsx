import React, { useState } from "react";
import { Link } from "react-router-dom";
import beachSunset from "./assets/images/beach-sunset.jpg";

const FormContent = ({ isMobile }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div
      className={`bg-white/95 backdrop-blur-sm rounded-[25px] border border-gray-200 shadow-lg p-${
        isMobile ? 6 : 8
      } w-full ${isMobile ? "" : "sm:rounded-l-[25px]"}`}
    >
      <h1
        className={`font-bold text-gray-800 mb-${
          isMobile ? 2 : 3
        } text-center ${isMobile ? "text-2xl" : "text-4xl"}`}
      >
        Travel for how you want to feel, not where you want to go
      </h1>
      <p
        className={`text-gray-600 text-center mb-${isMobile ? 4 : 6} ${
          isMobile ? "" : "text-lg"
        }`}
      >
        Discover destinations that match your desired emotional experiences. No
        more decision overload, just personalized travel based on your vibe.
      </p>
      <div className={`flex items-center space-x-${isMobile ? 2 : 3}`}>
        <Link to="/create-trip">
          <button
            type="button"
            className={`bg-teal-600 text-white rounded-full font-semibold hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 shadow-md ${
              isMobile ? "px-5 py-2 text-sm" : "px-6 py-3 text-base"
            }`}
          >
            Create Trip ✨
          </button>
        </Link>
        <label htmlFor="search" className="sr-only">
          Search destinations
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          className={`w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
            isMobile ? "p-2" : "p-3 text-lg"
          }`}
        />
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-100 flex items-center justify-center p-4">
      <div className="flex items-center justify-center w-full max-w-[1280px] space-x-4 sm:space-x-8">
        <div className="hidden sm:block w-1/2 h-[600px] overflow-hidden">
          <img
            src={beachSunset}
            alt="Serene beach sunset"
            className="w-full h-full object-contain rounded-[50px]"
          />
        </div>

        <div className="w-full sm:w-[600px]">
          <FormContent isMobile={false} />
        </div>
      </div>

      <div className="block sm:hidden mt-4 w-full">
        <div className="w-full h-[300px] overflow-hidden mb-4">
          <img
            src={beachSunset}
            alt="Serene beach sunset"
            className="w-full h-full object-contain rounded-[50px]"
          />
        </div>
        <FormContent isMobile={true} />
      </div>
    </div>
  );
};

export default Home;
