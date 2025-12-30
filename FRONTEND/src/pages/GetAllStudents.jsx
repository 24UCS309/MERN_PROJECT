import React, { useEffect, useState } from "react";
import { getAllStudents } from "../services/userService";
import Navbar from "../components/Navbar";

function GetAllStudents() {

    const [student, setStudents] = useState([]);

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        const result = await getAllStudents();
        if (result.status === "success") {
            setStudents(result.data);
            console.log(result)
        }
    };

    return (
        <>
            {/* <Navbar /> */}

            <div className="container mt-4">
                <h3 className="text-center mb-4">All Students</h3>

                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Reg No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Course ID</th>
                            <th>Mobile</th>
                        </tr>
                    </thead>

                    <tbody>
                        {student.length > 0 ? (
                            student.map((s) => (
                                <tr key={s.reg_no}>
                                    <td>{s.reg_no}</td>
                                    <td>{s.name}</td>
                                    <td>{s.email}</td>
                                    <td>{s.course_id}</td>
                                    <td>{s.mobile_no}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No students found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default GetAllStudents;
