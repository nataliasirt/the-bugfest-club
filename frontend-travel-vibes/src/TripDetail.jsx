import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const TripDetail = () => {
  const location = useLocation();
  const { tripData, formData } = location.state || {};
  return (
    <div className="max-w-4xl mx-auto overflow-hidden border bg-white">
      <div className="px-20 py-10">
        {/* Top tag */}
        <div className="flex mb-4">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            The Vibe:{" "}
            {formData?.vibe === "inspired_and_creative"
              ? "Inspired & Creative"
              : formData?.vibe === "refreshed"
              ? "Refreshed"
              : formData?.vibe === "grounded_and_connected"
              ? "Grounded & Connected"
              : formData?.vibe === "accomplished"
              ? "Accomplished"
              : formData?.vibe === "transformed_and_enlightened"
              ? "Transformed & Enlightened"
              : "Your Vibe"}
            {/* From User Form: Vibe */}
          </span>
        </div>

        <div className="flex flex-col md:flex-row p-5 md:gap-8">
          {/* Left side - Description */}
          <div className="w-full mb-6 md:w-3/5 md:mb-0">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {tripData?.tripTitle || "Trip Title"} in{" "}
              {tripData?.location || "Trip Location"}{" "}
              {/* Trip Title - from OpenAI */}
            </h2>
            <p className="text-gray-600 mb-4">
              {tripData?.description || "Trip Description"}{" "}
              {/* Trip Description (short) - from OpenAI */}
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              What To Do {/* Activities - from OpenAI */}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600 mb-3">
                <span className="mr-2">⭐</span>
                <span>
                  <b>Highlight: {} </b>
                  {tripData.topActivities[0].name || "Activity Name"}:{" "}
                  {tripData.topActivities[0].hook || "Activity Description"}
                </span>
              </li>
              <li className="flex items-center text-gray-600 mb-3">
                <span className="mr-2">⭐</span>
                <span>
                  <b>Experience: {} </b>
                  {tripData.topActivities[1].name || "Activity Name"}:{" "}
                  {tripData.topActivities[1].hook || "Activity Description"}
                </span>
              </li>
              <li className="flex items-center text-gray-600 mb-3">
                <span className="mr-2">⭐</span>
                <span>
                  <b>Dine: {} </b>
                  {tripData.restaurantRecommendations[0].name ||
                    "Restaurant Name"}
                  :{" "}
                  {tripData.restaurantRecommendations[0].hook ||
                    "Restaurnat Description"}
                </span>
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
                    <p className="text-sm text-gray-600 mb-3 capitalize">
                      {tripData?.bestTimeToVisit || "Best Time to Visit"}
                    </p>
                  </div>
                </div>

                <div className="font-medium mb-1">
                  <div>
                    <h4 className="font-medium text-gray-800">Duration:</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {formData?.days === "1"
                        ? "Overnight"
                        : formData?.days === "3"
                        ? "Weekend"
                        : formData?.days === "5"
                        ? "Extended Weekend"
                        : formData?.days === "7"
                        ? "Week-long"
                        : formData?.days === "10"
                        ? "Extended"
                        : "Trip Length"}
                    </p>{" "}
                    {/* Duration - from User Form */}
                  </div>
                </div>

                <div className="font-medium mb-1">
                  <div>
                    <h4 className="font-medium text-gray-800">Budget:</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {formData?.budget === "500"
                        ? "Budget"
                        : formData?.budget === "2000"
                        ? "Mid-Range"
                        : formData?.budget === "5000"
                        ? "Luxury"
                        : "Amount to spend"}
                    </p>{" "}
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
