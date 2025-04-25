import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = ({ authenticated, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="w-screen bg-teal-500 shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="w-screen px-6 py-4 flex justify-between items-center">
        {/* Logo and Brand Name */}
        <Link to="/" className="flex items-center">
          <svg
            className="w-8 h-8 mr-2 text-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M22 12L2 18L8 12L2 6L22 12Z" fill="currentColor" />
          </svg>
          <span className="text-2xl font-extrabold text-white">VibeTravel</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/create-trip"
            className="text-white text-base font-medium hover:text-teal-100 transition-colors"
          >
            Create Trip
          </Link>
          <Link
            to="/explore"
            className="text-white text-base font-medium hover:text-teal-100 transition-colors"
          >
            Explore
          </Link>
          <Link
            to="/favorites"
            className="text-white text-base font-medium hover:text-teal-100 transition-colors"
          >
            Favorites
          </Link>
          {authenticated ? (
            <>
              <Link
                to="/profile"
                className="text-white text-base font-medium hover:text-teal-100 transition-colors"
              >
                Profile
              </Link>
              <button
                onClick={onLogout}
                className="text-gray-800 text-base font-medium hover:text-gray-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-white text-base font-medium hover:text-teal-100 transition-colors"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-teal-300 border-t border-teal-400 w-screen">
          <div className="px-6 py-4 flex flex-col space-y-4">
            <Link
              to="/create-trip"
              className="text-white text-base font-medium hover:text-teal-100 transition-colors"
              onClick={toggleMobileMenu}
            >
              Create Trip
            </Link>
            <Link
              to="/explore"
              className="text-white text-base font-medium hover:text-teal-100 transition-colors"
              onClick={toggleMobileMenu}
            >
              Explore
            </Link>
            <Link
              to="/favorites"
              className="text-white text-base font-medium hover:text-teal-100 transition-colors"
              onClick={toggleMobileMenu}
            >
              Favorites
            </Link>
            {authenticated ? (
              <>
                <Link
                  to="/profile"
                  className="text-white text-base font-medium hover:text-teal-100 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    onLogout();
                    toggleMobileMenu();
                  }}
                  className="text-gray-800 text-base font-medium hover:text-gray-600 transition-colors text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-white text-base font-medium hover:text-teal-100 transition-colors"
                onClick={toggleMobileMenu}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;