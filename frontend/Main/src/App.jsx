import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../../home/src/components/Home/Home";
import Main from "./components/Main/Main";
import Register from "./components/register/register";
import Login from "./components/login/login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<Main/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        
      </Routes>
    </Router>
  );
};

export default App;