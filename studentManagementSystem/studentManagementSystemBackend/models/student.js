

const mongoose = require('mongoose');

const studentScema = new mongoose.Schema({
    RollNumber: {
        type: Number,
        required: true, 
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] 
    },
    phoneNumber: {
        type: String, // ⭐ FIX: String kiya taaki regex match validation perfectly kaam kare
        required: [true, 'Phone number is required'],
        trim: true,
        match: [/^\d{10}$/, 'Please fill a valid 10-digit phone number'] 
    },
    course: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: [5, 'Student age could not be less than 5'], 
        max: [100, 'Student age could not be more than 100'],
    },
    aadharCardNumber: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{12}$/, 'Please fill a valid 12-digit Aadhar Card number']
    },
});

const Student = mongoose.model('Student', studentScema);
module.exports = Student;
