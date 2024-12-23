import express from 'express';  //set up express server
import mongoose from 'mongoose'; //use mongodb cloud service
import dotenv from 'dotenv'; //use hidden file 
import userRoutes from './routes/userRoutes.js';
import toolRoutes from './routes/toolRoutes.js';

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

// Middleware to parse JSON
app.use(express.json());

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/tools', toolRoutes);

//this checks for server on a particular port
app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});

