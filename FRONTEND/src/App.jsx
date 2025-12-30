import { Routes, Route, Navigate } from "react-router"
import { createContext, useState } from "react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import ViewMore from "./pages/ViewMore"
import { ToastContainer } from "react-toastify"
import React, { useContext } from "react";
import GetAllStudents from "./pages/GetAllStudents"
import UpdatePassword from "./pages/UpdatePassword"
import AddCourses from "./pages/AddCourses"
import GetAllCourses from "./pages/GetAllCourses"
import AddVideo from "./pages/AddVideo"
import GetAllVideos from"./pages/GetAllVideos"
import MyCourses from './pages/MyCourses'
import MyCoursesWithVideos from './pages/MyCoursesWithVideos'


export const LoginContext = createContext()

function App() {

  // const [loginStatus, setLoginStatus] = useState(false)
  const [loginStatus, setLoginStatus] = useState(
    sessionStorage.getItem("token") ? true : false
  )

  return (
    <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>

      {/* ✅ Navbar only here */}
      <Navbar />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    <Route path="/courses" element={loginStatus && role === "admin" ?<GetAllCourses />: <Navigate to="/login"/>} />
        <Route path="/courses/addCourse" element={loginStatus && role === "admin"?<AddCourses />: <Navigate to="/login" />} />
        <Route path="/video" element={loginStatus && role === "admin" ?<GetAllVideos  /> : <Navigate to="/login"/>}/>
        <Route path="/video/addVideo" element={< AddVideo />} />
        <Route
          path="/profile"
          element={loginStatus ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/updtePwd" element={loginStatus ? <UpdatePassword/>: <Navigate to="/login" />}/>
        <Route path="/my-courses" element={loginStatus ?<MyCourses />: <Navigate to="/login" />} />
        {/* <Route  path="/my-course-with-videos" element={<MyCoursesWithVideos />}/> */}
    <Route path="/my-course-with-videos/:course_id" element={<MyCoursesWithVideos />} />
        <Route path="/ViewMore/:course_id" element={<ViewMore />} />
          {/* <Route path="/getallstudents" element={<GetAllStudents />} /> */}

        <Route path="*" element={<Navigate to="/home" />} />
         <Route path="/getallstudents" element={loginStatus && role === "admin"?<GetAllStudents />: <Navigate to="/login" />} />
      </Routes>

      <ToastContainer />
    </LoginContext.Provider>
  )
}

export default App