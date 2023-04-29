import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { NavBar } from "./components/NavBar";
import Prediction from "./pages/Prediction";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Credits from "./pages/Credits";
import Data from "./pages/Data";
import theme from "./Theme";

function App() {
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <NavBar />
          <div>
            <Routes>
              <Route path="/" element={<Prediction />}></Route>
              <Route path="/auth" element={<Auth />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/credits" element={<Credits />}></Route>
              <Route path="/data" element={<Data />}></Route>
            </Routes>
          </div>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
