import { Routes, Route, Navigate } from "react-router"
import { createContext, useState } from "react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import ViewMore from "./pages/ViewMore"
import About from "./pages/About"
import MyCourses from "./pages/MyCourses";
import MyCoursesWithVideos from "./pages/MyCoursesWithVideos";

import { ToastContainer } from "react-toastify"

export const LoginContext = createContext()

function App() {

  const [loginStatus, setLoginStatus] = useState(
    sessionStorage.getItem("token") ? true : false
  )

  // const [loginStatus, setLoginStatus] = useState(false)

  return (
    <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>

      <Navbar />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/profile"
          element={loginStatus ? <Profile /> : <Navigate to="/login" />}
        />

        {/* <Route
          path="/profile"
          element={loginStatus ? <MyCourses /> : <Navigate to="/login" />}
        /> */}
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/my-course-with-videos/:course_id" element={<MyCoursesWithVideos />} />
        {/* <Route path="/course/:courseId" element={<CourseDetails />} /> */}

        {/* <Route path="/my-course-with-videos" element={<MyCoursesWithVideos/>} /> */}
        <Route  path="/my-course-with-videos" element={<MyCoursesWithVideos />}/>
        <Route path="/ViewMore/:course_id" element={<ViewMore />} />

        <Route path="*" element={<Navigate to="/home" />} />
         <Route path="/updtePwd" element={<UpdatePassword/>}/>
      </Routes>

      <ToastContainer />
    </LoginContext.Provider>
  )
}

export default App
