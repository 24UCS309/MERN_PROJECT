import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { LoginContext } from "../App";

function Navbar() {

  const { loginStatus, setLoginStatus } = useContext(LoginContext);
  const navigate = useNavigate();

  const email = sessionStorage.getItem("email");
  const role = sessionStorage.getItem("role"); // 👈 IMPORTANT

  const logout = () => {
    sessionStorage.clear();
    setLoginStatus(false);
    navigate("/login");
  };

  return (
    <>
      {/* ================= MAIN NAVBAR (Student + Admin both) ================= */}
      <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
        <div className="container-fluid">

          <Link className="navbar-brand fw-bold" to="/home">
            EduSkill
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav me-auto">

              <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
              </li>

              {loginStatus && role === "student" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/my-courses">MyCourses</Link>
                </li>
              )}

            </ul>

            {/* RIGHT SIDE */}
            {!loginStatus ? (
              <Link className="nav-link text-white" to="/login">
                Login
              </Link>
            ) : (
              <div className="dropdown text-white">
                <span
                  className="dropdown-toggle"
                  data-bs-toggle="dropdown"
                  style={{ cursor: "pointer" }}
                >
                  {email} 
                </span>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ================= ADMIN NAVBAR (ONLY ADMIN) ================= */}
      {loginStatus && role === "admin" && (
        <nav className="navbar navbar-expand-lg bg-info navbar-dark">
          <ul className="navbar-nav mx-auto">

            <li className="nav-item mx-3">
              <Link className="nav-link text-white" to="/admin/dashboard">
                Dashboard
              </Link>
            </li>

            <li className="nav-item dropdown mx-3">
              <Link
                className="nav-link dropdown-toggle text-white"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Courses
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/courses">
                    Get All Courses
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/courses/addCourse">
                    Add Course
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown mx-3">
              <Link
                className="nav-link dropdown-toggle text-white"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Videos
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/video">
                    Get All Videos
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/video/addVideo">
                    Add Video
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown mx-3">
              <Link
                className="nav-link dropdown-toggle text-white"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Students
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/getallstudents">
                    Get All Students
                  </Link>
                </li>
              </ul>
            </li>

          </ul>
        </nav>
      )}
    </>
  );
}

export default Navbar;
