import logo from './logo.svg';
import './App.css';
import { Routes,Route, NavLink } from 'react-router-dom';
import HabitTrackerApp from './HabitTracker';
import { Archive } from './Archive';
import { useContext } from 'react';
import { HabitContext } from './HabitContext';

function App() {
  const{habits}=useContext(HabitContext);
  return (
    <div className="App">
    <NavLink to="/">Home</NavLink>
    <NavLink to="/archive">Archive</NavLink>
    <Routes>
      <Route path='/' element={<HabitTrackerApp/>}/>
      <Route path="/archive" element={<Archive/>}/>
    </Routes>
    </div>
  );
}

export default App;
