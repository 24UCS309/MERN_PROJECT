import React, { useEffect, useState } from "react";
import { addVideo } from "../services/videoServices";
import { getAllCourses } from "../services/courseServices";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function AddVideo() {
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);

    const [video, setVideo] = useState({
        course_id: "",
        title: "",
        description: "",
        youtube_url: "",
    });

    /* ================= LOAD COURSES ================= */
    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        const result = await getAllCourses();
        if (result.status === "success") {
            setCourses(result.data);
        }
    };

    /* ================= HANDLE CHANGE ================= */
    const handleChange = (e) => {
        setVideo({
            ...video,
            [e.target.name]: e.target.value,
        });
    };

    /* ================= SUBMIT ================= */
    const handleSubmit = async () => {
        if (!video.course_id || !video.title || !video.youtube_url) {
            toast.warn("Course, Title and YouTube URL are required");
            return;
        }

        const result = await addVideo(video);

        console.log("Add Video API response:", result);

        if (result.status === "success") {
            toast.success("Video added successfully");
            navigate("/admin/videos");
        } else {
            toast.error("Failed to add video");
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">
                <div className="card shadow">
                    <div className="card-header bg-primary text-white">
                        <h4 className="mb-0">Add New Video</h4>
                    </div>

                    <div className="card-body">

                        {/* COURSE */}
                        <div className="mb-3">
                            <label className="form-label">Course</label>
                            <select
                                name="course_id"
                                className="form-select"
                                value={video.course_id}
                                onChange={handleChange}
                            >
                                <option value="">-- Select Course --</option>
                                {courses.map((course) => (
                                    <option
                                        key={course.course_id}
                                        value={course.course_id}
                                    >
                                        {course.course_id}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* TITLE */}
                        <div className="mb-3">
                            <label className="form-label">Video Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                value={video.title}
                                onChange={handleChange}
                            />
                        </div>

                        {/* DESCRIPTION */}
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                name="description"
                                className="form-control"
                                value={video.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        {/* YOUTUBE URL */}
                        <div className="mb-3">
                            <label className="form-label">YouTube URL</label>
                            <input
                                type="text"
                                name="youtube_url"
                                className="form-control"
                                value={video.youtube_url}
                                onChange={handleChange}
                                placeholder="https://www.youtube.com/watch?v=xxxx"
                            />
                        </div>

                        {/* BUTTONS */}
                        <div className="d-flex justify-content-end">
                            <button
                                className="btn btn-secondary me-2"
                                onClick={() => navigate("/admin/videos")}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-success"
                                onClick={handleSubmit}
                            >
                                Add Video
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default AddVideo;
