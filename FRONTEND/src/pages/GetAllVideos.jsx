import React, { useEffect, useState } from "react";
import {
    getAllVideo,
    updateVideo,
    deleteVideo,
} from "../services/videoServices";
import Navbar from "../components/Navbar";
import { getAllCourses } from "../services/courseServices";

function GetAllVideos() {
    const [videos, setVideos] = useState([]);
    const [filteredVideos, setFilteredVideos] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");

    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({});
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        loadCourses();
        loadVideos();
    }, []);

    const loadVideos = async () => {
        const result = await getAllVideo();

        if (result.status === "success") {
            setVideos(result.data);
            setFilteredVideos(result.data);
        }
    };

    const loadCourses = async () => {
        const result = await getAllCourses();
        if (result.status === "success") {
            setCourses(result.data);
        }
    };

    /* ================= FILTER ================= */

    const handleCourseFilter = (courseId) => {
        setSelectedCourse(courseId);

        if (courseId === "") {
            setFilteredVideos(videos);
        } else {
            const filtered = videos.filter(
                (v) => String(v.course_id) === String(courseId)
            );
            setFilteredVideos(filtered);
        }
    };

    /* ================= EDIT ================= */

    const startEdit = (video) => {
        setEditId(video.video_id);
        setEditData({
            ...video,
            added_at: video.added_at?.split("T")[0],
        });
    };

    const handleChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value,
        });
    };

    const saveUpdate = async () => {
        const payload = {
            video_id: editId,
            course_id: editData.course_id,
            title: editData.title,
            description: editData.description,
            youtube_url: editData.youtube_url,
        };

        const result = await updateVideo(payload);

        if (result.status === "success") {
            loadVideos();
            setEditId(null);
            alert("Video updated successfully");
        }
    };


    const cancelEdit = () => setEditId(null);

    /* ================= DELETE ================= */

    const openDeleteModal = (id) => {
        setDeleteId(id);
        new window.bootstrap.Modal(
            document.getElementById("deleteVideoModal")
        ).show();
    };

    const handleDelete = async () => {
        const result = await deleteVideo(deleteId);

        if (result.status === "success") {
            const updated = videos.filter((v) => v.video_id !== deleteId);
            setVideos(updated);
            setFilteredVideos(updated);

            window.bootstrap.Modal.getInstance(
                document.getElementById("deleteVideoModal")
            ).hide();

            alert("Video deleted successfully");
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">
                <h3 className="text-center mb-4">All Videos</h3>

                {/* FILTER */}
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label className="form-label fw-semibold">
                            Filter by Course
                        </label>

                        <select
                            className="form-select"
                            value={selectedCourse}
                            onChange={(e) => handleCourseFilter(e.target.value)}
                        >
                            <option value="">All Courses</option>

                            {courses.map((course) => (
                                <option key={course.course_id} value={course.course_id}>
                                    {course.course_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Course</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>URL</th>
                            <th>Added At</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredVideos.length > 0 ? (
                            filteredVideos.map((video) => (
                                <tr key={video.video_id}>
                                    <td>{video.video_id}</td>

                                    {/* <td>
                                        {courses.find(
                                            (c) => c.course_id === video.course_id
                                        )?.course_name || "N/A"}

                                        {editId === video.video_id && (
                                            <input
                                                type="hidden"
                                                name="course_id"
                                                value={editData.course_id}
                                            />
                                        )}
                                    </td> */}

                                    <td>{video.course_name}</td>

                                    <td>
                                        {editId === video.video_id ? (
                                            <input
                                                name="title"
                                                value={editData.title}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        ) : (
                                            video.title
                                        )}
                                    </td>

                                    <td>
                                        {editId === video.video_id ? (
                                            <input
                                                name="description"
                                                value={editData.description}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        ) : (
                                            video.description
                                        )}
                                    </td>

                                    <td>
                                        {editId === video.video_id ? (
                                            <input
                                                name="video_url"
                                                value={editData.video_url}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        ) : (
                                            <a
                                                href={video.youtube_url}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                View
                                            </a>
                                        )}
                                    </td>

                                    <td>
                                        {video.added_at
                                            ? new Date(video.added_at).toISOString().split("T")[0]
                                            : "N/A"}
                                    </td>



                                    <td className="text-center">
                                        {editId === video.video_id ? (
                                            <>
                                                <i
                                                    className="bi bi-check-lg text-success fs-5 me-3"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={saveUpdate}
                                                />
                                                <i
                                                    className="bi bi-x-lg text-danger fs-5"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={cancelEdit}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <i
                                                    className="bi bi-pencil-square text-warning fs-5 me-3"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => startEdit(video)}
                                                />
                                                <i
                                                    className="bi bi-trash-fill text-danger fs-5"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => openDeleteModal(video.video_id)}
                                                />
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No videos found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* DELETE MODAL */}
            <div className="modal fade" id="deleteVideoModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="text-danger">Confirm Delete</h5>
                            <button className="btn-close" data-bs-dismiss="modal" />
                        </div>

                        <div className="modal-body">
                            Are you sure you want to delete this video?
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button className="btn btn-danger" onClick={handleDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GetAllVideos;
