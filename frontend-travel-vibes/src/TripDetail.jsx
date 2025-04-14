import React from "react";
import { useLocation } from "react-router-dom";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  BlueskyShareButton,
  BlueskyIcon,
} from "react-share";

const TripDetail = () => {
  const location = useLocation();
  const currentPageUrl = window.location.href;
  const { tripData, formData } = location.state || {};

  if (!tripData || !formData) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold">No trip data found.</h2>
        <p>Try creating a trip again from the form.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto overflow-hidden border bg-white shadow-md mt-10">
      <div className="px-6 py-10">
        {/* Top Tag */}
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
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Left side - Description */}
          <div className="w-full mb-6 md:w-3/5 md:mb-0">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {tripData?.tripTitle || "Trip Title"} in {tripData?.location || "Trip Location"}
            </h2>
            <p className="text-gray-600 mb-4">{tripData?.description || "Trip Description"}</p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">What To Do</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600 mb-3">
                <span className="mr-2">⭐</span>
                <span>
                  <b>Highlight:</b> {tripData?.topActivity || "Highlight Info"}
                </span>
              </li>
              <li className="flex items-center text-gray-600 mb-3">
                <span className="mr-2">⭐</span>
                <span>
                  <b>Experience:</b> {tripData?.mainAttraction || "Activity Name"}
                </span>
              </li>
              <li className="flex items-center text-gray-600 mb-3">
                <span className="mr-2">⭐</span>
                <span>
                  <b>Vibe-Inspired Spot:</b> {tripData?.vibeInspiration || "Vibe-related highlight"}
                </span>
              </li>
            </ul>
          </div>

          {/* Right side - Trip Details */}
          <div className="w-full md:w-2/5">
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Plan Your Trip</h3>
              <p className="text-sm text-gray-600 mb-4">
                Essential information to help you plan
              </p>

              <div className="mb-6 space-y-3">
                <div>
                  <h4 className="font-medium text-gray-800">From:</h4>
                  <p className="text-sm text-gray-600 mb-1">{formData?.startingLocation}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800">Best Time to Visit:</h4>
                  <p className="text-sm text-gray-600 capitalize">
                    {tripData?.bestTimeToVisit || "Best Time to Visit"}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800">Duration:</h4>
                  <p className="text-sm text-gray-600">
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
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800">Budget:</h4>
                  <p className="text-sm text-gray-600">
                    {formData?.budget === "500"
                      ? "Budget"
                      : formData?.budget === "2000"
                      ? "Mid-Range"
                      : formData?.budget === "5000"
                      ? "Luxury"
                      : "Amount to spend"}
                  </p>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-3 mt-4">
                <EmailShareButton url={currentPageUrl}>
                  <EmailIcon round />
                </EmailShareButton>
                <FacebookShareButton url={currentPageUrl}>
                  <FacebookIcon round />
                </FacebookShareButton>
                <BlueskyShareButton url={currentPageUrl}>
                  <BlueskyIcon round />
                </BlueskyShareButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetail;
