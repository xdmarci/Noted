import React, { useState } from 'react';
import './home.css';
import Main from '../../../../Main/src/components/Main/Main';


const Home = () => {

  const [currentScreen, setCurrentScreen] = useState("home");

  const renderContent = () => {

    if (currentScreen === "main") return <Main />;

  return (
    <div>
      <h1>{}</h1>
      <button onClick={() => setCurrentScreen("main")}>Log Out</button>
    </div>
  );
  };
  return renderContent();
}

export default Home;