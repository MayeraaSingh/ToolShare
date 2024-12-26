import express from 'express';  //set up express server
import mongoose from 'mongoose'; //use mongodb cloud service
import dotenv from 'dotenv'; //use hidden file 
import userRoutes from './routes/userRoutes.js';
import toolRoutes from './routes/toolRoutes.js';
import cors from 'cors';
import multer from "multer";
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


// Add tool route
app.post("/api/tools/add", upload.single("image"), (req, res) => {
    const { owner, flatNumber, productName, description, max, price } = req.body;
    const image = req.file; // Uploaded file is here

    // Log the tool data
    console.log({ owner, flatNumber, productName, description, max, price, image });

    // Save data to database (mocked response here)
    res.status(200).json({ message: "Tool added successfully!" });
});


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