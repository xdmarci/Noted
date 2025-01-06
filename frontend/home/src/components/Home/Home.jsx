import React, { useEffect } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const requestAdmin = () => {
    
   };


  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };
  
  const renderContent = () => {

    

    

  return (
    <body>
      <div class="main-container">
  <div class="top-bar">
    <button class="new-note-btn">+ Új</button>
    <input
      type="text"
      class="search-bar"
      placeholder="Keresés"
    />
    <div class="buttons">
      <button onClick={handleLogout}>Kijelentkezés</button>
      <button onClick={() => requestAdmin()}>Admin kérés</button>
    </div>
  </div>
  <div class="content">
    <div class="notes-section">
      <h2>Jegyzetek.</h2>
      <p class="empty-msg">
        Üres, mint egy új kezdet. Jegyzetelj valamit!
      </p>
    </div>
    <div class="shared-notes-section">
      <h2>Megosztott jegyzetek.</h2>
      <p class="empty-msg">
        Úgy tűnik, itt még senki nem osztott meg semmit... Kezdjétek el
        közösen!
      </p>
    </div>
  </div>
</div>
    </body>
  );
  };
  return renderContent();
}

export default Home;