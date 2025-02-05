import mongoose from "mongoose";

export const connectDB=async()=>{
    return await mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=>console.log("mongoDb connected successfully:)"))
    .catch((err)=>console.log("error connecting to mongoDb",err))
};