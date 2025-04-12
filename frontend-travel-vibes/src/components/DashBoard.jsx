import React, { useEffect, useState } from "react";
// import { getSavedTrips } from '../util/APIUtils';  // Assuming this API exists
import { ACCESS_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";

function WelcomeDashboard({ username }) {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
    //   getSavedTrips(token)  // Assuming an API function to fetch trips
    //     .then(response => {
    //       setTrips(response);
    //     })
    //     .catch(error => {
    //       console.error("Failed to fetch trips", error);
    //     });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="border rounded-lg p-4"
        style={{ width: "500px", height: "500px" }}
      >
        <h2 className="mb-4 text-center">Welcome to Dashboard</h2>
        <p className="mb-4 text-center">Hello, {username}!</p>
        <p className="text-center">You are logged in successfully.</p>

        <h4>Your Trips</h4>
        {trips.length > 0 ? (
          <ul>
            {trips.map((trip, index) => (
              <li key={index}>{trip.destination} from {trip.startDate} to {trip.endDate}</li>
            ))}
          </ul>
        ) : (
          <p>No trips saved yet.</p>
        )}

        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeDashboard;
