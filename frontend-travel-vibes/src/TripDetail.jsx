import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { tripData, formData, travelPlanId, tripId } = location.state || {};
  const [error, setError] = useState(null);
  const currentPageUrl = window.location.href;

  const handleDelete = async () => {
    if (!tripId && !travelPlanId) {
      setError("No valid trip or travel plan ID available. Please save the trip first.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this trip plan?")) {
      try {
        let response, responseText;
        if (tripId) {
          console.log(`Attempting to delete Trip with ID: ${tripId}`);
          response = await fetch(`http://localhost:8080/api/trips/${tripId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });
          responseText = await response.text();
          console.log(`Delete /api/trips response: status=${response.status}, body=${responseText}`);
          if (!response.ok && response.status !== 405) {
            throw new Error(`HTTP error! Status: ${response.status}, Details: ${responseText}`);
          }
        }

        if ((!response || response.status === 405) && travelPlanId) {
          console.log(`Attempting to delete TravelPlan with ID: ${travelPlanId}`);
          response = await fetch(`http://localhost:8080/api/trips/tripPlans/${travelPlanId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });
          responseText = await response.text();
          console.log(`Delete /api/trips/tripPlans response: status=${response.status}, body=${responseText}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}, Details: ${responseText}`);
          }
        }

        if (!response.ok) {
          throw new Error(`Both delete attempts failed. Last status: ${response.status}, Details: ${responseText}`);
        }

        alert("Trip deleted successfully!");
        navigate("/");
      } catch (err) {
        console.error("Delete error:", err);
        setError(`Failed to delete trip: ${err.message}`);
      }
    }
  };

  const handleFavorite = async () => {
    if (!tripId) {
      setError("No valid trip ID available. Please save the trip first.");
      return;
    }

    const currentFavoriteStatus = formData?.favorite || false;
    const newFavoriteStatus = !currentFavoriteStatus;

    try {
      console.log(`Attempting to toggle favorite for Trip ID: ${tripId}, new status: ${newFavoriteStatus}`);
      const response = await fetch(`http://localhost:8080/api/trips/${tripId}/favorite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favorite: newFavoriteStatus }),
      });
      const responseText = await response.text();
      console.log(`Favorite response: status=${response.status}, body=${responseText}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${responseText}`);
      }

      const updatedTrip = JSON.parse(responseText);
      alert(`Trip ${updatedTrip.favorite ? "favorited" : "unfavorited"} successfully!`);
      navigate(location.pathname, {
        state: {
          ...location.state,
          formData: { ...formData, favorite: updatedTrip.favorite },
        },
        replace: true,
      });
    } catch (err) {
      console.error("Favorite error:", err);
      setError(`Failed to update favorite status: ${err.message}`);
    }
  };

  // Helper functions from Explore.jsx
  const formatVibe = (vibe) => {
    switch (vibe) {
      case "inspired_and_creative": return "Inspired & Creative";
      case "refreshed": return "Refreshed";
      case "grounded_and_connected": return "Grounded & Connected";
      case "accomplished": return "Accomplished";
      case "transformed_and_enlightened": return "Transformed & Enlightened";
      default: return "Your Vibe";
    }
  };

  const formatDuration = (days) => {
    switch (days) {
      case "1": return "Overnight";
      case "3": return "Weekend";
      case "5": return "Extended Weekend";
      case "7": return "Week-long";
      case "10": return "Extended";
      default: return "Trip Length";
    }
  };

  const formatBudget = (budget) => {
    switch (budget) {
      case "500": return "Budget";
      case "2000": return "Mid-Range";
      case "5000": return "Luxury";
      default: return "Amount to spend";
    }
  };

  if (!tripData || !formData) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold">No trip data found.</h2>
        <p>Try creating a trip again from the form.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-100 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="bg-white/95 backdrop-blur-sm rounded-[25px] border border-gray-200 shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 text-center">
            Your Trip Plan
          </h1>
          <p className="text-lg text-gray-600 text-center mb-6">
            Explore your custom trip, crafted for your vibe and preferences.
          </p>
        </div>

        <div className="max-w-4xl mx-auto overflow-hidden border bg-white shadow-md rounded-[25px] relative">
          <div className="px-6 py-10">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex mb-4">
              <span className="px-3 py-1 bg-teal-500 text-white rounded-full text-sm">
                The Vibe: {formatVibe(formData.vibe)}
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:gap-8">
              <div className="w-full mb-6 md:w-3/5 md:mb-0">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {tripData.tripTitle} in {tripData.location}
                </h2>
                <p className="text-gray-600 mb-4">{tripData.description}</p>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">What To Do</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600 mb-3">
                    <span className="mr-2">⭐</span>
                    <span><b>Highlight:</b> {tripData.topActivity}</span>
                  </li>
                  <li className="flex items-center text-gray-600 mb-3">
                    <span className="mr-2">⭐</span>
                    <span><b>Experience:</b> {tripData.mainAttraction}</span>
                  </li>
                  <li className="flex items-center text-gray-600 mb-3">
                    <span className="mr-2">⭐</span>
                    <span><b>Vibe-Inspired Spot:</b> {tripData.vibeInspiration}</span>
                  </li>
                </ul>
              </div>

              <div className="w-full md:w-2/5">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Plan Your Trip</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Essential information to help you plan
                  </p>

                  <div className="mb-6 space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-800">From:</h4>
                      <p className="text-sm text-gray-600 mb-1">{formData.startingLocation}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Best Time to Visit:</h4>
                      <p className="text-sm text-gray-600 capitalize">{tripData.bestTimeToVisit}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Duration:</h4>
                      <p className="text-sm text-gray-600">{formatDuration(formData.days)}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Budget:</h4>
                      <p className="text-sm text-gray-600">{formatBudget(formData.budget)}</p>
                    </div>
                  </div>

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

          <div className="absolute bottom-3 left-3 flex space-x-2">
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
              title="Delete trip plan"
              disabled={!tripId && !travelPlanId}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={() => {
                console.log(`Favorite button onClick triggered for Trip ID: ${tripId || "missing"}`);
                handleFavorite();
              }}
              className={`${
                formData?.favorite ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-300 hover:bg-gray-400"
              } text-white p-1 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200`}
              title={formData?.favorite ? "Remove from Favorites" : "Add to Favorites"}
              disabled={!tripId}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        {travelPlanId && tripId ? (
          <p className="text-gray-600 mt-4 text-center">Travel Plan ID: {travelPlanId}, Trip ID: {tripId}</p>
        ) : (
          <p className="text-yellow-600 mt-4 text-center">
            Warning: Trip not saved to backend. Save to enable Delete/Favorite actions.
          </p>
        )}
      </div>
    </div>
  );
};

export default TripDetail;