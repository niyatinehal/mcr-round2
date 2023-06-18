import React, { useContext } from "react";
import { useState, useReducer } from "react";
import { HabitContext } from "../HabitContext";
import Modal from "react-modal";

import "./HabitTracker.css";

const HabitTrackerApp = () => {
  const { habits, dispatch } = useContext(HabitContext);
  console.log(habits);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [habitForm, setHabitForm] = useState({
    name: "",
    goal: "10 days",
    repeat: "Daily",
    startDate: "Today",
    timeOfDay: "Any-Time",
  });
  console.log(habits);

  const openAddDialog = () => {
    setShowAddDialog(true);
  };

  const closeAddDialog = () => {
    setShowAddDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHabitForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const addHabit = () => {
    const newHabit = {
      id: Date.now(),
      ...habitForm,
    };
    dispatch({ type: "ADD_HABIT", payload: newHabit });
    setHabitForm({
      name: "",
      goal: "10 days",
      repeat: "Daily",
      startDate: "Today",
      timeOfDay: "Any-Time",
    });
    closeAddDialog();
  };

  const editHabit = (habit) => {
    setHabitForm(habit);
    setShowAddDialog(true);
  };

  const updateHabit = () => {
    dispatch({ type: "EDIT_HABIT", payload: habitForm });
    setHabitForm({
      name: "",
      goal: "10 days",
      repeat: "Daily",
      startDate: "Today",
      timeOfDay: "Any-Time",
    });
    closeAddDialog();
  };

  const deleteHabit = (habitId) => {
    dispatch({ type: "DELETE_HABIT", payload: habitId });
  };

  const archiveHabit = (habitId) => {
    dispatch({ type: "ARCHIVE_HABIT", payload: habitId });
  };

  const openModal = (habit) => {
    setSelectedHabit(habit);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedHabit(null);
    setShowModal(false);
  };

  return (
    <div className="page">
      <h1>Habit Tracker</h1>
      <button onClick={openAddDialog}>Add a new habit</button>
      <hr></hr>
      <ul>
        {habits?.Habits?.map((habit) => (
          <li key={habit.id}>
            <div className="Card">
              <strong>{habit.name}</strong>
              <button onClick={() => editHabit(habit)}><i class="fa-solid fa-pen-to-square"></i></button>
              <button onClick={() => deleteHabit(habit.id)}>Delete</button>
              {!habit.archived && (
                <button onClick={() => archiveHabit(habit)}>Archive</button>
              )}
              <button onClick={() => openModal(habit)}>View Details</button>
            </div>
          </li>
        ))}
      </ul>
      {showAddDialog && (
        <div className="newTask">
          <h2>Add a new habit</h2>
          <form onSubmit={habitForm.id ? updateHabit : addHabit}>
          <div className="inputForm">
            <label>
                Name:
                <input
                required
                  type="text"
                  name="name"
                  value={habitForm.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Goal:
                <select
                  name="goal"
                  value={habitForm.goal}
                  onChange={handleInputChange}
                >
                  <option value="10 days">10 days</option>
                  <option value="15 days">15 days</option>
                </select>
              </label>
              <label>
                Repeat:
                <select
                  name="repeat"
                  value={habitForm.repeat}
                  onChange={handleInputChange}
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                </select>
              </label>
              <label>
                Start Date:
                <select
                  name="startDate"
                  value={habitForm.startDate}
                  onChange={handleInputChange}
                >
                  <option value="Today">Today</option>
                  <option value="Tomorrow">Tomorrow</option>
                </select>
              </label>
              <label>
                Time Of Day:
                <select
                  name="timeOfDay"
                  value={habitForm.timeOfDay}
                  onChange={handleInputChange}
                >
                  <option value="AnyTime">Any-Time</option>
                  <option value="afternoon">Afternoon</option>
                </select>
              </label>
          </div>
              
            

            <button type="submit">{habitForm.id ? "Update" : "Add"}</button>
            <button type="button" onClick={closeAddDialog}>
              Cancel
            </button>
          </form>
        </div>
      )}
      <Modal isOpen={showModal} onRequestClose={closeModal}>
        {selectedHabit && (
          <div>
            <h2>{selectedHabit.name}</h2>
            <p>Goal: {selectedHabit.goal}</p>
            <p>Repeat: {selectedHabit.repeat}</p>
            <p>Start Date: {selectedHabit.startDate}</p>
            <p>Time of Day: {selectedHabit.timeOfDay}</p>
            {selectedHabit.archived && <p>This habit is archived.</p>}
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default HabitTrackerApp;
