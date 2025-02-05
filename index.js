import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './DB/connection.js';
import  {nanoid}  from 'nanoid';
import { asyncHandler } from './utils/asyncHandler.js';
import { URL } from './DB/models/urlModel.js';
const app = express()
const port = 3000
dotenv.config();

await connectDB();

app.use(express.json())

app.post('/shorten',asyncHandler (async(req, res) => {
    const {originalUrl}=req.body;

    if(!originalUrl)
        return next(new Error("Url is required!",{cause:404}));

    const shortId=nanoid(8);

    await URL.create({originalUrl,shortUrl:shortId})

    res.status(200).json({
        success:true,
        shortId,
        message:"Url created successfully!"
    })

}));

app.get('/:shortid',asyncHandler(async(req,res)=>{
    const {shortid}=req.params;

    const url=await URL.findOne({shortUrl:shortid});

    if(url){
        res.redirect(url.originalUrl);
    }else{
        res.status(404).json({
            success:false,
            message:"Url not found!"
        });
    }
}))


app.all('*',(req,res,next)=>{
    return next(new Error('page not found!!',{cause:404}))
})

app.use((error,req, res,next) => {
    const statusCode=error.cause||500;
    res.status(statusCode).json({
        success:false,
        message:error.message,
        stack:error.stack
    });
});

app.listen(port, () => console.log(`App listening at http://localhost:3000`))