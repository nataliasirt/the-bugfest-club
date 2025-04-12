import React from "react";
import { useLocation } from "react-router-dom";

const TripPage = () => {
  const location = useLocation();
  const { tripData, formData } = location.state || {};

  if (!tripData) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold">No trip data found.</h2>
        <p>Try creating a trip again from the form.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6">{tripData.tripTitle}</h1>
      <p className="text-gray-600 mb-4">{tripData.description}</p>

      <h2 className="text-xl font-semibold mt-6">Location:</h2>
      <p>{tripData.location}</p>

      <h2 className="text-xl font-semibold mt-6">Best Time to Visit:</h2>
      <p>{tripData.bestTimeToVisit}</p>

      <h2 className="text-xl font-semibold mt-6">Top Activities:</h2>
      <ul className="list-disc list-inside">
        {tripData.topActivities.map((activity, index) => (
          <li key={index}>
            <strong>{activity.name}:</strong> {activity.hook}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6">Restaurant Recommendations:</h2>
      <ul className="list-disc list-inside">
        {tripData.restaurantRecommendations.map((restaurant, index) => (
          <li key={index}>
            <strong>{restaurant.name}:</strong> {restaurant.hook}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripPage;
