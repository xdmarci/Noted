import React, { useEffect } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const requestAdmin = () => {};

  const navigate = useNavigate();

  const checkProfile = () => {
    navigate("/profile");
  };

  const renderContent = () => {
    return (
      <div className="main-container">
        <input type="text" className="search-bar" placeholder="Keresés" />
        <div className="top-bar">
          <button className="new-note-btn">+ Új</button>

          <div className="buttons">
            <button onClick={checkProfile}>Profil</button>
            <button onClick={() => requestAdmin()}>Admin kérés</button>
          </div>
        </div>
        <div className="content">
          <div className="notes-section">
            <h2>Jegyzetek.</h2>
            <p className="empty-msg">
              Üres, mint egy új kezdet. Jegyzetelj valamit!
            </p>
          </div>
          <div className="shared-notes-section">
            <h2>Megosztott jegyzetek.</h2>
            <p className="empty-msg">
              Úgy tűnik, itt még senki nem osztott meg semmit... Kezdjétek el
              közösen!
            </p>
          </div>
        </div>
      </div>
    );
  };
  return renderContent();
};

export default Home;
