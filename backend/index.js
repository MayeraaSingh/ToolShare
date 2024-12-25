import express from 'express';  //set up express server
import mongoose from 'mongoose'; //use mongodb cloud service
import dotenv from 'dotenv'; //use hidden file 
import userRoutes from './routes/userRoutes.js';
import toolRoutes from './routes/toolRoutes.js';
import cors from 'cors';

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

// Enable CORS for all routes or specify allowed origins
app.use(cors({
    origin: 'http://localhost:5173',  // Allow requests only from this frontend address
    methods: ['GET', 'POST'],        // Allow specific methods (GET, POST, etc.)
    credentials: true,                // If you need to handle cookies or other credentials
  }));

// Middleware to parse JSON
app.use(express.json());

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/tools', toolRoutes);

//this checks for server on a particular port
app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server Error';
    res.status(statusCode).json ({
        success: false,
        statusCode,
        message

    });
});