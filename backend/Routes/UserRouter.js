const express = require("express");
const userController = require("../Controllers/UserController");
const router = express.Router();

// Register User
router.post("/register", userController.register);

// Login User
router.post("/login", userController.login);

module.exports = router;
