import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { registerUser } from '../Services/userServices'
import { toast } from 'react-toastify'

function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [course_id, setcourse_id] = useState('')
    const [mobile_no, setmobile_no] = useState('')

    const navigate = useNavigate()

    const signup = async () => {
        if (name === '')
            toast.warn('name must be entered')
        else if (email === '')
            toast.warn('email must be entered')
        else if (course_id === '')
            toast.warn('courseId must be entered')
        else if (mobile_no === '')
            toast.warn('mobile must be entered')
        else {
            const result = await registerUser(name, email, course_id, mobile_no)
            if (result.status === 'success') {
                toast.success('User registered successfully')
                navigate('/login')
            } else {
                toast.error(result.error)
            }
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
            <div className="card shadow" style={{ width: "450px" }}>

                {/* Image */}
                <img
                    src="https://cdn-icons-png.flaticon.com/512/921/921347.png"
                    className="card-img-top"
                    alt="Student Register"
                    style={{ height: "200px", objectFit: "contain", padding: "15px" }}
                />

                <div className="card-body">
                    <h4 className="text-center mb-4">Student Registration</h4>

                    {/* Name */}
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder="Enter name" onChange={e => setName(e.target.value)}/></div>

                    {/* Email */}
                    <div className="mb-3"><label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Course ID */}
                    <div className="mb-3">
                        <label className="form-label">Course ID</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Course ID"
                            onChange={e => setcourse_id(e.target.value)}
                        />
                    </div>

                    {/* Mobile */}
                    <div className="mb-3">
                        <label className="form-label">Mobile</label>
                        <input
                            type="tel"
                            className="form-control"
                            placeholder="Enter mobile number"
                            onChange={e => setmobile_no(e.target.value)}
                        />
                    </div>

                    {/* Button */}
                    <button className="btn btn-success w-100 mb-3" onClick={signup}>
                        Register To Course
                    </button>

                    {/* Login link */}
                    <p className="text-center mb-0">
                        Already have an account?{' '}
                        <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
