const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const userRoute = require("./Routes/userRoute");
const boardRoute = require("./Routes/boardRoute");
const listRoute = require("./Routes/listRoute");
const taskRoute = require("./Routes/taskRoute");
const fileUpload = require('express-fileupload');
const cors = require("cors");
const path = require("path");

const app = express();

const port = process.env.PORT || 6080;
// const HOST = '0.0.0.0'; 
const mongo_url = process.env.MONGO_URL;

// Allowed Origins for Development and Production
const allowedOrigins = [
    "http://localhost:5173",
    "https://plannex.ain360.in"
]; 

// CORS Configuration
app.use(
    cors({
        origin: function (origin, callback) {
            // Agar origin allowedOrigins list me hai ya origin undefined (e.g., Postman)
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: "GET,POST,PUT,PATCH,DELETE",
        credentials: true,
    })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Routes
app.use("/newuser", userRoute);
app.use("/newboard", boardRoute);
app.use("/newlist", listRoute);
app.use("/newtask", taskRoute);

// Test API
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// MongoDB Connection
mongoose.connect(mongo_url)
    .then(() => {
        console.log("Connection Successful with MongoDB");
    })
    .catch((e) => {
        console.log("Error with MongoDB connection", e);
    });

// Server
app.listen(port, () => {
    console.log(`Server is running on Port Number ${port}`);
});
