import React from "react";
import { useLocation } from "react-router-dom";
import {
  EmailShareButton,
  BlueskyShareButton,
  FacebookShareButton,
  BlueskyIcon,
} from "react-share";

const TripPage = () => {
  const location = useLocation();
  const currentPageUrl = window.location.href;
  const { tripData, formData } = location.state || {};

  if (!tripData || !formData) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold">No trip data found.</h2>
        <p>Try creating a trip again from the form.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-4">{tripData.tripTitle}</h1>
      <p className="mb-2">
        <strong>From:</strong> {formData.startingLocation}
      </p>
      <p className="mb-2">
        <strong>Budget:</strong> ${formData.budget}
      </p>
      <p className="mb-2">
        <strong>Days:</strong> {formData.days}
      </p>
      <p className="mb-2">
        <strong>Description:</strong> {tripData.description}
      </p>
      <p className="mb-2">
        <strong>Location:</strong> {tripData.location}
      </p>
      <p className="mb-2">
        <strong>Main Attraction:</strong> {tripData.mainAttraction}
      </p>
      <p className="mb-2">
        <strong>Top Activity:</strong> {tripData.topActivity}
      </p>
      <p className="mb-2">
        <strong>Best Time to Visit:</strong> {tripData.bestTimeToVisit}
      </p>
      <p className="mb-2">
        <strong>Vibe-Inspired Spot:</strong> {tripData.vibeInspiration}
      </p>
      <EmailShareButton url={currentPageUrl}>
        <EmailIcon round={true}></EmailIcon>
      </EmailShareButton>
      <FacebookShareButton url={currentPageUrl}>
        <FacebookIcon round={true}></FacebookIcon>
      </FacebookShareButton>
      <BlueskyShareButton url={currentPageUrl}>
        <BlueskyIcon round={true}></BlueskyIcon>
      </BlueskyShareButton>
    </div>
  );
};

export default TripPage;
