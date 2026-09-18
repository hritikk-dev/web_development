const express = require('express');
const router = express.Router();
const studentModel = require('./../models/student');
const mongoose = require('mongoose');

// Fetch all students
// router.get('/students', async (req, res) => {
//     // res.send("All students here")
//     try {

//         const data = await studentModel.find();
//         console.log("Students fetched");
//         res.status(200).json(data);

//     } catch (err) {
//         console.log(err);
//         res.status(404).json({
//             error: "data not found"
//         });

//     }
// })
// Fetch all students in ascending order according to Roll Number
router.get('/students', async (req, res) => {
    try {
        // ⭐ .sort({ RollNumber: 1 }) will sort data from lowest roll number to highest
        const data = await studentModel.find().sort({ RollNumber: 1 });
        
        console.log("Students fetched in ascending order by Roll No");
        res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(404).json({
            error: "data not found"
        });
    }
});


// fetch particular student
router.get('/student/:id', async (req, res) => {
    try {

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Student ID"
            });
        }
        const response = await studentModel.findById(id);

        console.log(response);
        res.status(200).json(response);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
})


// Add new student
router.post('/student', async (req, res) => {
    try {
        const data = req.body; // The data sent by the client
        console.log(data);

        // Create a new Student document using Mongoose
        const newStudentModel = new studentModel(data);
        console.log(newStudentModel);


        // Save the data to MongoDB Atlas
        const savedStudentModel = await newStudentModel.save();
        console.log(savedStudentModel);

        console.log("Data saved successfully!");
        res.status(201).json(savedStudentModel); // Respond with 201 Created and the saved data
    }
    catch (err) {
        console.error("Error saving student:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
});


// update a particular student data
router.put('/student/:id', async (req, res) => {
    try {

        const studentId = req.params.id;
        const updateData = req.body;

        console.log(studentId);
        console.log(updateData);

        const response = await studentModel.findByIdAndUpdate(
            studentId,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!response) {
            return res.status(404).json({
                message: "Student not found"
            });
        }
        res.status(200).json({ message: "Student Data Update Successfully." });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
    }
})


//     try {
//         const studentId = req.params.id;
//         const updateData = req.body;

//         console.log(studentId);
//         console.log(updateData);

//         const response = await studentModel.findByIdAndUpdate(
//             studentId,
//             updateData,
//             {
//                 new: true,
//                 runValidators: true
//             }
//         );

//         if (!response) {
//             return res.status(404).json({
//                 message: "Student not found"
//             });
//         }
//         res.status(200).json({ message: "Student Data Update Successfully." });

//     } catch (err) {
//         // 👇 IS WALE BLOCK KO APNE BACKEND ME PURANE CATCH KI JAGAH LAGAYEIN
//         console.error("❌ BACKEND UPDATE ERROR DETAILS:", err.message); 
        
//         res.status(500).json({ 
//             message: "Internal Server Error", 
//             error: err.message 
//         });
//     }
// });



// Delete a student
router.delete('/student/:id', async (req, res) => {
    try {

        const studentId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Student ID"
            });
        }
        const response = await studentModel.findByIdAndDelete(studentId);


        if (!response) {
            return res.status(404).json({
                message: 'STUDENT NOT FOUND'
            });
        }

        res.status(200).json({ message: "Student is deleted" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
})


module.exports = router;