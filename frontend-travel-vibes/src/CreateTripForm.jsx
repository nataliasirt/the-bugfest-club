import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreateTripForm = () => {
  const [trips, setTrips] = useState([]);
  const [formData, setFormData] = useState({
    startingLocation: "",
    budget: "",
    vibe: "",
    days: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for API call
    const data = {
      startingLocation: formData.startingLocation,
      budget: parseFloat(formData.budget),
      vibe: formData.vibe,
      days: parseInt(formData.days),
    };

    try {
      const response = await fetch("http://localhost:8080/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.text();
        console.log("Success:", responseData);
        // Add the trip to local state
        setTrips([...trips, formData]);
        // Reset form
        setFormData({
          startingLocation: "",
          budget: "",
          vibe: "",
          days: "",
        });
        alert("Trip details sent successfully!");
      } else {
        console.error("Error:", response.status);
        alert("Failed to send trip details.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending trip details.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-5 bg-white">
      <div className="w-full md:w-3/5 bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Plan New Trip
        </h2>

        <form className="space-y-4 text-left" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Starting Location:
            </label>
            <select
              name="startingLocation"
              value={formData.startingLocation}
              onChange={handleChange}
              className="w-full p-2 border rborder-gray-300 rounded-md focus:ring-2 bg-gray-50 text-gray-600"
              required
            >
              <option value="">Select starting location:</option>
              <option value="Northeast_US">Northeast</option>
              <option value="MidAtlantic_US">Mid-Atlantic</option>
              <option value="Southeast_US">Southeast</option>
              <option value="Deep_South_US">Deep South</option>
              <option value="Texas_Oklahoma_US">Texas & Oklahoma</option>
              <option value="Rocky_Mountain_US">Rocky Mountain</option>
              <option value="California_Coast_US">California Coast</option>
              <option value="Pacific_Northwest_US">Pacific Northwest</option>
              <option value="Hawaii_US">Hawaii</option>
              <option value="Alaska_US">Alaska</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budget ($):
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select budget:</option>
              <option value="500">Budget</option>
              <option value="2000">Mid-Range</option>
              <option value="5000">Luxury</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vibe:
            </label>
            <select
              name="vibe"
              value={formData.vibe}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a vibe:</option>
              <option value="inspired_and_creative">Inspired & Creative</option>
              <option value="refreshed">Refreshed</option>
              <option value="grounded_and_connected">
                Grounded & Connected
              </option>
              <option value="accomplished">Accomplished</option>
              <option value="transformed_and_enlightened">
                Transformed & Enlightened
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Days:
            </label>
            <select
              name="days"
              value={formData.days}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select duration:</option>
              <option value="1">Overnight</option>
              <option value="3">Weekend (2-3 days)</option>
              <option value="5">Extended Weekend (3-5 days)</option>
              <option value="7">Week-long (7 days)</option>
              <option value="10">Extended (10+ days)</option>
            </select>
          </div>

          <div className="space-y-10">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              ADD TRIP
            </button>

            <Link to="/">
              <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
                BACK TO HOME
              </button>
            </Link>
          </div>
        </form>

        {trips.length > 0 && (
          <div className="mt-6 text-gray-800">
            <h3 className="text-lg font-semibold mb-2">Your Trips</h3>
            {trips.map((trip, index) => (
              <div key={index} className="mb-4">
                <p className="text-base font-medium">
                  • From: {trip.startingLocation}
                </p>
                <p className="text-sm">Budget: ${trip.budget}</p>
                <p className="text-sm">Vibe: {trip.vibe}</p>
                <p className="text-sm">Duration: {trip.days} days</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTripForm;
