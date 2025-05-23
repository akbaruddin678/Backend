require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
// const corsOptions = {
//   origin: "https://serene-gauss.210-56-25-68.plesk.page",
//   optionsSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

const userRouter = require("./routes/user");
const outcomeRouter = require("./routes/outcome");
const skilledWorker = require("./routes/skilledWorker");

app.use("/api/v1/users", userRouter);

app.use("/api/v1/outcomes", outcomeRouter);
app.use("/api/v1/skilledworker", skilledWorker);

app.use((err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  return res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || null,
  });
});

module.exports = app;
