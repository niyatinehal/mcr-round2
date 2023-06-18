import React, { useContext, useState } from "react";
import { HabitContext } from "../HabitContext";
import Modal from "react-modal";

export const Archive = () => {
  const { habits, dispatch, closeAddDialog, openAddDialog } =
    useContext(HabitContext);

  const [showModal, setShowModal] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);

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
      <h3>Archived Habits</h3>
      <ul>
        {habits?.archived.map((habit) => (
          <li key={habit.id}>
            <strong>{habit.name}</strong>
            <button onClick={() => openModal(habit)}>View Details</button>
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
              {/* {selectedHabit && (
                <div>
                  <h2>{selectedHabit.name}</h2>
                  <p>Goal: {selectedHabit.goal}</p>
                  <p>Frequency: {selectedHabit.frequency}</p>
                  <p>Start Date: {selectedHabit.startDate}</p>
                  <p>End Date: {selectedHabit.endDate}</p>
                  {selectedHabit.archived && <p>This habit is archived.</p>}
                  <button onClick={closeModal}>Close</button>
                </div>
              )} */}
            </Modal>
          </li>
        ))}
      </ul>
    </div>
  );
};
