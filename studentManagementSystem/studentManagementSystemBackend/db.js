// SABSE UPAR YEH LINES ADD KAREIN
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Google DNS force karega


// import mongoose for connect MongoDB to Node.js
require('dotenv').config();
const mongoose = require('mongoose');


// Define MongoDB connection URL 
const mongoURL =process.env.MONGODB_URL;  

// Connect to MongoDB
mongoose.connect(mongoURL);

// Default connection object
const db = mongoose.connection;

// Event listeners optional
db.on('connected', () => {
    console.log("Connected to MongoDB server ...");
});

db.on('error', (err) => {
    console.log("MongoDB connection error:", err);
});

db.on('disconnected', () => {
    console.log("MongoDB disconnected");
});

// Export
module.exports = db;