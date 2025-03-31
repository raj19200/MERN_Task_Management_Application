const bcrypt = require("bcrypt");
const User = require("../Models/UserModel");

// Register function
exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "Fail",
        message: "Passwords do not match",
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        status: "Fail",
        message: "User already exists with this email",
      });
    }

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });

    res.status(201).json({
      status: "Success",
      message: "User registered successfully",
      data: { user },
    });
  } catch (err) {
    console.error("Error in register function:", err);
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

// Login function
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        status: "Fail",
        message: "Please provide email and password",
      });
    }

    // Find user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        status: "Fail",
        message: "Incorrect email or password",
      });
    }

    // Compare the passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: "Fail",
        message: "Incorrect email or password",
      });
    }

    // Login successful
    res.status(200).json({
      status: "Success",
      message: "Login successful",
      data: { user },
    });
  } catch (err) {
    console.error("Error in login function:", err);
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};
