
import React, { useState, useEffect } from "react";
import './../component/dashboard.css'
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const editStudentData = async () => {

    }

    const deletHandleClick = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/student/${id}`, {
                method: 'DELETE',
            });

            // CONDITION: Agar backend se status 200 ya ok response aaya hai
            if (response.ok) {
                // ✅ CORRECT PATTERN: Single line arrow function automatically return karta hai
                setStudents((prevStudents) => {
                    return prevStudents.filter((student) => student._id !== id);
                })
            } else {
                return;
            }

        } catch (err) {
            console.log("Error", err);
        }
    }


    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:3000/students");
            if (!response.ok) throw new Error("Network response error");
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        // main Background
        <div style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }} className="min-h-screen antialiased">

            {/* Header */}
            <div style={{ backgroundColor: 'var(--bg-header)', color: 'var(--text-header)' }} className="px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-md">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Student Portal</h1>
                    <p className="text-xs opacity-80 mt-0.5 tracking-wide">Management Dashboard</p>
                </div>
                {/* Add Student Button*/}
                <button onClick={() => navigate("add")} style={{ backgroundColor: 'var(--bg-card)', color: 'var(--bg-header)' }} className="font-semibold cursor-pointer text-xs px-5 py-2.5 rounded-md shadow-sm hover:opacity-90 transition-all duration-200 flex items-center gap-2">
                    <svg xmlns="http://w3.org" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                    ADD NEW STUDENT
                </button>
            </div>

            {/* Container*/}
            <div className="max-w-[1600px] mx-auto p-6 sm:p-8">

                {/*Search Bar*/}
                <div style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }} className="p-4 rounded-lg border shadow-sm mb-6 flex items-center">
                    <div className="relative w-full max-w-md">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg xmlns="http://w3.org" style={{ color: 'var(--text-muted)' }} className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search student details..."
                            style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                            className="w-full pl-9 pr-4 py-2 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                    </div>
                </div>

                {/* Table Container*/}
                <div style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }} className="rounded-lg border shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                {/* टेबल हेडर रो */}
                                <tr style={{ backgroundColor: 'var(--bg-main)', borderBottomColor: 'var(--border-color)', color: 'var(--text-muted)' }} className="border-b text-[11px] font-bold uppercase tracking-wider">
                                    <th className="px-6 font-extrabold py-4">Roll</th>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Age</th>
                                    <th className="px-6 py-4">Course</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Phone Number</th>
                                    <th className="px-6 py-4">Aadhar Number</th>
                                    <th className="px-6 py-4 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody style={{ borderColor: 'var(--border-color)' }} className="divide-y text-xs">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" style={{ color: 'var(--text-muted)' }} className="text-center py-12 font-medium">
                                            <div className="flex justify-center items-center gap-3">
                                                <div style={{ borderTopColor: 'transparent', borderLeftColor: 'var(--bg-header)', borderRightColor: 'var(--bg-header)', borderBottomColor: 'var(--bg-header)' }} className="w-4 h-4 border-2 rounded-full animate-spin"></div>
                                                Fetching data...
                                            </div>
                                        </td>
                                    </tr>
                                ) : students.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" style={{ color: 'var(--text-muted)' }} className="text-center py-12">
                                            No student records found.
                                        </td>
                                    </tr>
                                ) : (
                                    students.map((student) => (
                                        <tr key={student._id || student.id} className="hover:bg-blue-50/40 font-bold text-lg  transition-colors">

                                            {/* नाम और मिनी ब्लू अवतार */}

                                            <td className="px-6 py-4 font-bold" style={{ color: 'var(--text-muted)' }}>{student.RollNumber} </td>
                                            <td className="px-6 py-4 font-semibold capitalize" style={{ color: 'var(--text-main)' }}>
                                                <div className="flex items-center gap-3">
                                                    <div style={{ backgroundColor: 'var(--bg-header)', color: 'var(--text-header)' }} className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px]">
                                                        {student.name ? student.name.charAt(0).toUpperCase() : "S"}
                                                    </div>
                                                    {student.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-bold" style={{ color: 'var(--text-muted)' }}>{student.age} Yrs</td>
                                            <td className="px-6 py-4">
                                                {/* Course */}
                                                <span style={{ backgroundColor: 'var(--accent-badge)', color: 'var(--text-badge)' }} className="text-[10px] font-bold px-2.5 py-1 rounded">
                                                    {student.course}

                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-lg font-mono" style={{ color: 'var(--text-muted)' }}>{student.email}</td>
                                            <td className="px-6 py-4" style={{ color: 'var(--text-muted)' }}>{student.phone || student.phoneNumber}</td>
                                            <td className="px-6 py-4 font-mono tracking-wide" style={{ color: 'var(--text-muted)' }}>{student.aadharCardNumber}</td>
                                            
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex justify-center items-center gap-2">

                                                    {/* EDIT BUTTON: Sahi route path '/student/id' ke sath */}
                                                    <button
                                                        onClick={() => navigate(`/student/${student._id}`)}
                                                        className="hover:bg-blue-600 text-white bg-blue-500 hover:text-white border font-semibold text-[10px] px-1 w-15 cursor-pointer py-2 rounded transition-colors"
                                                    >
                                                        Edit
                                                    </button>

                                                    {/* DELETE BUTTON */}
                                                    <button
                                                        onClick={() => { deletHandleClick(student._id) }}
                                                        className="text-white hover:bg-red-600 hover:text-white border border-red-600 font-semibold text-[10px] px-3 cursor-pointer bg-red-500 py-2 rounded transition-colors"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;
