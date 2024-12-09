import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../../home/src/components/Home/Home";
import Main from "./components/Main/Main";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;