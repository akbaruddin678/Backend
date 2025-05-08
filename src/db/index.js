import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionResponse = await mongoose.connect(
      "mongodb+srv://<akbaruddin678>:<Chitral123@>@cluster0.pe0mstx.mongodb.net/"
    );
    console.log(
      `\n MONGODB Connected .... DB HOST : ${connectionResponse.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB Connection Error", error);
    process.exit(1);
  }
};

export default connectDB;
