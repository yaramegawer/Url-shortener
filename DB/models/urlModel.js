import { model, Schema } from "mongoose";

const urlSchema=new Schema({
    originalUrl:String,
    shortUrl:String
},{timestamps:true});

export const URL=model("URL",urlSchema);