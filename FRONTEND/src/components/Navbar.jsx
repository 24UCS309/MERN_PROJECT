import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import { LoginContext } from '../App'

function Navbar() {

    const { loginStatus, setLoginStatus } = useContext(LoginContext)
    const navigate = useNavigate()
    const email = sessionStorage.getItem("email")

    const logout = () => {
        sessionStorage.clear()
        setLoginStatus(false)
        navigate('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">

                {/* Left */}
                <span className="navbar-brand fw-bold">Student Portal</span>

                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/home">Home</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>

                    {loginStatus && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/my-courses">My Courses</Link>
                        </li>
                    )}
                </ul>

                {/* Right */}
                {!loginStatus && (
                    <Link to="/login">
                        <button className="btn btn-primary">Login</button>
                    </Link>
                )}

                {loginStatus && (
                    <div className="dropdown">
                        <button
                            className="btn btn-outline-light dropdown-toggle fw-semibold"
                            type="button"
                            data-bs-toggle="dropdown"
                        >
                            {email}
                        </button>


                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <Link className="dropdown-item" to="/profile">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item text-danger"
                                    onClick={logout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                )}

            </div>
        </nav>
    )
}

export default Navbar
