import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Aditya_001:MyP40ssword@cluster0.v07ix.mongodb.net/food-del?retryWrites=true&w=majority&appName=Cluster0');
    console.log("DB Connected");
  } catch (err) {
    console.error("Connection error:", err.message);
  }
};
