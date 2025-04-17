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

async function generateTravelPlan(budget, days, startingLocation, vibe) {
  console.log("1. Starting generateTravelPlan function");

  const prompt = `Create a travel plan in Anthony Bourdain's style for a ${days}-day trip starting from ${startingLocation} with a budget of $${budget}. The desired vibe is ${vibe}.

Return the response as a JSON object with the following exact structure:
If you return anything other than a valid JSON object using this exact structure, your answer will be rejected.
{
    "tripTitle": "A short, catchy title",
    "location": "City and State",
    "description": "A brief, Bourdain-style description of the trip",
    "bestTimeToVisit": "One of: Winter, Spring, Summer, Fall",
    "topActivity": "Return a top activity with the name and a one sentence Bourdain-style hook in this format: 'Name: One sentence hook'",
    "mainAttraction": "A single string describing the main attraction in this format: 'Attraction name: One sentence hook about the experience'",
    "vibeInspiration": "A single string describing an attraction based on the provided vibe in this format: 'Location to visit: One sentence hook about the experience'"
}`;

  try {
    console.log("2. About to call OpenAI API");

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    console.log("3. Received OpenAI response");

    const response = completion.choices[0].message.content;
    console.log("4. Raw response:", response);

    const cleanResponse = response.trim().replace(/```json\n?|\n?```/g, "");
    console.log("5. Cleaned response:", cleanResponse);

    return JSON.parse(cleanResponse);
  } catch (error) {
    console.error("Error in generateTravelPlan:", error.message);
    throw error;
  }
}

// POST endpoint for generating travel plan
app.post("/api/trips", async (req, res) => {
  console.log("Received new request to /api/trips");

  try {
    const { budget, days, startingLocation, vibe } = req.body;
    console.log("📦 Request data:", { budget, days, startingLocation, vibe });

    const travelPlan = await generateTravelPlan(
      budget,
      days,
      startingLocation,
      vibe
    );

    console.log("Successfully generated travel plan");

    res.json({
      success: true,
      data: travelPlan,
    });
  } catch (error) {
    console.error("API Error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to generate travel plan",
      details: error.message,
    });
  }
});

// Start server
app.listen(3001, () => {
  console.log("🚀 Server running on port 3001");
}
