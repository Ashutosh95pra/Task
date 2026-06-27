import React, { useState } from "react";
import "./TaskForm.css";

function TaskForm({ onAddTask }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Todo",
    priority: "Medium",
    dueDate: "",
  });

  const handleChange = (e) => {
    setTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.title || !task.dueDate) {
      return alert("Please fill all required fields.");
    }

    if (onAddTask) {
      onAddTask(task);
    }

    setTask({
      title: "",
      description: "",
      status: "Todo",
      priority: "Medium",
      dueDate: "",
    });
  };

  return (
    <div className="task-form-container">
      <form className="task-form" onSubmit={handleSubmit}>
        <h2>Add New Task</h2>

        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={task.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Task Description"
          value={task.description}
          onChange={handleChange}
          rows="4"
        />

        <div className="form-row">
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
        />

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default TaskForm;