import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectMoodOptions,
} from "@/constants/options";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  const getUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: 'application/json'
          }
        }
      );
      console.log(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpenDialog(false);
      toast.success("Successfully signed in!");
      // Optional: Only call OnGenerateTrip if it was triggered by Generate Trip button
      if (formData.location && formData.budget && formData.noOfDays) {
        OnGenerateTrip();
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user profile");
    }
  };

  const login = useGoogleLogin({
    onSuccess: getUserProfile,
    onError: (error) => {
      console.error("Login error:", error);
      toast.error("Login failed");
    }
  });

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData?.location ||
      !formData?.budget ||
      !formData?.noOfDays ||
      formData?.noOfDays > 5
    ) {
      toast.error(
        "Please fill all required fields and ensure trip is 5 days or less"
      );
      return;
    }

    try {
      const FINAL_PROMPT = AI_PROMPT;
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log("AI Response:", result?.response?.text());
      toast.success("Trip generated successfully!");
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("Failed to generate trip");
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div className="mt-20 flex flex-col gap-9">
        {/* Starting point */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your starting location?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (selectedOption) => {
                setPlace(selectedOption);
                handleInputChange("location", selectedOption?.label || '');
              },
              placeholder: "Enter your starting location",
            }}
          />
        </div>

        {/* Trip Duration */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            min="1"
            max="5"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        {/* Mood Options - Horizontal Layout */}
        <div>
          <h2 className="text-xl my-3 font-medium">What’s your travel mood?</h2>
          <div className="flex flex-row gap-4 overflow-x-auto pb-2">
            {SelectMoodOptions.map((item) => (
              <div
                key={item.id}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg min-w-[200px] ${
                  formData?.mood === item.title
                    ? "bg-blue-100 border-blue-500"
                    : ""
                }`}
                onClick={() => {
                  setSelectedMood(item.title);
                  handleInputChange("mood", item.title);
                }}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Options - Horizontal Layout */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
          <div className="flex flex-row gap-4 overflow-x-auto pb-2">
            {SelectBudgetOptions.map((item) => (
              <div
                key={item.id}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg min-w-[200px] ${
                  formData?.budget === item.title
                    ? "bg-blue-100 border-blue-500"
                    : ""
                }`}
                onClick={() => {
                  setSelectedBudget(item.title);
                  handleInputChange("budget", item.title);
                }}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="my-20 justify-end flex">
        <Button onClick={OnGenerateTrip}>Generate Trip</Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="App Logo" className="mb-4" />
              <h2 className="font-bold text-lg">Sign in With Google</h2>
              <p className="text-gray-600 mb-5">
                Sign in to the App with Google Authentication Security
              </p>
              <Button
                onClick={() => login()}
                className="w-full gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;