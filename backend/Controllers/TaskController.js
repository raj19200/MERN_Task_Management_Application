const TaskModel = require("../Models/TaskModel");
// Method to create a new task
const createTask = async (req, res) => {
  const data = { ...req.body, date: new Date() };

  try {
    const model = new TaskModel(data);
    await model.save();
    res.status(201).json({ message: "Task is created", success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to create task", success: false });
  }
};
// Method to fetch all tasks
const fetchAllTasks = async (req, res) => {
  try {
    const data = await TaskModel.find({});
    res.status(200).json({ message: "All Tasks", success: true, data });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get all tasks", success: false });
  }
};

// Method to fetch a task by its ID
const fetchTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await TaskModel.findById(id);
    res
      .status(200)
      .json({ message: "Fetched Requested Task", success: true, task });
  } catch (err) {
    res.status(500).json({ message: "Failed to get task", success: false });
  }
};

// Method to update a task by its ID
const updateTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const obj = { $set: { ...body } };
    await TaskModel.findByIdAndUpdate(id, obj);
    res.status(200).json({ message: "Task Updated", success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to updated task", success: false });
  }
};

// Method to delete a task by its ID
const deleteTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    await TaskModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Task is deleted", success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task", success: false });
  }
};

module.exports = {
  createTask,
  fetchAllTasks,
  fetchTask,
  updateTaskById,
  deleteTaskById,
};
