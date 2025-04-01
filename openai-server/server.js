const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

// Create OpenAI client
const openai = new OpenAI({
  apiKey: "your-api-key-here", // Replace with your actual OpenAI API key
});

app.use(cors());
app.use(express.json());

async function generateTravelPlan(budget, days, startingLocation, vibe) {
  console.log("1. Starting generateTravelPlan function");

  const prompt = `Create a travel plan in Anthony Bourdain's style for a ${days}-day trip starting from ${startingLocation} with a budget of $${budget}. The desired vibe is ${vibe}.

Return the response as a JSON object with the following exact structure:
{
    "tripTitle": "A short, catchy title",
    "location": "The main destination",
    "description": "A brief, Bourdain-style description of the trip",
    "bestTimeToVisit": "One of: winter, spring, summer, fall",
    "topActivities": [
        {
            "name": "Activity name",
            "hook": "One sentence Bourdain-style hook about why this activity is worth doing"
        }
    ],
    "restaurantRecommendations": [
        {
            "name": "Restaurant name",
            "hook": "One sentence Bourdain-style hook about why this place is worth visiting"
        }
    ]
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

app.post("/api/trips", async (req, res) => {
  console.log("Received new request to /api/trips");

  try {
    const { budget, days, startingLocation, vibe } = req.body;
    console.log("Request data:", { budget, days, startingLocation, vibe });

    console.log("Calling generateTravelPlan...");
    const travelPlan = await generateTravelPlan(
      budget,
      days,
      startingLocation,
      vibe
    );

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

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
