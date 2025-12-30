import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
import { getAllCourses } from "../Services/courses_card";
import { useNavigate } from "react-router";

// Import course from assets
import aiImage from "../assets/Course/ai.png";
import dataScienceImage from "../assets/Course/datascience.png";
import mlimage from "../assets/Course/ml.png"
import cyberimage from "../assets/Course/cybersecurity.png"
import pythonimage from "../assets/Course/python.png"
import dsuimage from "../assets/Course/dsu.png"
import javaimage from "../assets/Course/java.png"
import javaspringbootimage from "../assets/Course/javaspringboot.png"
import webdevimage from "../assets/Course/webdev.png"

export default function Home() {
    const navigate = useNavigate();
    const [items, setItems] = useState([])

    // Map course names to images
    const courseImages = {
        "Artificial Intelligence": aiImage,
        "Data Science": dataScienceImage,
        "Machine Learning":mlimage,
        "Cyber Security":cyberimage,
        "Python Programming":pythonimage,
        "Data Structure" : dsuimage,
        "Java Programming":javaimage,
        "Java Springboot" : javaspringbootimage,
        "Web Development":webdevimage

    };

    useEffect(() => {
        console.log('Home component loaded')
        getCourses()
    }, [])

    const getCourses = async () => {
        const result = await getAllCourses()
        if (result.status === "success") {
            setItems(result.data)
        }
    }

    const displayCourse = (course_id) => {
        navigate(`/ViewMore/${course_id}`);
    }

    return <>
        {/* <Navbar /> */}
        <div className="container">
            <div className="row">
                {items.map(course => (
                    <div key={course.course_id} className="col-md-4 mt-3">
                        <div className="card h-100">

                            {/* Course Image from assets */}
                            <img
                                src={courseImages[course.course_name] || aiImage} // fallback to aiImage
                                className="card-img-top"
                                alt={course.course_name}
                                style={{ height: "200px", objectFit: "cover" }}
                            />

                            <div className="card-body">
                                <h5 className="card-title">{course.course_name}</h5>
                                <p className="card-text">{course.description}</p>
                                <h6>Fees: Rs. {course.fees}</h6>
                                <button className="btn btn-primary" onClick={() => displayCourse(course.course_id)}>View More</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </> 
}
