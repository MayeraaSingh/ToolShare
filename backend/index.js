import express from 'express';  //set up express server
import mongoose from 'mongoose'; //use mongodb cloud service
import dotenv from 'dotenv'; //use hidden file 
import userRoutes from './routes/userRoutes.js';
import toolRoutes from './routes/toolRoutes.js';
import cors from 'cors';
import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the correct path
dotenv.config({ path: path.join(__dirname, '.env') });

//this connects our project to cluster
mongoose
    .connect(process.env.MONGO)
    .then(()=> {
        console.log("MongoDB is connected");
    })
    .catch((err)=>{
        console.log(err);
    });

 
const app = express();
const upload = multer({
    dest: "uploads/", // Directory for uploaded files
    limits: { fileSize: 5 * 1024 * 1024 }, // File size limit: 5 MB
});

// Middleware for JSON and URL-encoded data
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Enable CORS for all routes or specify allowed origins
app.use(cors({
    origin: 'http://localhost:5173',  // Allow requests only from this frontend address
    methods: ['GET', 'POST', 'PUT'],        // Allow specific methods (GET, POST, etc.)
    credentials: true,                // If you need to handle cookies or other credentials
  }));


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