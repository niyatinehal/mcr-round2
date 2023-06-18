import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import HabitTrackerApp from "./Home/HabitTracker";
import { Archive } from "./Archive/Archive";
import { useContext } from "react";
import { HabitContext } from "./HabitContext";

function App() {
  const { habits } = useContext(HabitContext);
  return (
    <div className="App">
      <nav>
        <NavLink to="/" className="nav">
          Home
        </NavLink>
        <NavLink to="/archive" className="nav">
          Archive
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HabitTrackerApp />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
    </div>
  );
}

export default App;
