import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditStudent() {
    const navigate = useNavigate();
    const { id } = useParams(); // URL se Student ki id read karne ke liye

    // State jo aapke data fields ko handle karegi
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        RollNumber: "",
        age: "",
        phoneNumber: "",
        aadharCardNumber: "",
        course: "",
    });

    const [loading, setLoading] = useState(true);

    // Page khulte hi Node.js API se data fetch karne ka logic
    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/student/${id}`);
                const result = await response.json();

                if (response.ok) {
                    setFormData(result); // State me data save ho jayega
                } else {
                    alert("Student data mil nahi paya!");
                    navigate("/");
                }
            } catch (err) {
                console.log("Error loading data: " + err);
                alert("Server issue! Data load nahi hua.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchStudentData();
    }, [id, navigate]);

    // Input fields me type karne ke liye change handler
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleDataUpdate = async (e) => {
        e.preventDefault(); // Page refresh hone se rokega

        try {
            const response = await fetch(`http://localhost:3000/student/${id}`, {
                method: "PUT", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Student record updated successfully! 🎉");
                navigate("/"); 
            } else {
                // extra dynamic alert logic
                if (result.details) {
                    alert(`Validation Error: ${result.details}`);
                } else if (result.message) {
                    alert(`Error: ${result.message}`);
                } else if (result.error) {
                    alert(`Error: ${result.error}`);
                } else {
                    alert("Failed to update student data!");
                }
            }
        } catch (err) {
            console.log("Error: " + err);
            alert("Server connect nahi ho paya!");
        }
    };

    if (loading) {
        return (
            <div style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }} className="min-h-screen flex items-center justify-center font-bold text-xs tracking-wider uppercase">
                Loading Student Profile...
            </div>
        );
    }
    return (
        <div style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }} className="min-h-screen antialiased">

            {/* Header Area */}
            <div style={{ backgroundColor: 'var(--bg-header)', color: 'var(--text-header)' }} className="px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-md">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Student Portal</h1>
                    <p className="text-xs opacity-80 mt-0.5 tracking-wide">Management Dashboard / Update Record</p>
                </div>

                <button
                    type="button"
                    onClick={() => navigate("/")}
                    style={{ backgroundColor: 'var(--bg-card)', color: 'var(--bg-header)' }}
                    className="font-semibold cursor-pointer text-xs px-5 py-2.5 rounded-md shadow-sm hover:opacity-90 transition-all duration-200"
                >
                    ← BACK TO DASHBOARD
                </button>
            </div>

            {/* Form Section Box */}
            <div className="max-w-[800px] mx-auto p-6 sm:p-8">
                <div style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }} className="p-6 sm:p-8 rounded-lg border shadow-sm">

                    <h2 className="text-2xl font-bold mb-6 tracking-tight border-b pb-3" style={{ borderColor: 'var(--border-color)' }}>
                        Modify Profile Details
                    </h2>

                    <form onSubmit={handleDataUpdate} className="space-y-5 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            {/* Name Input */}
                            <div className="sm:col-span-2">
                                <label style={{ color: 'var(--text-muted)' }} className="block text-[12px] font-bold uppercase tracking-wider mb-2">Full Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} className="w-full px-4 py-2.5 rounded border focus:outline-none focus:ring-1 focus:ring-blue-500 capitalize" required />
                            </div>

                            {/* Email Input */}
                            <div className="sm:col-span-2">
                                <label style={{ color: 'var(--text-muted)' }} className="block text-[12px] font-bold uppercase tracking-wider mb-2">Email Address</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} className="w-full px-4 py-2.5 rounded border focus:outline-none focus:ring-1 focus:ring-blue-500 lowercase" required />
                            </div>

                            {/* Roll No - Read Only design choice */}
                            <div className="sm:col-span-2">
                                <label style={{ color: 'var(--text-muted)' }} className="block text-[12px] font-bold uppercase tracking-wider mb-2">Roll No (Locked)</label>
                                <input type="text" name="RollNumber" value={formData.RollNumber} style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-color)', color: 'var(--text-muted)' }} className="w-full px-4 py-2.5 rounded border opacity-60 cursor-not-allowed" readOnly />
                            </div>

                            {/* Age Input */}
                            <div>
                                <label style={{ color: 'var(--text-muted)' }} className="block text-[12px] font-bold uppercase tracking-wider mb-2">Age</label>
                                <input type="number" name="age" value={formData.age} onChange={handleChange} style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} className="w-full px-4 py-2.5 rounded border focus:outline-none" required />
                            </div>

                            {/* Phone Input */}
                            <div>
                                <label style={{ color: 'var(--text-muted)' }} className="block text-[12px] font-bold uppercase tracking-wider mb-2">Phone Number</label>
                                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} className="w-full px-4 py-2.5 rounded border focus:outline-none" required />
                            </div>

                            {/* Aadhar Input */}
                            <div className="sm:col-span-2">
                                <label style={{ color: 'var(--text-muted)' }} className="block text-[12px] font-bold uppercase tracking-wider mb-2">Aadhar Card Number</label>
                                <input type="text" name="aadharCardNumber" value={formData.aadharCardNumber} onChange={handleChange} style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} className="w-full px-4 py-2.5 rounded border focus:outline-none" required />
                            </div>

                            {/* Course Input */}
                            <div className="sm:col-span-2">
                                <label style={{ color: 'var(--text-muted)' }} className="block text-[12px] font-bold uppercase tracking-wider mb-2">Course / Program</label>
                                <input type="text" name="course" value={formData.course} onChange={handleChange} style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} className="w-full px-4 py-2.5 rounded border focus:outline-none" required />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-4 flex flex-col sm:flex-row justify-end items-center gap-3">
                            <button type="button" onClick={() => navigate("/")} style={{ borderColor: 'var(--border-color)', color: 'var(--text-main)' }} className="w-full sm:w-auto font-semibold px-6 py-3 rounded-md border text-center hover:opacity-80 transition-all cursor-pointer">CANCEL</button>

                            <button type="submit" style={{ backgroundColor: 'var(--text-main)', color: 'var(--bg-main)' }} className="w-full sm:w-auto font-bold px-8 py-3 rounded-md tracking-wider text-center shadow hover:opacity-90 transition-all cursor-pointer">
                                UPDATE CHANGES 🎉

                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditStudent;
