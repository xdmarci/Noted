import React, { useState } from "react";
import logoImg from "../../assets/logo_main.png";
import LoginScreen from "../login/login";
import "./register.css";
import Main from "../Main/Main";



const RegisterScreen = () => {  
  
  const [currentScreen, setCurrentScreen] = useState("register");


  const renderContent = () => { 

    if (currentScreen === "login") return <LoginScreen />;
    if (currentScreen === "home") return <Main />;

    return (
      <div className="register-container">
      <div className="logo-section">
        <a onClick={() => setCurrentScreen("home")}><img src={logoImg} alt="Noted Logo" className="logo"  /></a>
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
          
          <button type="submit" class="btn" onClick={
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
                .then(response => alert(response.message))
                .then(data => {
                    if (data.success) {
                        alert("Sikeres regisztráció!");
                    } else {
                        console.log(data.message);
                        alert("Hiba a regisztráció során!");
                    }
                })
                .catch(error => console.log(error));

                setCurrentScreen("login");
                
                
                
              
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
