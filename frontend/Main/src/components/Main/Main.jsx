import logoImg from "../../assets/logo_main.png";
import "./Main.scss";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import LoginScreen from "../login/login";
import RegisterScreen from "../register/register";

const Main = () => {
  const navigate = useNavigate();

  const [currentScreen, setCurrentScreen] = useState("/");

  const renderContent = () => {
    if (currentScreen === "login") return <LoginScreen />;
    if (currentScreen === "register") return <RegisterScreen />;
    return (
      <div className="main-site">
        <div className="main-container">
          <div className="card">
            <div className="content-container">
              <div className="logo-section">
                <img src={logoImg} alt="Noted Logo" className="logo" />
                <h1>Noted.</h1>
                <p>Jegyzeteid egyszerűen és rendszerezetten</p>
              </div>
              <div className="button-section">
                <button className="btn" onClick={() => navigate("/register")}>Regisztráció</button>
                <button className="btn" onClick={() => navigate("/login")}>Bejelentkezés</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};





export default Main;