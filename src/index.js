require("dotenv").config();
const express = require("express");
const app = require("./app"); // Assuming app.js exports app with module.exports
const connectDB = require("./db/index"); // Same here

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR IN APP ", error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is Running at PORT : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB Connection Failed", err);
  });
