import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Utils/Utils";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear any previous error messages
    setErrorMessage("");

    try {
      // Send login data to the backend API using fetch
      const response = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // If response status is not OK, throw an error
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed. Please try again.");
      }

      // If login is successful, set isLoggedIn to true and redirect
      setIsLoggedIn(true);

      navigate("/"); // Change to your desired route
    } catch (error) {
      // If an error occurs, set the error message
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <p className="mt-3 text-center">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
