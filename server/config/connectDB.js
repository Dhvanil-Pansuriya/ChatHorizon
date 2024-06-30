import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionString = await mongoose.connect(
      `${process.env.MONGOOSE_URI}/${process.env.DBNAME}`
    );

    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connect to DB");
    });

    connection.on("error", (error) => {
      console.log("Something wrong at Mongoose establish : ", error);
    });
  } catch (error) {
    console.log("Error Accrued at 'connectDB.js' : ", error);
  }
};

export default connectDB;
