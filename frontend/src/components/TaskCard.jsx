import React from "react";
import "./TaskCard.css";

function TaskCard({ task, onDelete, onEdit }) {
  if (!task) return null;

  const isOverdue =
    task.dueDate &&
    task.status !== "Done" &&
    new Date(task.dueDate) < new Date();

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>

        {isOverdue && (
          <span className="overdue-badge">
            Overdue
          </span>
        )}
      </div>

      <p className="task-description">
        {task.description || "No description available"}
      </p>

      <div className="task-details">
        <p>
          <strong>Status:</strong> {task.status}
        </p>

        <p>
          <strong>Priority:</strong> {task.priority}
        </p>

        <p>
          <strong>Due Date:</strong>{" "}
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString()
            : "Not Set"}
        </p>
      </div>

      <div className="task-buttons">
        <button
          className="edit-btn"
          onClick={() => onEdit && onEdit(task)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete && onDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;