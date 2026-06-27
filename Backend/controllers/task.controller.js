const Task = require("../models/Task");


const createTask = async (req, res) => {
  try {

    const task = await Task.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      task,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getAllTasks = async (req, res) => {

  try {

    const { status, priority, search, page = 1, limit = 10 } = req.query;

    let query = {
      createdBy: req.user.id,
    };

    if (status) query.status = status;

    if (priority) query.priority = priority;

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    let tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    
    const order = {
      High: 1,
      Medium: 2,
      Low: 3,
    };

    tasks.sort((a, b) => order[a.priority] - order[b.priority]);

    
    const today = new Date();

    const result = tasks.map((task) => ({
      ...task.toObject(),
      overdue:
        task.status !== "Done" &&
        new Date(task.dueDate) < today,
    }));

    res.json({
      success: true,
      count: result.length,
      tasks: result,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


const updateTask = async (req, res) => {

  try {

    const task = await Task.findOne({ _id: req.params.id, createdBy: req.user.id });


    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    

    if (
      task.status === "Todo" &&
      req.body.status === "Done"
    ) {
      return res.status(400).json({
        success: false,
        message: "Move task to In Progress first",
      });
    }

    Object.assign(task, req.body);

    await task.save();

    res.json({
      success: true,
      task,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete Task
const deleteTask = async (req, res) => {

  try {

    await Task.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Task deleted",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Stats
const getTaskStats = async (req, res) => {

  try {

    const tasks = await Task.find({
      createdBy: req.user.id,
    });

    const total = tasks.length;

    const completed = tasks.filter(
      (task) => task.status === "Done"
    ).length;

    const overdue = tasks.filter(
      (task) =>
        task.status !== "Done" &&
        new Date(task.dueDate) < new Date()
    ).length;

    const priority = {
      High: 0,
      Medium: 0,
      Low: 0,
    };

    tasks.forEach((task) => {
      priority[task.priority]++;
    });

    res.json({
      total,
      completed,
      overdue,
      priority,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  getTaskStats,
};