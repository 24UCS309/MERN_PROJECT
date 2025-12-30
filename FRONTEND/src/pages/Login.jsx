import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { loginUser } from '../Services/userServices'
import { toast } from 'react-toastify'
import { LoginContext } from '../App'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const { setLoginStatus } = useContext(LoginContext)

    const signin = async () => {
        if (email === '')
            toast.warn('email must be entered')
        else if (password === '')
            toast.warn('password must be entered')
        else {
            const result = await loginUser(email, password)

            if (result.status === 'success') {
                sessionStorage.setItem("token", result.token)
                sessionStorage.setItem("email", email)
                toast.success('Login successful')
                setLoginStatus(true)
                navigate('/home')
            } else {
                toast.error(result.error)
            }
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
            <div className="card shadow" style={{ width: "420px" }}>

                {/* Image */}
                <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                    className="card-img-top"
                    alt="Student Login"
                    style={{ height: "200px", objectFit: "contain", padding: "15px" }}
                />

                <div className="card-body">
                    <h4 className="text-center mb-4">Student Login</h4>

                    {/* Email */}
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                placeholder="Enter password"
                                onChange={e => setPassword(e.target.value)}
                            />
                            <span
                                className="input-group-text"
                                style={{ cursor: "pointer" }}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                👁️
                            </span>
                        </div>
                    </div>

                    {/* Button */}
                    <button className="btn btn-success w-100 mb-3" onClick={signin}>
                        Login
                    </button>

                    {/* Register */}
                    <p className="text-center mb-0">
                        Don’t have an account?{' '}
                        <Link to="/register">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
