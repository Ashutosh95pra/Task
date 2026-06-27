import { useState } from "react";
import axios from "axios";
import "./App.css";

import User from "./pages/User";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";
import Navbar from "./pages/NavBar";
import { Routes , Route  } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = async (task) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3008/api/tasks",
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Add the newly created task to the UI
      setTasks((prev) => [...prev, res.data.task]);

    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="app">
      <Navbar/>
      <User />
      <Routes>
  <Route path="/login" element={<Login />} />
</Routes>

      <TaskForm onAddTask={handleAddTask} />

      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
          />
        ))}
      </div>
    </div>
  );
}

export default App;