import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTripForm = () => {
    const [trips, setTrips] = useState([]);
    const [formData, setFormData] = useState({
        startingLocation: "",
        budget: "",
        vibe: "",
        days: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            startingLocation: formData.startingLocation,
            budget: parseFloat(formData.budget),
            vibe: formData.vibe,
            days: parseInt(formData.days),
            travelCompanions: 1 // Default value
        };

        try {
            console.log("Sending to Node.js backend:", JSON.stringify(data, null, 2));
            const aiResponse = await fetch("http://localhost:3001/api/trips", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            if (!aiResponse.ok) {
                const errorText = await aiResponse.text();
                throw new Error(`AI backend error: ${aiResponse.status} - ${errorText}`);
            }
            const aiData = await aiResponse.json();
            console.log("AI Response:", JSON.stringify(aiData, null, 2));
            const travelData = aiData.data || {};

            const springPayload = {
                trip: data,
                tripTitle: travelData.tripTitle || "Default Title",
                location: travelData.location || "Unknown Location",
                description: travelData.description || "No description available",
                bestTimeToVisit: travelData.bestTimeToVisit || "Anytime",
                topActivity: travelData.topActivity || "No activity specified",
                mainAttraction: travelData.mainAttraction || "No attraction specified",
                vibeInspiration: travelData.vibeInspiration || "No inspiration specified"
            };
            console.log("Sending to Spring Boot backend:", JSON.stringify(springPayload, null, 2));

            const saveResponse = await fetch("http://localhost:8080/api/trips/tripPlan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(springPayload)
            });
            if (!saveResponse.ok) {
                const errorText = await saveResponse.text();
                console.error("Spring Boot Response:", errorText);
                throw new Error(`Spring Boot backend error: ${saveResponse.status} - ${errorText}`);
            }
            const savedTrip = await saveResponse.json();
            console.log("Saved Trip:", JSON.stringify(savedTrip, null, 2));

            setTrips((prevTrips) => [...prevTrips, savedTrip]);

            setFormData({
                startingLocation: "",
                budget: "",
                vibe: "",
                days: ""
            });

            navigate("/trip", {
                state: {
                    tripData: travelData,
                    formData: data,
                    savedTrip: savedTrip
                }
            });

            alert("Trip planned and saved successfully!");
        } catch (error) {
            console.error("Submission Error:", error.message);
            alert(`Failed to create trip: ${error.message}`);
        }
    };

    return (
        <div className="max-w-4xl mx-auto overflow-hidden border bg-white">
            <div className="px-20 py-10">
                <div className="flex flex-col md:flex-row p-5 md:gap-20">
                    <div className="w-full mb-6 md:w-1/2 md:mb-0">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Your Feeling, Your Journey
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Skip the endless research. Simply tell us your desired vibe, and
                            we'll match you with authentic experiences that locals cherish and
                            travelers dream about.
                        </p>
                    </div>

                    <div className="md:w-1/2">
                        <div className="bg-gray-50 p-5 rounded-lg">
                            <form className="space-y-4 text-left" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Starting Location:
                                    </label>
                                    <select
                                        name="startingLocation"
                                        value={formData.startingLocation}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 bg-gray-50 text-gray-600 text-sm"
                                        required
                                    >
                                        <option value="">Select a starting location</option>
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
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Budget ($):
                                    </label>
                                    <select
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 bg-gray-50 text-gray-600 text-sm"
                                        required
                                    >
                                        <option value="">Select a budget</option>
                                        <option value="500">Budget ($500)</option>
                                        <option value="2000">Mid-Range ($2000)</option>
                                        <option value="5000">Luxury ($5000)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Vibe:
                                    </label>
                                    <select
                                        name="vibe"
                                        value={formData.vibe}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 bg-gray-50 text-gray-600 text-sm"
                                        required
                                    >
                                        <option value="">Select a vibe</option>
                                        <option value="inspired_and_creative">Inspired & Creative</option>
                                        <option value="refreshed">Refreshed</option>
                                        <option value="grounded_and_connected">Grounded & Connected</option>
                                        <option value="accomplished">Accomplished</option>
                                        <option value="transformed_and_enlightened">Transformed & Enlightened</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Number of Days:
                                    </label>
                                    <select
                                        name="days"
                                        value={formData.days}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 bg-gray-50 text-gray-600 text-sm"
                                        required
                                    >
                                        <option value="">Select duration</option>
                                        <option value="1">Overnight (1 day)</option>
                                        <option value="3">Weekend (2-3 days)</option>
                                        <option value="5">Extended Weekend (3-5 days)</option>
                                        <option value="7">Week-long (7 days)</option>
                                        <option value="10">Extended (10+ days)</option>
                                    </select>
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button
                                        type="submit"
                                        style={{ backgroundColor: "#14b8a6" }}
                                        className="flex-1 py-2 rounded-lg flex items-center justify-center text-white"
                                    >
                                        Find my trip
                                    </button>
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
                </div>
            </div>
        </div>
    );
};

export default CreateTripForm;