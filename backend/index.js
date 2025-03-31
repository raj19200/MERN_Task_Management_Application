const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./Models/db");
const PORT = process.env.PORT || 8080;
const TaskRouter = require("./Routes/TaskRouter");
const UserRouter = require("./Routes/UserRouter");
const bodyParser = require("body-parser");
const cors = require("cors");

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.use(cors());

app.use(bodyParser.json());

app.use(cookieParser());

app.use("/user", UserRouter);

app.use("/tasks", TaskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT=${PORT}`);
});
