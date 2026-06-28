import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../pages/NavBar";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";

function TaskPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3008/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data.tasks);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddTask = async (task) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3008/api/tasks",
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app">
      <Navbar />
      <TaskForm onAddTask={handleAddTask} />

      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default TaskPage;