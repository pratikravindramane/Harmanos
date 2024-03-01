const express = require("express");
const cors = require("cors");
const coookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const { errorHandler } = require("./middleware/errorHandler");
app.use("/public", express.static("public"));
// Connect MongoDB.
const connect = () => {
  try {
    mongoose.connect(process.env.DB);
    console.log("connected to database");
  } catch (error) {
    throw new Error(error);
  }
};

// middlewares
app.use(cors());
app.use(express.json());
app.use(coookieParser());
// routes
app.use("/instructor", require("./route/auth"));
app.use("/course", require("./route/course"));
app.use(errorHandler);

// run on port
app.listen(process.env.PORT, () => {
  console.log(`connected to server at port ${process.env.PORT}`);
  connect();
});
