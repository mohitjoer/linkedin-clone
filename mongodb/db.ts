import mongoose from "mongoose"


const connectionString =`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster-1.hp54uzv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-1`

if (!connectionString) {
  throw new Error("Please provide a valid connection string");
}

const connectDB = async () => {
  if (mongoose.connection?.readyState >= 1) {
    return;
  }

  try {
    console.log("----Connecting to MongoDB----");
    await mongoose.connect(connectionString);
    console.log("----Connected to MongoDB----");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

export default connectDB;