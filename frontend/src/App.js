import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Prediction from "./pages/Prediction";
import Auth from "./pages/Auth";
import { NavBar } from "./components/NavBar";
import About from "./pages/About";
import Credits from "./pages/Credits";

import "./App.css";
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Prediction />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/credits" element={<Credits />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
