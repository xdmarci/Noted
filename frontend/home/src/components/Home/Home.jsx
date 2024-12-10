import React from 'react';
import { useNavigate } from "react-router-dom"; // Import React Router's useNavigate
import './home.css';


const Home = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div>
      <h1>{}</h1>
      <button onClick={() => navigate("/")}>Log Out</button>
    </div>
  );
};

export default Home;