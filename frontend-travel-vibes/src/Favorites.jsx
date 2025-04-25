import React, { useEffect, useState } from "react";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  BlueskyShareButton,
  BlueskyIcon,
} from "react-share";

const Favorites = () => {
  const currentPageUrl = window.location.href;
  const [tripPlans, setTripPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    fetchFavoriteTrips();
  }, []);

  const fetchFavoriteTrips = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const url = "http://localhost:8080/api/trips/tripPlans/favorites";
      console.log(`Fetching favorite trip plans from: ${url}`);
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const responseText = await response.text();
      console.log(`Fetch response: status=${response.status}, body=${responseText}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${responseText}`);
      }
      const data = JSON.parse(responseText);
      console.log(`Received ${data.length} favorite trip plans`);
      setTripPlans(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setFetchError(error.message || "Failed to fetch favorite trip plans");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (tripPlan) => {
    if (!tripPlan.trip?.id && !tripPlan.id) {
      console.error("No valid trip or travel plan ID provided for deletion", tripPlan);
      alert("Failed to delete trip plan: No valid ID provided");
      return;
    }

    if (window.confirm("Are you sure you want to delete this trip plan?")) {
      try {
        let response, responseText;
        if (tripPlan.trip?.id) {
          console.log(`Attempting to delete Trip with ID: ${tripPlan.trip.id}`);
          response = await fetch(`http://localhost:8080/api/trips/${tripPlan.trip.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });
          responseText = await response.text();
          console.log(`Delete /api/trips response: status=${response.status}, body=${responseText}`);
          if (!response.ok && response.status !== 405) {
            throw new Error(`HTTP error! Status: ${response.status}, Details: ${responseText}`);
          }
        }

        if ((!response || response.status === 405) && tripPlan.id) {
          console.log(`Attempting to delete TravelPlan with ID: ${tripPlan.id}`);
          response = await fetch(`http://localhost:8080/api/trips/tripPlans/${tripPlan.id}`, {
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

        console.log(`Successfully deleted trip plan with ID: ${tripPlan.id || tripPlan.trip.id}`);
        setTripPlans(tripPlans.filter((plan) => plan.id !== tripPlan.id));
      } catch (error) {
        console.error("Delete error:", error);
        alert(`Failed to delete trip plan: ${error.message}`);
      }
    }
  };

  const handleFavorite = async (tripPlan) => {
    const tripId = tripPlan.trip?.id;
    if (!tripId) {
      console.error("No valid trip ID provided for favoriting", tripPlan);
      alert("Failed to update favorite status: No valid trip ID");
      return;
    }

    const currentFavoriteStatus = tripPlan.trip?.favorite || false;
    const newFavoriteStatus = !currentFavoriteStatus;

    console.log(`Attempting to toggle favorite for Trip ID: ${tripId}, new status: ${newFavoriteStatus}`);

    try {
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
      console.log(`Updated trip:`, updatedTrip);

      setTripPlans(
        tripPlans.map((plan) =>
          plan.id === tripPlan.id
            ? { ...plan, trip: { ...plan.trip, favorite: updatedTrip.favorite } }
            : plan
        )
      );
    } catch (error) {
      console.error("Favorite error:", error);
      alert(`Failed to update favorite status: ${error.message}`);
    }
  };

  if (loading) return <div className="text-center text-xl">Loading...</div>;

  if (fetchError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-100 flex items-center justify-center p-4">
        <div className="w-full max-w-[1200px] text-center bg-white/95 backdrop-blur-sm rounded-[25px] border-2 border-gray-200 shadow-lg p-8">
          <h2 className="text-xl font-semibold text-red-600">Error fetching favorite trip plans</h2>
          <p>{fetchError}</p>
          <p>Please check the console logs and ensure the backend data is valid.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[1200px]">
        <div className="bg-white/95 backdrop-blur-sm rounded-[25px] border-2 border-gray-200 shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 text-center">
            My Favorite Trips
          </h1>
          <p className="text-lg text-gray-600 text-center mb-6">
            Your curated list of favorite travel destinations.
          </p>
        </div>

        {tripPlans.length === 0 && !loading && !fetchError ? (
          <div className="text-center bg-white/95 backdrop-blur-sm rounded-[25px] border-2 border-gray-200 shadow-lg p-8">
            <h2 className="text-xl font-semibold">No favorite trips found.</h2>
            <p>Add trips to your favorites from the Explore page.</p>
          </div>
        ) : (
          tripPlans.map((tripPlan) => (
            <div key={tripPlan.id} className="max-w-4xl mx-auto overflow-hidden border-2 bg-white shadow-md mt-10 relative rounded-[25px]">
              <div className="px-6 py-10">
                <div className="flex mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    The Vibe:{" "}
                    {tripPlan.trip?.vibe === "inspired_and_creative"
                      ? "Inspired & Creative"
                      : tripPlan.trip?.vibe === "refreshed"
                      ? "Refreshed"
                      : tripPlan.trip?.vibe === "grounded_and_connected"
                      ? "Grounded & Connected"
                      : tripPlan.trip?.vibe === "accomplished"
                      ? "Accomplished"
                      : tripPlan.trip?.vibe === "transformed_and_enlightened"
                      ? "Transformed & Enlightened"
                      : "Unknown Vibe"}
                  </span>
                </div>

                <div className="flex flex-col md:flex-row md:gap-8">
                  <div className="w-full mb-6 md:w-3/5 md:mb-0">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                      {tripPlan.tripTitle || "Trip Title"} in{" "}
                      {tripPlan.location || "Trip Location"}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {tripPlan.description || "Trip Description"}
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      What To Do
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-600 mb-3">
                        <span className="mr-2">⭐</span>
                        <span>
                          <b>Highlight:</b>{" "}
                          {tripPlan.topActivity || "Highlight Info"}
                        </span>
                      </li>
                      <li className="flex items-center text-gray-600 mb-3">
                        <span className="mr-2">⭐</span>
                        <span>
                          <b>Experience:</b>{" "}
                          {tripPlan.mainAttraction || "Activity Name"}
                        </span>
                      </li>
                      <li className="flex items-center text-gray-600 mb-3">
                        <span className="mr-2">⭐</span>
                        <span>
                          <b>Vibe-Inspired Spot:</b>{" "}
                          {tripPlan.vibeInspiration || "Vibe-related highlight"}
                        </span>
                      </li>
                    </ul>
                  </div>

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
                            {tripPlan.trip?.startingLocation || "N/A"}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-800">
                            Best Time to Visit:
                          </h4>
                          <p className="text-sm text-gray-600 capitalize">
                            {tripPlan.bestTimeToVisit || "Best Time to Visit"}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-800">
                            Duration:
                          </h4>
                          <p className="text-sm text-gray-600">
                            {tripPlan.trip?.days === 1
                              ? "Overnight"
                              : tripPlan.trip?.days === 3
                              ? "Weekend"
                              : tripPlan.trip?.days === 5
                              ? "Extended Weekend"
                              : tripPlan.trip?.days === 7
                              ? "Week-long"
                              : tripPlan.trip?.days === 10
                              ? "Extended"
                              : "Trip Length"}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-800">Budget:</h4>
                          <p className="text-sm text-gray-600">
                            {tripPlan.trip?.budget === "500"
                              ? "Budget"
                              : tripPlan.trip?.budget === "2000"
                              ? "Mid-Range"
                              : tripPlan.trip?.budget === "5000"
                              ? "Luxury"
                              : "Amount to spend"}
                          </p>
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
                  onClick={() => handleDelete(tripPlan)}
                  className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
                  title="Delete trip plan"
                  disabled={!tripPlan.id}
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
                  onClick={() => handleFavorite(tripPlan)}
                  className={`${
                    tripPlan.trip?.favorite
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-gray-300 hover:bg-gray-400"
                  } text-white p-1 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200`}
                  title={tripPlan.trip?.favorite ? "Remove from Favorites" : "Add to Favorites"}
                  disabled={!tripPlan.trip?.id}
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
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;