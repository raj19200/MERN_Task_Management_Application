import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

import { notify } from "../Utils/Utils";
import {
  CreateTask,
  DeleteTaskById,
  GetAllTasks,
  UpdateTaskById,
} from "../Utils/Api";

function TaskManager() {
  const [input, setInput] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState([]);
  const [copyTasks, setCopyTasks] = useState([]);
  const [updateTask, setUpdateTask] = useState(null);
  const [sortBy, setSortBy] = useState("date");
  const [filterStatus, setFilterStatus] = useState("all");
  const [errors, setErrors] = useState({ title: "", description: "" });

  // Update the input fields when updating an existing task
  useEffect(() => {
    if (updateTask) {
      setInput({
        title: updateTask.title,
        description: updateTask.description,
      });
    }
  }, [updateTask]);

  // Fetch all tasks when the component is mounted
  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = async () => {
    try {
      const { data } = await GetAllTasks();
      setTasks(data);
      setCopyTasks(data); // Keep a copy of tasks for filtering and sorting
    } catch (err) {
      console.error(err);
      notify("Failed to fetch tasks", "error");
    }
  };

  // Validate input before adding or updating a task
  const validateInput = () => {
    let isValid = true;
    const newErrors = { title: "", description: "" };

    if (!input.title.trim() || /\d/.test(input.title)) {
      newErrors.title = "Title must be a string and cannot contain numbers.";
      isValid = false;
    }
    if (!input.description.trim() || /\d/.test(input.description)) {
      newErrors.description =
        "Description must be a string and cannot contain numbers.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle task creation or update based on the presence of the updateTask
  const handleTask = async () => {
    if (validateInput()) {
      if (updateTask) {
        await handleUpdateItem({ ...updateTask, ...input });
      } else {
        await handleAddTask();
      }
      setInput({ title: "", description: "" });
      setErrors({ title: "", description: "" }); // Clear errors after successful submission
    }
  };

  // Handle adding a new task
  const handleAddTask = async () => {
    try {
      const { success, message } = await CreateTask(input);
      notify(message, success ? "success" : "error");
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  };

  // Handle updating an existing task
  const handleUpdateItem = async (task) => {
    try {
      const { success, message } = await UpdateTaskById(task._id, task);
      notify(message, success ? "success" : "error");
      setUpdateTask(null);
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Failed to update task", "error");
    }
  };

  // Handle deleting a task
  const handleDeleteTask = async (id) => {
    try {
      const { success, message } = await DeleteTaskById(id);
      notify(message, success ? "success" : "error");
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Failed to delete task", "error");
    }
  };

  // Handle status change of a task
  const handleStatusChange = async (task, newStatus) => {
    await handleUpdateItem({ ...task, status: newStatus });
  };

  // Handle sorting of tasks based on user selection
  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  // Handle filtering of tasks based on status selection
  const handleFilter = (e) => {
    setFilterStatus(e.target.value);
  };

  // Filter and sort the tasks based on the selected criteria
  const sortedFilteredTasks = copyTasks
    .filter(
      (task) =>
        filterStatus === "all" ||
        task.status.toLowerCase() === filterStatus.toLowerCase()
    )
    .sort((a, b) =>
      sortBy === "date"
        ? new Date(b.date) - new Date(a.date)
        : a.title.localeCompare(b.title)
    );

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Task Management Application</h1>

      <div className="mb-3">
        <input
          type="text"
          value={input.title}
          onChange={(e) => setInput({ ...input, title: e.target.value })}
          className="form-control"
          placeholder="Task Title"
        />
        {errors.title && <small className="text-danger">{errors.title}</small>}
      </div>

      <div className="mb-3">
        <input
          type="textarea"
          value={input.description}
          onChange={(e) => setInput({ ...input, description: e.target.value })}
          className="form-control"
          placeholder="Task Description"
        />
        {errors.description && (
          <small className="text-danger">{errors.description}</small>
        )}
      </div>

      <button onClick={handleTask} className="btn btn-success mb-4">
        <FaPlus /> {updateTask ? "Update Task" : "Add Task"}
      </button>

      <div className="mb-4 d-flex">
        <select onChange={handleSort} className="form-select me-2">
          <option value="date">Sort by Date</option>
          <option value="title">Sort by Title</option>
        </select>
        <select onChange={handleFilter} className="form-select">
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="list-group">
        {sortedFilteredTasks.length === 0 ? (
          <h1 className="text-center mt-5">Please Add Task</h1>
        ) : (
          sortedFilteredTasks.map((task) => (
            <div
              key={task._id}
              className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start task-item"
            >
              <div className="flex-grow-1 w-75">
                <h3
                  className={
                    task.status === "completed"
                      ? "text-decoration-line-through"
                      : ""
                  }
                >
                  {task.title}
                </h3>
                <p className="mb-1 ">{task.description}</p>
                <h4>Status : {task.status}</h4>
                <h4>
                  Created:{" "}
                  {task.date ? new Date(task.date).toLocaleDateString() : "N/A"}
                </h4>
              </div>
              <div className="d-flex align-items-center mt-2 mt-md-0">
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task, e.target.value)}
                  className="form-select me-2"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button
                  onClick={() => setUpdateTask(task)}
                  className="btn btn-primary me-2"
                >
                  <FaPencilAlt />
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="btn btn-danger"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default TaskManager;
