import React, { useState } from "react";
import logoImg from "../../assets/logo_main.png";
import LoginScreen from "../login/login";
import "./register.css";
import Main from "../Main/Main";
import { useNavigate } from "react-router-dom";



const RegisterScreen = () => {  
  
  const [currentScreen, setCurrentScreen] = useState("register");


  const renderContent = () => { 

    if (currentScreen === "login") return <LoginScreen />;
    if (currentScreen === "main") return <Main />;

    const navigate = useNavigate();

    return (
      <div className="register-container">
      <div className="logo-section">
        <a onClick={() => navigate("/")}><img src={logoImg} alt="Noted Logo" className="logo"  /></a>
        <h1>Noted.</h1>
        <p>Jegyzeteid egyszerűen és rendszerezetten</p>
      </div>
      <div className="form-section">
        <form className="register-form">
          <input
            type="text"
            placeholder="felhasználónév"
            id="username"
            className="input-field"
          />
          <input
            type="email"
            placeholder="e-mail cím"
            id="email"
            className="input-field"
          />
          <input
            type="password"
            placeholder="jelszó"
            id="password"
            className="input-field"
          />
          
          <button type="submit" className="btn" onClick={
            (event) => {
              
                event.preventDefault();
                fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }),
                    body: JSON.stringify({
                        FelhasznaloNev: document.getElementById('username').value,
                        Jelszo: document.getElementById('password').value,
                        Email: document.getElementById('email').value, 
                        Statusz: 1,
                        JogosultsagId: 1
                    })
                })
                .then(response => response.json())
                .then(data => {
                  if (data.error) {
                    alert(data.error)
                    console.log(data.error)
                  } else {
                    alert(data.succes)
                    console.log(data.succes)
                    setCurrentScreen("login");
                  }
                })
                .catch(error => console.log(error));
          }}>
            Regisztráció
          </button>
        </form>
      </div>
    </div>
    )
    
  }
  
  

  return renderContent()

  
};

export default RegisterScreen;
