import mongoose from "mongoose";

const dbUserName = "kec";
const dbPassword = encodeURIComponent("kec1234");
const dbHost = "school.b6qkdnb.mongodb.net";
const dbName = "hcoe-pathao";
const dbOptions = "retryWrites=true&w=majority&appName=School";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUserName}:${dbPassword}@${dbHost}/${dbName}?${dbOptions}`
    );

    console.log("DB connection established...");
  } catch (error) {
    console.log("DB connection failed...");
    console.log(error.message);
    process.exit(1); //1 means exit with failure
  }
};

export default connectDB;
