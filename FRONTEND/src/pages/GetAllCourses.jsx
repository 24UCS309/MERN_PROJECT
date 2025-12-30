import React, { useEffect, useState } from "react";
import {
    getAllCourses,
    updateCourse,
    deleteCourse,
} from "../services/courseServices";
import Navbar from "../components/Navbar";

function GetAllCourses() {
    const [courses, setCourses] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({});
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        const result = await getAllCourses();
        if (result.status === "success") {

            console.log("inside success", result.data)
            setCourses(result.data);
        }
    };

    /* ================= EDIT ================= */

    const startEdit = (course) => {
        setEditId(course.course_id);
        setEditData({
            ...course,
            start_date: course.start_date?.split("T")[0],
            end_date: course.end_date?.split("T")[0],
        });
    };

    const handleChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value,
        });
    };

    const saveUpdate = async () => {
        const result = await updateCourse(editData);

        if (result.status === "success") {
            setCourses((prev) =>
                prev.map((c) =>
                    c.course_id === editId ? editData : c
                )
            );
            setEditId(null);
            alert("Course updated successfully");
        }
    };

    const cancelEdit = () => {
        setEditId(null);
    };

    /* ================= DELETE ================= */

    const openDeleteModal = (id) => {
        setDeleteId(id);
        const modal = new window.bootstrap.Modal(
            document.getElementById("deleteModal")
        );
        modal.show();
    };

    const handleDelete = async () => {
        const result = await deleteCourse(deleteId);

        if (result.status === "success") {
            setCourses((prev) =>
                prev.filter((c) => c.course_id !== deleteId)
            );

            const modalEl = document.getElementById("deleteModal");
            window.bootstrap.Modal.getInstance(modalEl).hide();

            alert("Course deleted successfully");
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">
                <h3 className="text-center mb-4">All Courses</h3>

                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Fees</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Expire Days</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <tr key={course.course_id}>
                                    <td>{course.course_id}</td>

                                    <td>
                                        {editId === course.course_id ? (
                                            <input
                                                name="course_name"
                                                value={editData.course_name}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        ) : (
                                            course.course_name
                                        )}
                                    </td>

                                    <td>
                                        {editId === course.course_id ? (
                                            <input
                                                name="description"
                                                value={editData.description}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        ) : (
                                            course.description
                                        )}
                                    </td>

                                    <td>
                                        {editId === course.course_id ? (
                                            <input
                                                name="fees"
                                                value={editData.fees}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        ) : (
                                            course.fees
                                        )}
                                    </td>

                                    <td>
                                        {editId === course.course_id ? (
                                            <input
                                                type="date"
                                                name="start_date"
                                                value={editData.start_date}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        ) : (
                                            course.start_date
                                                ? new Date(course.start_date).toISOString().split("T")[0]
                                                : "N/A"
                                        )}
                                    </td>


                                    <td>
                                        {editId === course.course_id ? (
                                            <input
                                                type="date"
                                                name="end_date"
                                                value={editData.end_date}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        ) : (
                                            course.end_date
                                                ? new Date(course.end_date).toISOString().split("T")[0]
                                                : "N/A"
                                        )}
                                    </td>


                                    <td>
                                        {editId === course.course_id ? (
                                            <input
                                                name="video_expire_days"
                                                value={editData.video_expire_days}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        ) : (
                                            course.video_expire_days
                                        )}
                                    </td>

                                    <td className="text-center">
                                        {editId === course.course_id ? (
                                            <>
                                                <i
                                                    className="bi bi-check-lg text-success fs-5 me-3"
                                                    style={{ cursor: "pointer" }}
                                                    title="Save"
                                                    onClick={saveUpdate}
                                                ></i>

                                                <i
                                                    className="bi bi-x-lg text-danger fs-5"
                                                    style={{ cursor: "pointer" }}
                                                    title="Cancel"
                                                    onClick={cancelEdit}
                                                ></i>
                                            </>
                                        ) : (
                                            <>
                                                <i
                                                    className="bi bi-pencil-square text-warning fs-5 me-3"
                                                    style={{ cursor: "pointer" }}
                                                    title="Edit"
                                                    onClick={() => startEdit(course)}
                                                ></i>

                                                <i
                                                    className="bi bi-trash-fill text-danger fs-5"
                                                    style={{ cursor: "pointer" }}
                                                    title="Delete"
                                                    onClick={() =>
                                                        openDeleteModal(course.course_id)
                                                    }
                                                ></i>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">
                                    No courses found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ================= DELETE MODAL ================= */}
            <div className="modal fade" id="deleteModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="text-danger">Confirm Delete</h5>
                            <button
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>

                        <div className="modal-body">
                            Are you sure you want to delete this course?
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-danger"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GetAllCourses;
