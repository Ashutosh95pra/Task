const express = require("express");

const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  getTaskStats,
} = require("../controllers/task.controller");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Protect all task routes
router.use(authMiddleware);

// Create Task
router.post("/", createTask);

// Get Tasks
router.get("/", getAllTasks);

// Task Statistics
router.get("/stats", getTaskStats);

// Update Task
router.patch("/:id", updateTask);

// Delete Task
router.delete("/:id", deleteTask);

module.exports = router;