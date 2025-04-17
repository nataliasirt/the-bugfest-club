import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Explore = () => {
  const [tripPlans, setTripPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTripsPlans = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/trips/tripPlan", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTripPlans(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
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
        tripPlans.map((tripPlan) => <div key={tripPlan.id}> </div>)
      )}
    </>
  );
};

export default Explore;
