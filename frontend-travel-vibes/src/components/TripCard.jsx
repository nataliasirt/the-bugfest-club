import React from "react";
import { Link } from "react-router-dom";

const TripCard = () => {
  return (
    <div className="max-w-lg mx-auto my-4">
      {" "}
      {/*main card*/}
      <div className="flex border border-gray-200 rounded-lg bg-white">
        {" "}
        {/*main card*/}
        <div className="w-1/3 bg-gray-200 flex items-center justify-center">
          {" "}
          {/*left side*/}
          <div className="text-gray-400 text-center p-4">
            {" "}
            {/* image */}
            Image
          </div>
        </div>
        {/*right side */}
        <div className="text-gray-400 text-center p-4">
          {/*title*/}
          <h2 className="text-xl font-medium mb-1">
            Connect with the Ancients
          </h2>
          {/* location - City, Country*/}
          <p className="text-gray-500 text-sm mb-2">Kyoto,Japan</p>
          {/* description */}
          <p className="text-gray-500 mb-4">
            Ancient temples, traditional gardens, and peaceful mountain views
            create a serene cultural experience.
          </p>
          {/* Tags */}
          <div className="flex mb-4">
            <span className="bg-gray-100 text-sm mr-2 px-2 py-1 rounded-full">
              Connected
            </span>
            <span className="bg-gray-100 text-sm mr-2 px-2 py-1 rounded-full">
              Two weeks
            </span>
            <span className="bg-gray-100 text-sm px-2 py-1 rounded-full">
              Solo
            </span>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button className="border border-gray-300 px-3 py-1 rounded-full">
              Save
            </button>

            <button className="bg-black text-white px-3 py-1 rounded-md">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
