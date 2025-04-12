import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, BrowserRouter as Router } from 'react-router-dom';
import AppHeader from './common/AppHeader';
import Login from './user/login/Login';
import Signup from './user/signup/Signup';
import Profile from './user/profile/Profile';
import OAuth2RedirectHandler from './user/oauth2/OAuth2RedirectHandler';
import NotFound from './common/NotFound';
import LoadingIndicator from './common/LoadingIndicator';
import { getCurrentUser } from './util/APIUtils';
import { ACCESS_TOKEN } from './constants';
import Home from "./Home";
import CreateTripForm from "./CreateTripForm";
import TripDetail from "./TripDetail";
import NavBar from "./components/NavBar";
import './App.css';

import WelcomeDashboard from './components/DashBoard';
import { toast } from 'react-toastify';
import TripPage from "./TripPage";


const PrivateRoute = ({ authenticated, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      console.log("User not authenticated, redirecting to login...");
      navigate('/login');
    }
  }, [authenticated, navigate]);

  return authenticated ? children : null;
};

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCurrentlyLoggedInUser = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      // Check if the token is valid (Optional)
      getCurrentUser()
        .then(response => {
          setCurrentUser(response);
          setAuthenticated(true);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false); // Handle failed API call (e.g., token invalid)
          setAuthenticated(false); // Ensure the state is reset if the token is invalid
        });
    } else {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN); // Remove the token from storage
    setAuthenticated(false); // Update the state
    setCurrentUser(null); // Clear the current user
    toast.success("You're safely logged out!");
    navigate('/login'); // Redirect to login page
  };

  useEffect(() => {
    loadCurrentlyLoggedInUser();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar authenticated={authenticated} onLogout={handleLogout} />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-trip" element={<CreateTripForm />} />


            <Route path="/explore" element={<TripDetail />} />
            <Route path="/trip" element={<TripDetail />} />
            <Route path="/login" element={<Login authenticated={authenticated} />} />
            <Route path="/signup" element={<Signup authenticated={authenticated} />} />
            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
            <Route path="/profile" element={
              <PrivateRoute authenticated={authenticated}>
                <Profile currentUser={currentUser} />
              </PrivateRoute>} />
            <Route path="/dashboard" element={
              <PrivateRoute authenticated={authenticated}>
                <WelcomeDashboard username={currentUser?.username || 'Guest'} />
              </PrivateRoute>} />
            <Route path="/about" element={<div>About Page (Coming Soon)</div>} />
            <Route path="*" element={<NotFound />} />
              
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
