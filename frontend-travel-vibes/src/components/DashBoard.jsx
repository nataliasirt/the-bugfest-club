import React, { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";

function WelcomeDashboard({ username }) {
  const [trips, setTrips] = useState([]);
  const [logoutTriggered, setLogoutTriggered] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      // getSavedTrips(token) // Call the API for trips
      //   .then(response => {
      //     setTrips(response);
      //   })
      //   .catch(error => {
      //     console.error("Failed to fetch trips", error);
      //   });
    }
  }, []);

  useEffect(() => {
    if (logoutTriggered) {
      navigate("/"); // Redirect immediately after logout
    }
  }, [logoutTriggered, navigate]);

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setLogoutTriggered(true); // Trigger the state change that forces a re-render
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
              <li key={index}>
                {trip.destination} from {trip.startDate} to {trip.endDate}
              </li>
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
