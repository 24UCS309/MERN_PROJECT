import React, { useEffect, useState } from "react";
import { getMyCourses } from "../Services/userServices";
import { useNavigate } from "react-router";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    myCoursesStud();
  }, []);

  const myCoursesStud = async () => {
    const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem("email");

    const result = await getMyCourses(token, email);

    if (result.status === "success") {
      setCourses(result.data || []);
    } else {
      setCourses([]);
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Courses</h2>

      {!loading && courses.length === 0 && (
        <p className="text-muted">No courses found</p>
      )}

      <div className="row">
        {!loading &&
          courses.map((course) => (
            <div className="col-md-4 mb-4" key={course.course_id}>
              <div
                className="card h-100 shadow-sm"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(`/my-course-with-videos/${course.course_id}`)
                }
              >
                <div className="card-body">
                  <h5 className="card-title fw-bold">
                    {course.course_name}
                  </h5>

                  <p className="card-text text-muted">
                    {course.description || "Click to view course details"}
                  </p>
                </div>

                <div className="card-footer bg-white border-0">
                  <button className="btn btn-primary w-50">
                    View Course
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MyCourses;
