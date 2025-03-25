import React from "react";
import { Link } from "react-router-dom";

const Explore = () => {
  return (
    <div className="bg-white rounded-[25px] border border-gray-300 shadow-lg p-8 w-[600px] sm:rounded-l-[25px]">
      <h1 className="text-4xl font-bold text-gray-900 mb-3 text-center">
        Discover Your Perfect Vibe
      </h1>
      <p className="text-lg text-gray-600 text-center mb-6">
        Explore destinations by how they make you feel, not just where they are
        on a map.
      </p>
    </div>
  );
};

export default Explore;
