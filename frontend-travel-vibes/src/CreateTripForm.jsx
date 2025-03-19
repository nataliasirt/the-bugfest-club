import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateTripForm = () => {
  const [trips, setTrips] = useState([]);
  const [formData, setFormData] = useState({
    startingLocation: '',
    budget: '',
    vibe: '',
    days: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert budget to float and days to integer when updating state
    const parsedValue = name === 'budget' ? parseFloat(value) || '' :
                       name === 'days' ? parseInt(value) || '' : value;
    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare data for API call
    const data = {
      startingLocation: formData.startingLocation,
      budget: parseFloat(formData.budget),
      vibe: formData.vibe,
      days: parseInt(formData.days)
    };

    try {
      const response = await fetch('http://localhost:8080/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const responseData = await response.text();
        console.log('Success:', responseData);
        // Add the trip to local state
        setTrips([...trips, formData]);
        // Reset form
        setFormData({
          startingLocation: '',
          budget: '',
          vibe: '',
          days: ''
        });
        alert('Trip details sent successfully!');
      } else {
        console.error('Error:', response.status);
        alert('Failed to send trip details.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending trip details.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-white z-10">
      <div className="bg-white rounded-[25px] border border-gray-300 shadow-lg p-5 pb-5 w-[400px] max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Plan New Trip
        </h2>

        <form className="space-y-3 text-left" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Starting Location:
            </label>
            <input
              type="text"
              name="startingLocation"
              value={formData.startingLocation}
              onChange={handleChange}
              placeholder="e.g., New York, NY"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budget ($):
            </label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="e.g., 1000"
              min="0"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
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
              <option value="">Select a vibe</option>
              <option value="relaxing">Relaxing</option>
              <option value="adventurous">Adventurous</option>
              <option value="cultural">Cultural</option>
              <option value="party">Party</option>
              <option value="romantic">Romantic</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Days:
            </label>
            <input
              type="number"
              name="days"
              value={formData.days}
              onChange={handleChange}
              placeholder="e.g., 7"
              min="1"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
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