import React from "react";
import { createContext } from "react";
import { useReducer } from "react";

export const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const habitReducer = (state, action) => {
    switch (action.type) {
      case "ADD_HABIT":
        return {
          ...state,
          Habits: [...state.Habits, action.payload],
        };
      case "EDIT_HABIT":
        return {
          ...state,
          Habits: state?.Habits?.map((habit) => {
            if (habit.id === action.payload.id) {
              return action.payload;
            }
            return habit;
          }),
        };
      case "DELETE_HABIT":
        return {
          ...state,
          Habits: state?.Habits?.filter((habit) => habit.id !== action.payload),
        };

      case "ARCHIVE_HABIT": {
        console.log(
          state.Habits.filter((habit) => habit.id !== action.payload.id)
        );
        return {
          ...state,
          Habits: state.Habits.filter(
            (habit) => habit.id !== action.payload.id
          ),
          archived: [...state.archived, action.payload],
        };
      }

      case "ADD_DIALOG":
        return{
            ...state,
            showAddDialog:action.payload
        }

      default:
        return state;
    }
  };

  const [habits, dispatch] = useReducer(habitReducer, {
    Habits: [],
    archived: [],
    showAddDialog:false
  });

    const openAddDialog = () => {
    dispatch({type:"ADD_DIALOG",payload:true})
  };

  const closeAddDialog = () => {
    dispatch({type:"CLOSE_DIALOG",payload:false})
  };

 const deleteHabit = (habitId) => {
    dispatch({ type: "DELETE_HABIT", payload: habitId });
  };


  return (
    <HabitContext.Provider value={{ habits, dispatch,openAddDialog,deleteHabit, closeAddDialog }}>
      {children}
    </HabitContext.Provider>
  );
};
