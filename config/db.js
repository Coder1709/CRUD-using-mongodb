import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL

);
    console.log(`Connected to MongoDb datatbase ${conn.connection.host}`);
  } catch (error) {
    console.log(`There is an error in yourcode ${error}`);
  }
  // Check if MongoDB is connected
  
};

export default  connectDB;
