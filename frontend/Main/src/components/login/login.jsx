import React, { useState } from "react";
import logoImg from "../../assets/logo_main.png";
import "./login.css";
import Main from "../Main/Main";
import { useNavigate } from "react-router-dom"; // Import React Router's useNavigate

const LoginScreen = () => {

  const [currentScreen, setCurrentScreen] = useState("login");


  const renderContent = () => {

    if (currentScreen === "home") return <Main />;

    const navigate = useNavigate(); // Hook for navigation



    
    return (
      <div className="login-container">
        <div className="logo-section">
        <a onClick={() => setCurrentScreen("home")}><img src={logoImg} alt="Noted Logo" className="logo" /></a>
          <h1>Noted.</h1>
          <p>Jegyzeteid egyszerűen és rendszerezetten</p>
        </div>
        <div className="form-section">
          <form className="login-form">
            <input
              type="text"
              placeholder="e-mail cím"
              id="email"
              className="input-field"
            />
            <input
              type="password"
              id="password"
              placeholder="jelszó"
              className="input-field"
            />
            <button type="submit" className="btn" onClick={
              (event) => {
                event.preventDefault();
                fetch('http://localhost:3000/login', {
                  method:'POST',headers: new Headers(
                      {"Content-Type": "application/json",
                          "Accept": "application/json"}
                  ),
                  body:JSON.stringify({
                  Jelszo: document.getElementById('password').value,
                  Email: document.getElementById('email').value,})
              }).then(response => response.json())
                .then (data => {
                  if (data.error) {
                    alert(data.error)
                    console.log(data.error)
                  } else {
                    alert(data.succes)
                    console.log(data)
                    navigate("/home");
                  }
                })
              }
            }>
              Bejelentkezés
            </button>
          </form>
        </div>
      </div>
    );
  };

  return renderContent();
  
};

export default LoginScreen;
