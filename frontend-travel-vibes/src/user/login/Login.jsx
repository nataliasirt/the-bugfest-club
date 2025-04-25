import React, { useState, useEffect } from "react";
import "./Login.css";
import {
  GOOGLE_AUTH_URL,
  FACEBOOK_AUTH_URL,
  GITHUB_AUTH_URL,
  ACCESS_TOKEN,
} from "../../constants";
import { login } from "../../util/APIUtils";
import { Link, useNavigate, useLocation } from "react-router-dom";
import fbLogo from "../../img/fb-logo.png";
import googleLogo from "../../img/google-logo.png";
import githubLogo from "../../img/github-logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.error) {
      setTimeout(() => {
        toast.error(location.state.error);
        navigate(location.pathname, { replace: true, state: {} });
      }, 100);
    }
  }, [location, navigate]);

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">Login to Vibes Travel</h1>
        <SocialLogin />
        <div className="or-separator">
          <span className="or-text">OR</span>
        </div>
        <LoginForm navigate={navigate} />
        <span className="signup-link">
          New user? <Link to="/signup">Sign up!</Link>
        </span>
        <ToastContainer />
      </div>
    </div>
  );
};

const SocialLogin = () => {
  return (
    <div className="social-login">
      <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
        <img src={googleLogo} alt="Google" /> Log in with Google
      </a>
      <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
        <img src={fbLogo} alt="Facebook" /> Log in with Facebook
      </a>
      <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
        <img src={githubLogo} alt="Github" /> Log in with Github
      </a>
    </div>
  );
};

const LoginForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginRequest = {
      email,
      password,
    };

    console.log("Sending:", JSON.stringify(loginRequest));
    login(loginRequest)
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        toast.success("You're successfully logged in!");
        navigate("/dashboard"); // Direct navigation after login
      })
      .catch((error) => {
        toast.error(
          (error && error.message) ||
            "Oops! Something went wrong. Please try again!"
        );
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-item">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-item">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-item">
        <button type="submit" className="btn btn-block btn-primary">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
