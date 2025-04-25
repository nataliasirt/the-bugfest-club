import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = ({ currentUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name || "");
  const [email, setEmail] = useState(currentUser.email || "");
  const [imageUrl, setImageUrl] = useState(currentUser.imageUrl || "");
  const [bio, setBio] = useState(currentUser.bio || "");

  const [favorites, setFavorites] = useState(currentUser.favorites || []);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [fetchFavoritesError, setFetchFavoritesError] = useState(null);

  useEffect(() => {
    if (!currentUser.favorites) {
        //state to store user's favorite trip plans
      const fetchFavorites = async () => {
        setLoadingFavorites(true);
        setFetchFavoritesError(null);
        try {
          const response = await fetch(
            "http://localhost:8080/api/trips/tripPlans/favorites",
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setFavorites(data);
        } catch (error) {
          console.error("Error fetching favorites:", error);
          setFetchFavoritesError(
            error.message || "Failed to fetch favorite trip plans"
          );
        } finally {
          setLoadingFavorites(false);
        }
      };
      fetchFavorites();
    }
  }, [currentUser.favorites]);

  const handleSaveProfile = () => {
    console.log("Saving profile:", { name, email, imageUrl, bio });
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    console.log("Change password clicked");
  };

  const handleDeleteAccount = () => {
    console.log("Delete account clicked");
  };

  const recentTrips = currentUser.recentTrips || [
    { id: 1, title: "Summer in Italy", date: "2025-06-15" },
    { id: 2, title: "New York City Getaway", date: "2025-03-10" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Profile Header */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex-shrink-0">
              {imageUrl && !isEditing ? (
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-teal-500"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-teal-500 flex items-center justify-center text-white text-2xl font-bold">
                  <span>{name && name[0]?.toUpperCase()}</span>
                </div>
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Profile Image URL"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    rows="4"
                  />
                  <div className="flex space-x-4">
                    <button
                      onClick={handleSaveProfile}
                      className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
                  <p className="text-gray-600">{email}</p>
                  {bio && <p className="text-gray-600 mt-2">{bio}</p>}
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
                  >
                    Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Travel Stats Dashboard */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Travel Stats
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-teal-500">
                {currentUser.tripsCreated || 0}
              </p>
              <p className="text-gray-600">Trips Created</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-teal-500">
                {favorites.length}
              </p>
              <p className="text-gray-600">Favorite Destinations</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-teal-500">
                {currentUser.countriesVisited || 0}
              </p>
              <p className="text-gray-600">Countries Visited</p>
            </div>
          </div>
        </div>

        {/* Favorite Destinations */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Favorite Destinations
          </h3>
          {loadingFavorites ? (
            <p className="text-gray-600">Loading favorite destinations...</p>
          ) : fetchFavoritesError ? (
            <p className="text-red-600">Error: {fetchFavoritesError}</p>
          ) : favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((tripPlan) => (
                <Link
                  key={tripPlan.id}
                  to={`/trips/${tripPlan.trip?.id}`}
                  className="flex flex-col p-4 bg-gray-50 rounded-md hover:bg-teal-50 transition-colors"
                >
                  <h4 className="text-lg font-medium text-teal-500 hover:text-teal-600 transition-colors">
                    {tripPlan.tripTitle || "Untitled Trip"} in{" "}
                    {tripPlan.location || "Unknown Location"}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 truncate">
                    {tripPlan.description || "No description available"}
                  </p>
                  <span className="text-xs text-gray-500 mt-2">
                    Vibe:{" "}
                    {tripPlan.trip?.vibe
                      ? tripPlan.trip.vibe
                          .replace(
                            "inspired_and_creative",
                            "Inspired & Creative"
                          )
                          .replace("refreshed", "Refreshed")
                          .replace(
                            "grounded_and_connected",
                            "Grounded & Connected"
                          )
                          .replace("accomplished", "Accomplished")
                          .replace(
                            "transformed_and_enlightened",
                            "Transformed & Enlightened"
                          )
                      : "Unknown Vibe"}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              No favorite destinations yet. Add trips from the{" "}
              <Link to="/explore" className="text-teal-500 hover:text-teal-600">
                Explore page
              </Link>
              .
            </p>
          )}
          <Link
            to="/favorites"
            className="mt-6 inline-block bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition-colors"
          >
            Go to Favorites Page
          </Link>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Trips
          </h3>
          {recentTrips.length > 0 ? (
            <ul className="space-y-2">
              {recentTrips.map((trip) => (
                <li key={trip.id} className="flex justify-between">
                  <Link
                    to={`/trips/${trip.id}`}
                    className="text-teal-500 hover:text-teal-600 transition-colors"
                  >
                    {trip.title}
                  </Link>
                  <span className="text-gray-600">{trip.date}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No recent trips yet.</p>
          )}
          <Link
            to="/trips"
            className="mt-4 inline-block bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
          >
            View All Trips
          </Link>
        </div>

        {/* Account Settings */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Account Settings
          </h3>
          <div className="flex flex-col space-y-2 items-start">
            <button
              onClick={handleChangePassword}
              className="bg-teal-400 hover:bg-teal-500 text-white text-xs font-medium px-3 py-1 rounded-md transition-all"
            >
              Change Password
            </button>
            <button
              onClick={handleDeleteAccount}
              className="bg-red-400 hover:bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-md transition-all"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
