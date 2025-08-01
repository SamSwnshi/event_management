import React from "react";
import { useNavigate } from "react-router-dom";
import "../Home.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <h1>
        Welcome to <span className="highlight">The Social Hub</span>
      </h1>
      <p>
        Your one-stop hub for <span className="highlight">exciting events</span> — meet, explore, and experience like never before!
      </p>
      <button className="explore-btn" onClick={() => navigate("/events")}>Explore Events</button>
    </div>
  );
};

export default Home;