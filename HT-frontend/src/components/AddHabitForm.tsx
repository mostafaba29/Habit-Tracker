import React, { useState } from "react";
import "../assets/styles/AddHabitFormStyle.css";
import axios from "axios";

interface Habit {
  name: string;
  description: string;
  frequency: {
    type: string;
    value: number;
  };
  time: number;
}

interface Props {
  onSubmit: () => void;
}
const AddHabitForm: React.FC<Props> = ({ onSubmit }) => {
  const [habit, setHabit] = useState<Habit>({
    name: "",
    description: "",
    frequency: {
      type: "",
      value: 0,
    },
    time: 0,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = axios.post("http://localhost:3000/api/v1/habits", habit);
      console.log(response);
      setHabit({
        name: "",
        description: "",
        frequency: {
          type: "",
          value: 0,
        },
        time: 0,
      });
      onSubmit();
    } catch (error) {
      console.error("error during adding habit", error);
    }
  };

  return (
    <div className="add-habit-form">
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Habit Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={habit.name}
            onChange={(event) =>
              setHabit({ ...habit, name: event.target.value })
            }
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="description">Discription</label>
          <input
            type="text"
            id="description"
            name="description"
            value={habit.description}
            onChange={(event) =>
              setHabit({ ...habit, description: event.target.value })
            }
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="frequency">Frequency</label>
          <select
            id="frequency"
            name="frequency"
            value={habit.frequency.type}
            onChange={(event) =>
              setHabit({
                ...habit,
                frequency: { ...habit.frequency, type: event.target.value },
              })
            }
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <input
            type="text"
            id="freqTime"
            name="freqTime"
            value={habit.frequency.value}
            onChange={(event) =>
              setHabit({
                ...habit,
                frequency: {
                  ...habit.frequency,
                  value: parseInt(event.target.value),
                },
              })
            }
          />
        </div>
        <div className="form-control">
          <label htmlFor="time">Time</label>
          <input
            type="number"
            id="time"
            name="time"
            value={habit.time}
            onChange={(event) =>
              setHabit({ ...habit, time: parseInt(event.target.value) })
            }
            required
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddHabitForm;
