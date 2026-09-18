
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddStudent() {
    const navigate = useNavigate();

    const handleDataSubmit = async (e) => {
        e.preventDefault(); // Page refresh hone se rokta hai

        try {
            const response = await fetch("http://localhost:3000/student", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), // Pura data object ek sath send hoga
            });

            const result = await response.json(); // Backend ka response data

            if (response.ok) {
                alert("Student registered successfully! 🎉");

                // Form fields ko wapas khali karne ke liye
                setFormData({
                    name: "",
                    email: "",
                    age: "",
                    phoneNumber: "",
                    aadharCardNumber: "",
                    course: "",
                });

                navigate("/"); // Dashboard par redirect karega
            } else {
                // console.log("Backend Error Details:", result)
                // alert(`Failed to save student: ${result.message || result.error || "Unknown Error"}`);
                // ⭐ DYNAMIC ALERT LOGIC: Jo cheez galat hogi uska exact alert dikhega
                if (result.details) {
                    alert(`Validation Error: ${result.details}`);
                } else if (result.message) {
                    alert(`Error: ${result.message}`);
                } else if (result.error) {
                    alert(`Error: ${result.error}`);
                } else {
                    alert("Failed to save student data!");
                }
            }

        } catch (err) {
            console.log("Error submitting form: " + err);
            alert("Server connect nahi ho paya! Check karein backend chal rha hai ya nahi.");
        }
    };



    // State to manage input fields matching your backend structure
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        RollNumber: "",
        age: "",
        phoneNumber: "",
        aadharCardNumber: "",
        course: "",
    });

    // Handle changes when typing in the input fields
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };



    return (
        // Matching Dashboard
        <div style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }} className="min-h-screen antialiased">

            {/* Matching Dashboard Header */}
            <div style={{ backgroundColor: 'var(--bg-header)', color: 'var(--text-header)' }} className="px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-md">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Student Portal</h1>
                    <p className="text-xs opacity-80 mt-0.5 tracking-wide">Management Dashboard / New Registration</p>
                </div>

                {/*Go Back Button */}
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    style={{ backgroundColor: 'var(--bg-card)', color: 'var(--bg-header)' }}
                    className="font-semibold cursor-pointer text-xs px-5 py-2.5 rounded-md shadow-sm hover:opacity-90 transition-all duration-200 flex items-center gap-2"
                >
                    ← BACK TO DASHBOARD
                </button>
            </div>

            {/*  Matching Layout Wrapper */}
            <div className="max-w-[800px]  mx-auto p-6 sm:p-8">

                {/*Matching Card Background and Border */}
                <div style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }} className="p-6 sm:p-8 rounded-lg border shadow-sm">

                    <h2 className="text-2xl font-bold mb-6  tracking-tight border-b pb-3" style={{ borderColor: 'var(--border-color)' }}>
                        Admission Enrollment Form
                    </h2>

                    <form onSubmit={handleDataSubmit} className="space-y-5 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            {/* Name Input */}
                            <div className="sm:col-span-2">
                                <label style={{ color: 'var(--text-muted)' }} className="block text-[12px] font-bold uppercase tracking-wider mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                    style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                                    className="w-full px-4 py-2.5 rounded border focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all capitalize"
                                    required
                                />
                            </div>

                            {/* Email Input */}
                            <div className="sm:col-span-2">
                                <label style={{ color: 'var(--text-muted)' }} className="block text-[12px] font-bold uppercase tracking-wider mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@portal.com"
                                    style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                                    className="w-full px-4 py-2.5 rounded border focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all lowercase"
                                    required
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label style={{ color: 'var(--text-muted)' }} className="block text-[12px] font-bold uppercase tracking-wider mb-2">
                                    Roll No
                                </label>
                                <input
                                    type="text"
                                    name="RollNumber"
                                    value={formData.RollNumber}
                                    onChange={handleChange}
                                    placeholder="Enter Roll Number"
                                    style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                                    className="w-full px-4 py-2.5 rounded border focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all capitalize"
                                    required
                                />
                            </div>

                            {/* Age Input */}
                            <div>
                                <label style={{ color: 'var(--text-muted)' }} className="block text-[12px] font-bold uppercase tracking-wider mb-2">
                                    Age (Years)
                                </label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    placeholder="e.g. 21"
                                    style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                                    className="w-full px-4 py-2.5 rounded border focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                                    required
                                />
                            </div>

                            {/* Course Input */}
                            <div>
                                <label style={{ color: 'var(--text-muted)' }} className="block text-[12px] font-bold uppercase tracking-wider mb-2">
                                    Enrolled Course
                                </label>
                                <input
                                    type="text"
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    placeholder="e.g. Computer Science"
                                    style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                                    className="w-full px-4 py-2.5 rounded border focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                                    required
                                />
                            </div>

                            {/* Phone Number Input */}
                            <div>
                                <label style={{ color: 'var(--text-muted)' }} className="block text-[12px] font-bold uppercase tracking-wider mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="10-digit number"
                                    style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                                    className="w-full px-4 py-2.5 rounded border focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                                    required
                                />
                            </div>

                            {/* Aadhar Number Input */}
                            <div>
                                <label style={{ color: 'var(--text-muted)' }} className="block text-[12px] font-bold uppercase tracking-wider mb-2">
                                    Aadhar Card Number
                                </label>
                                <input
                                    type="text"
                                    name="aadharCardNumber"
                                    value={formData.aadharCardNumber}
                                    onChange={handleChange}
                                    placeholder="12-digit identification"
                                    style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                                    className="w-full px-4 py-2.5 rounded border focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                                    required
                                />
                            </div>

                        </div>

                        {/* Action Buttons Section */}
                        <div className="flex justify-end gap-4 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>

                            {/* Cancel Button */}
                            <button
                                type="button"
                                onClick={() => navigate("/")}
                                style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
                                className="px-5 py-2.5 rounded border font-semibold hover:opacity-80 transition-all cursor-pointer"
                            >
                                Cancel
                            </button>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                style={{ backgroundColor: 'var(--bg-header)', color: 'var(--text-header)' }}
                                className="font-semibold cursor-pointer px-6 py-2.5 rounded shadow-sm hover:opacity-90 transition-all duration-200"
                            >
                                SAVE RECORD
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddStudent;
