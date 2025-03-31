const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please enter title"],
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: "Pending",
  },
  date: {
    type: Date,
  },
});

const TaskModel = mongoose.model("todos", TaskSchema);
module.exports = TaskModel;
