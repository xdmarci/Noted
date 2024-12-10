import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Main from "../../Main/src/components/Main/Main";
import Home from "./components/Home/Home";


function App() {

  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
