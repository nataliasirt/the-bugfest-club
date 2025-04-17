import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  BlueskyShareButton,
  BlueskyIcon,
} from "react-share";

const Explore = () => {
  const currentPageUrl = window.location.href;
  const [tripPlans, setTripPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchTripsPlans = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/trips/tripPlan"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response);
        const data = await response.json();
        console.log(data);
        setTripPlans(data);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
      }
    };
    fetchTripsPlans();
  }, []);

  //if (loading) return <div className="text-center text-xl">Loading...</div>;

  return (
    <>
      <div className="bg-white p-8 w-[1200px] ">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 text-center">
          Discover Your Perfect Vibe
        </h1>
        <p className="text-lg text-gray-600 text-center mb-6">
          Explore destinations by how they make you feel, not just where they
          are on a map.
        </p>
      </div>
      {tripPlans.length === 0 ? (
        <div className="text-center mt-10">
          <h2 className="text-xl font-semibold">No trip data found.</h2>
          <p>Try creating a trip again from the form.</p>
        </div>
      ) : (
        tripPlans.map((tripPlan) => (
          <div key={tripPlan.id}>
            <div className="max-w-4xl mx-auto overflow-hidden border bg-white shadow-md mt-10">
              <div className="px-6 py-10">
                {/* Top Tag */}
                <div className="flex mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    The Vibe:{" "}
                    {tripPlan?.vibe === "inspired_and_creative"
                      ? "Inspired & Creative"
                      : tripPlan?.vibe === "refreshed"
                      ? "Refreshed"
                      : tripPlan?.vibe === "grounded_and_connected"
                      ? "Grounded & Connected"
                      : tripPlan?.vibe === "accomplished"
                      ? "Accomplished"
                      : tripPlan?.vibe === "transformed_and_enlightened"
                      ? "Transformed & Enlightened"
                      : "Your Vibe"}
                  </span>
                </div>

                <div className="flex flex-col md:flex-row md:gap-8">
                  {/* Left side - Description */}
                  <div className="w-full mb-6 md:w-3/5 md:mb-0">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                      {tripPlan?.tripTitle || "Trip Title"} in{" "}
                      {tripPlan?.location || "Trip Location"}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {tripPlan?.description || "Trip Description"}
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      What To Do
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-600 mb-3">
                        <span className="mr-2">⭐</span>
                        <span>
                          <b>Highlight:</b>{" "}
                          {tripPlan?.topActivity || "Highlight Info"}
                        </span>
                      </li>
                      <li className="flex items-center text-gray-600 mb-3">
                        <span className="mr-2">⭐</span>
                        <span>
                          <b>Experience:</b>{" "}
                          {tripPlan?.mainAttraction || "Activity Name"}
                        </span>
                      </li>
                      <li className="flex items-center text-gray-600 mb-3">
                        <span className="mr-2">⭐</span>
                        <span>
                          <b>Vibe-Inspired Spot:</b>{" "}
                          {tripPlan?.vibeInspiration ||
                            "Vibe-related highlight"}
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Right side - Trip Details */}
                  <div className="w-full md:w-2/5">
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        Plan Your Trip
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Essential information to help you plan
                      </p>

                      <div className="mb-6 space-y-3">
                        <div>
                          <h4 className="font-medium text-gray-800">From:</h4>
                          <p className="text-sm text-gray-600 mb-1">
                            {tripPlan?.startingLocation}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-800">
                            Best Time to Visit:
                          </h4>
                          <p className="text-sm text-gray-600 capitalize">
                            {tripPlan?.bestTimeToVisit || "Best Time to Visit"}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-800">
                            Duration:
                          </h4>
                          <p className="text-sm text-gray-600">
                            {tripPlan?.days === "1"
                              ? "Overnight"
                              : tripPlan?.days === "3"
                              ? "Weekend"
                              : tripPlan?.days === "5"
                              ? "Extended Weekend"
                              : tripPlan?.days === "7"
                              ? "Week-long"
                              : tripPlan?.days === "10"
                              ? "Extended"
                              : "Trip Length"}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-800">Budget:</h4>
                          <p className="text-sm text-gray-600">
                            {tripPlan?.budget === "500"
                              ? "Budget"
                              : tripPlan?.budget === "2000"
                              ? "Mid-Range"
                              : tripPlan?.budget === "5000"
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
          </div>
        ))
      )}
    </>
  );
};

export default Explore;
