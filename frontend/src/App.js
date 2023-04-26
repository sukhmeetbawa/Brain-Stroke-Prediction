import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Prediction from "./pages/Prediction";
import Auth from "./pages/Auth";
import { NavBar } from "./components/NavBar";
import About from "./pages/About";
import Credits from "./pages/Credits";
import theme from "./Theme";
import { ThemeProvider } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <NavBar />
          <div>
            {/* <div style={{ marginTop: "20px" }}> */}
            <Routes>
              <Route path="/" element={<Prediction />}></Route>
              <Route path="/auth" element={<Auth />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/credits" element={<Credits />}></Route>
            </Routes>
          </div>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
