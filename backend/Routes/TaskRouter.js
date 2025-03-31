const {
  createTask,
  fetchAllTasks,
  updateTaskById,
  deleteTaskById,
  fetchTask,
} = require("../Controllers/TaskController");

const router = require("express").Router();

// To get all the tasks
router.get("/", fetchAllTasks);

// To create a task
router.post("/", createTask);

// To get specific a task
router.get("/:id", fetchTask);

// To update a task
router.put("/:id", updateTaskById);

// To delete a task
router.delete("/:id", deleteTaskById);

module.exports = router;
