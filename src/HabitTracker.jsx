import React, { useContext } from "react";
import { useState, useReducer } from "react";
import { HabitContext } from "./HabitContext";
import Modal from "react-modal";

// const habitReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_HABIT":
//       return {
//         ...state,
//         Habits:[...state.Habits,action.payload]
//       };
//     case "EDIT_HABIT":
//       return state.map((habit) => {
//         if (habit.id === action.payload.id) {
//           return action.payload;
//         }
//         return habit;
//       });
//     case "DELETE_HABIT":
//       return state.filter((habit) => habit.id !== action.payload);

//     case "ARCHIVE_HABIT":{
//       return {
//         ...state,
//         archivedHabits: [...state.archivedHabits, action.payload],
//       };
//         //  return state.map((habit)=>{
//         //   if(habit.id===action.payload){
//         //     return {...habit,archived:true }
//         //   }else{
//         //     return habit
//         //   }
//         // })
//     }

//     default:
//       return state;

//   }
// };

const HabitTrackerApp = () => {
  const { habits, dispatch } = useContext(HabitContext);
  console.log(habits);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [habitForm, setHabitForm] = useState({
    name: "",
    goal: "",
    frequency: "",
    startDate: "",
    endDate: "",
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
      goal: "",
      frequency: "",
      startDate: "",
      endDate: "",
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
      goal: "",
      frequency: "",
      startDate: "",
      endDate: "",
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
    <div>
      <h1>Habit Tracker</h1>
      <button onClick={openAddDialog}>Add a new habit</button>
      <ul>
        {habits?.Habits?.map((habit) => (
          <li key={habit.id}>
            <div>
              <strong>{habit.name}</strong>
              <button onClick={() => editHabit(habit)}>Edit</button>
              <button onClick={() => deleteHabit(habit.id)}>Delete</button>
              {!habit.archived && (
                <button onClick={() => archiveHabit(habit)}>Archive</button>
              )}
              <button onClick={() => openModal(habit)}>View Details</button>
            </div>
            <div>
              <p>Goal: {habit.goal}</p>
              <p>Frequency: {habit.frequency}</p>
              <p>Start Date: {habit.startDate}</p>
              <p>End Date: {habit.endDate}</p>
            </div>
          </li>
        ))}
      </ul>
      {showAddDialog && (
        <div>
          <h2>Add a new habit</h2>
          <form onSubmit={habitForm.id ? updateHabit : addHabit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={habitForm.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Goal:
              <input
                type="text"
                name="goal"
                value={habitForm.goal}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Frequency:
              <input
                type="text"
                name="frequency"
                value={habitForm.frequency}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Start Date:
              <input
                type="text"
                name="startDate"
                value={habitForm.startDate}
                onChange={handleInputChange}
              />
            </label>
            <label>
              End Date:
              <input
                type="text"
                name="endDate"
                value={habitForm.endDate}
                onChange={handleInputChange}
              />
            </label>
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
            <p>Frequency: {selectedHabit.frequency}</p>
            <p>Start Date: {selectedHabit.startDate}</p>
            <p>End Date: {selectedHabit.endDate}</p>
            {selectedHabit.archived && <p>This habit is archived.</p>}
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default HabitTrackerApp;
