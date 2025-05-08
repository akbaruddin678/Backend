import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { app } from "./app.js";
import connectDB from "./db/index.js";

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
