const mongoose = require("mongoose");
const { DB_NAME } = require("../constants");

const connectDB = async () => {
  try {
    const connectionResponse = await mongoose.connect(
      "mongodb+srv://akbaruddin:akbar1234@cluster0.qiwplqn.mongodb.net/NavttcProject"
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
