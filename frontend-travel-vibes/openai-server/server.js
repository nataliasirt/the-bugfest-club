require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// Check for OpenAI API key
if (!process.env.OPENAI_API_KEY) {
  console.error("Missing OpenAI API key in environment variables");
  process.exit(1);
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateTravelPlan(budget, days, startingLocation, vibe, travelCompanions) {
  console.log("1. Starting generateTravelPlan function");

  const prompt = `Create a travel plan in Anthony Bourdain's style for a ${days}-day trip starting from ${startingLocation} with a budget of $${budget} for ${travelCompanions} traveler(s). The desired vibe is ${vibe}.

Return a valid JSON object with the following exact structure. Do not include repeated fields, truncated text, or any content outside the JSON object:
{
    "tripTitle": "A short, catchy title",
    "location": "City and State",
    "description": "A brief, Bourdain-style description of the trip (complete sentences, no truncation)",
    "bestTimeToVisit": "One of: Winter, Spring, Summer, Fall",
    "topActivity": "Top activity in the format: 'Name: One sentence hook'",
    "mainAttraction": "Main attraction in the format: 'Attraction name: One sentence hook'",
    "vibeInspiration": "Vibe-based attraction in the format: 'Location to visit: One sentence hook'"
}`;

  try {
    console.log("2. About to call OpenAI API");

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
    });

    console.log("3. Received OpenAI response");

    const response = completion.choices[0].message.content;
    console.log("4. Raw response:", response);

    const parsedResponse = JSON.parse(response);
    console.log("5. Parsed response:", parsedResponse);

    const cleanedResponse = {
      tripTitle: parsedResponse.tripTitle || "Default Trip Title",
      location: parsedResponse.location || "Unknown Location",
      description: parsedResponse.description || "No description available",
      bestTimeToVisit: parsedResponse.bestTimeToVisit || "Anytime",
      topActivity: parsedResponse.topActivity || "No activity specified",
      mainAttraction: parsedResponse.mainAttraction || "No attraction specified",
      vibeInspiration: parsedResponse.vibeInspiration || "No inspiration specified",
    };

    console.log("6. Cleaned response:", cleanedResponse);
    return cleanedResponse;
  } catch (error) {
    console.error("Error in generateTravelPlan:", error.message);
    throw error;
  }
}

app.post("/api/trips", async (req, res) => {
  console.log("Received new request to /api/trips");

  try {
    const { budget, days, startingLocation, vibe, travelCompanions = 1 } = req.body;
    console.log("📦 Request data:", { budget, days, startingLocation, vibe, travelCompanions });

    const travelPlan = await generateTravelPlan(
      budget,
      days,
      startingLocation,
      vibe,
      travelCompanions
    );

    const payload = {
      trip: {
        startingLocation,
        budget,
        vibe,
        days,
        favorite: false
      },
      tripTitle: travelPlan.tripTitle,
      location: travelPlan.location,
      description: travelPlan.description,
      bestTimeToVisit: travelPlan.bestTimeToVisit,
      topActivity: travelPlan.topActivity,
      mainAttraction: travelPlan.mainAttraction,
      vibeInspiration: travelPlan.vibeInspiration
    };

    console.log("7. Sending to Spring Boot:", JSON.stringify(payload, null, 2));
    let springBootResponseData = null;
    try {
      const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
      };
      console.log("8. Spring Boot Request Headers:", headers);
      const springBootResponse = await axios.post(
        "http://localhost:8080/api/trips/tripPlan",
        payload,
        { headers, timeout: 5000 }
      );
      springBootResponseData = springBootResponse.data;
      console.log("9. Spring Boot Response:", springBootResponse.data);
      console.log("10. Spring Boot Response Headers:", springBootResponse.headers);
    } catch (springError) {
      console.error("Spring Boot Error:", springError.response?.data || springError.message);
      console.error("Spring Boot Error Headers:", springError.response?.headers);
      console.error("Spring Boot Error Status:", springError.response?.status);
      console.error("Spring Boot Error Config:", springError.config);
      return res.status(200).json({
        success: true,
        data: travelPlan,
        warning: "Travel plan generated, but failed to save to Spring Boot",
        springError: springError.response?.data || springError.message
      });
    }

    console.log("Successfully generated and saved travel plan");

    res.json({
      success: true,
      data: travelPlan,
      travelPlanId: springBootResponseData?.id,
      tripId: springBootResponseData?.trip?.id
    });
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: "Failed to generate or save travel plan",
      details: error.response?.data || error.message
    });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});