const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter a First Name"],
  },
  lastName: {
    type: String,
    required: [true, "Please enater a Last Name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please peovide a valid email"],
  },
  password: {
    type: String,
    minLength: 8,
    required: [true, "Please enter a password"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please enter a confirm password"],
    validate: {
      validator: function (val) {
        return val == this.password;
      },
      message: "Password and Confirm password must be same",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.checkPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("users", userSchema);
module.exports = User;
