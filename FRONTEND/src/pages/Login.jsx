import React, { useState } from 'react'
import { Link, useNavigate } from "react-router";
import { loginUser } from '../services/userServices';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { LoginContext } from '../App';
function Login() {

        //destructuring of array
        const [email,setEmail]=useState( '  ' )
        const [password,setPassword]=useState('')
        const navigate=useNavigate()

        //destructure the object
        const {loginStatus,setLoginStatus}=useContext(LoginContext)

        const signin=async()=>{
            
            if(email==' '){
                toast.warn('Email must be entered')
            }
            else if(password==''){
                toast.warn('Password must be entered')
            }
            else{
            const res=await loginUser(email,password)
            console.log(res)
            if(res.status=='success'){
                setLoginStatus(true)
                navigate("/*")
                sessionStorage.setItem('token',res.data.token)
                sessionStorage.setItem('email',email)
                sessionStorage.setItem('role',res.data.role)
                    toast.success("Login successful")
            }
            else{
                    toast.error("Invalid email and password")
            }
        }

        };


    return (

        <div className="container d-flex justify-content-center p-5 vh-100">
            <div className="card shadow p-4" style={{ width: "400px" , height:"350px"}}>

                <h4 className="text-center mb-4">Login</h4>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={e=>setEmail(e.target.value)}/>
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={e=>setPassword(e.target.value)}/>
                </div>

                <button className="btn btn-success w-100 mb-3" onClick={signin}>Signin</button>

                <div className="text-center">
                    Don't have an account?{" "}
                    <Link to="/register">Click Here</Link>
                </div>

            </div>
        </div>


    )
}

export default Login
