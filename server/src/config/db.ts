import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI as string);

    console.log("✅ MongoDB Connected Successfully");
     console.log("Database Name:", mongoose.connection.name);
    console.log("Database Host:", mongoose.connection.host);
    
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;