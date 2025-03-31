import { API_URL } from "./Utils";

// Function to create a new task
export const CreateTask = async (taskObj) => {
  const url = `${API_URL}/tasks`;
  console.log("url ", url);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskObj),
  };
  try {
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};

// Function to fetch all tasks
export const GetAllTasks = async () => {
  const url = `${API_URL}/tasks`;
  console.log("url ", url);
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};

// Function to delete a task by ID
export const DeleteTaskById = async (id) => {
  const url = `${API_URL}/tasks/${id}`;
  console.log("url ", url);
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};

// Function to update a task by ID
export const UpdateTaskById = async (id, reqBody) => {
  const url = `${API_URL}/tasks/${id}`;
  console.log("url ", url);
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  };
  try {
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};
