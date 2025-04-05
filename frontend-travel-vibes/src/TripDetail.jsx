import React from "react";
import { Link } from "react-router-dom";

const TripDetail = () => {
  return (
    <div className="max-w-4xl mx-auto overflow-hidden border bg-white">
      <div className="px-20 py-10">
        {/* Top tag */}
        <div className="flex mb-4">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            Adventure {/* From User Form: Vibe */}
          </span>
        </div>

        <div className="flex flex-col md:flex-row p-5 md:gap-8">
          {/* Left side - Description */}
          <div className="w-full mb-6 md:w-3/5 md:mb-0">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Lush rainforests, wildlife encounters, and adventure activities in
              a sustainable paradise. {/* Trip Title - from OpenAI */}
            </h2>
            <p className="text-gray-600 mb-4">
              Costa Rica offers the perfect blend of adventure and relaxation in
              a biodiverse natural setting.{" "}
              {/* Trip Description (short) - from OpenAI */}
            </p>

            <p className="text-gray-600 mb-6">
              Costa Rica is a rugged, rainforested Central American country with
              coastlines on the Caribbean and Pacific. Though its capital, San
              Jose, is home to cultural institutions like the Pre-Columbian Gold
              Museum, Costa Rica is known for its beaches, volcanoes, and
              biodiversity. Roughly a quarter of its area is made up of
              protected jungle, teeming with wildlife including spider monkeys
              and quetzal birds.{" "}
              {/* Trip Description (long) - from OpenAI - can keep or not */}
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Top Activities {/* Activities - from OpenAI */}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600 mb-3">
                <span className="mr-2">⭐</span>
                <span>Zip-lining through rainforest canopies</span>
              </li>
              <li className="flex items-center text-gray-600 mb-3">
                <span className="mr-2">⭐</span>
                <span>Wildlife spotting in national parks</span>
              </li>
              <li className="flex items-center text-gray-600 mb-3">
                <span className="mr-2">⭐</span>
                <span>Surfing on Pacific beaches</span>
              </li>
              <li className="flex items-center text-gray-600 mb-3">
                <span className="mr-2">⭐</span>
                <span>Relaxing in natural hot springs</span>
              </li>
            </ul>
          </div>

          {/* Right side - Trip Details */}
          <div className="width-full md:w-2/5">
            <div className=" bg-gray-50 p-5 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Plan Your Trip
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Essential information to help you plan
              </p>

              <div className="mb-6">
                <div className="font-medium mb-1">
                  <div>
                    <h4 className="font-medium text-gray-800">
                      Best Time to Visit:
                    </h4>{" "}
                    {/* Time to visit - from OpenAI - limited to seasons */}
                    <p className="text-sm text-gray-600 mb-3">Winter</p>
                  </div>
                </div>

                <div className="font-medium mb-1">
                  <div>
                    <h4 className="font-medium text-gray-800">Duration:</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Extended Weekend
                    </p>{" "}
                    {/* Duration - from User Form */}
                  </div>
                </div>

                <div className="font-medium mb-1">
                  <div>
                    <h4 className="font-medium text-gray-800">Budget:</h4>
                    <p className="text-sm text-gray-600 mb-3">Mid Range</p>{" "}
                    {/* Budget - from user form */}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 mt-6">
                <button className="flex-1 py-2  rounded-lg hover:bg-gray-500 flex items-center justify-center text-white">
                  <span className="mr-2">Save</span>
                </button>
                <button className="flex-1 py-2  rounded-lg hover:bg-gray-500  flex items-center justify-center text-white">
                  <span className="mr-2">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetail;
