const express = require("express");
const morgan = require("morgan");
const tourRoutes = require("./routes/tourRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/users", userRoutes);

// Routes

module.exports = app;
