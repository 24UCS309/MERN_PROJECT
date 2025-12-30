import React, { useState } from "react";
import { addCourse } from "../services/courseServices";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function AddCourse() {
    const navigate = useNavigate();

    const [course, setCourse] = useState({
        course_id: "",
        course_name: "",
        description: "",
        fees: "",
        start_date: "",
        end_date: "",
        video_expire_days: "",
    });

    const handleChange = (e) => {
        setCourse({
            ...course,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        if (!course.course_name || !course.fees) {
            toast.warn("Course name and fees are required");
            return;
        }

        const result = await addCourse(course);

        if (result.status === "success") {
            toast.success("Course added successfully");
            navigate("/admin/courses");
        } else {
            toast.error("Failed to add course");
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">
                <div className="card shadow">
                    <div className="card-header bg-primary text-white">
                        <h4 className="mb-0">Add New Course</h4>
                    </div>

                    <div className="card-body">
                        {/* <div className="mb-3">
                            <label className="form-label">Course ID</label>
                            <input
                                type="text"
                                name="course_id"
                                className="form-control"
                                value={course.course_id}
                                onChange={handleChange}
                            />
                        </div> */}

                        <div className="mb-3">
                            <label className="form-label">Course Name</label>
                            <input
                                type="text"
                                name="course_name"
                                className="form-control"
                                value={course.course_name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                name="description"
                                className="form-control"
                                value={course.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Fees</label>
                            <input
                                type="number"
                                name="fees"
                                className="form-control"
                                value={course.fees}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Start Date</label>
                                <input
                                    type="date"
                                    name="start_date"
                                    className="form-control"
                                    value={course.start_date}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">End Date</label>
                                <input
                                    type="date"
                                    name="end_date"
                                    className="form-control"
                                    value={course.end_date}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Video Expire Days</label>
                            <input
                                type="number"
                                name="video_expire_days"
                                className="form-control"
                                value={course.video_expire_days}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="d-flex justify-content-end">
                            <button
                                className="btn btn-secondary me-2"
                                onClick={() => navigate("/admin/courses")}
                            >
                                Cancel
                            </button>
                            <button className="btn btn-success" onClick={handleSubmit}>
                                Add Course
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCourse;
