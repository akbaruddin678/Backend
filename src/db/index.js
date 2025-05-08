const mongoose = require("mongoose");
const { DB_NAME } = require("../constants");

const connectDB = async () => {
  try {
    const connectionResponse = await mongoose.connect(
      "mongodb://localhost:27017/NavttcProject"
      // "mongodb+srv://akbaruddin:akbar1234@cluster0.qiwplqn.mongodb.net/NavttcProject"
      // "mongodb+srv://akbaruddin:akbar1234@cluster0.eyhty.mongodb.net/NavttcProject?retryWrites=true&w=majority"
      // "mongodb+srv://mongo:mongo@cluster0.eyhty.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
    console.log(
      `\n MONGODB Connected .... DB HOST : ${connectionResponse.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB Connection Error", error);
    process.exit(1);
  }
};

module.exports = connectDB;
