import express from 'express';  //set up express server
import mongoose from 'mongoose'; //use mongodb cloud service
import dotenv from 'dotenv'; //use hidden file 

dotenv.config();

//this connects our project to cluster
mongoose
    .connect(process.env.MONGO)
    .then(()=> {
        console.log("MongoDB is connected");
    })
    .catch((err)=>{
        console.log(err);
    });

//this hosts the server
const app = express();

//this checks for server on a particular port
app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});

