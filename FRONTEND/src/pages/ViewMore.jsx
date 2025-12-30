import Navbar from "../components/Navbar"
import {getCourseInfo} from "../Services/courses_card"
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";

export default function ViewMore(){
    console.log("ViewMore Button Clicked!!!!")

    const { course_id } = useParams(); 
    const [course, setCourse] = useState(null);
    const Navigate = useNavigate();

    const register = () => {
        Navigate('/register');
    };
    useEffect(() => {
        console.log("ViewMore component loaded, Course ID:", course_id);
        getInfo();
    }, [course_id]);

    const getInfo = async () => {
        const result = await getCourseInfo(course_id);
        if (result.status === "success") {
            setCourse(result.data[0]);
        }   
    };
if (!course) {
        return (
            <>
                <Navbar />
                <h4 className="text-center mt-5">Loading...</h4>
            </>
        );
    }

    
    //  useEffect(() => {
    //         console.log('ViewMore component loaded')
    //         getInfo()
    //     }, [])

    // const getInfo = async () => {
    //         const result = await getCourseInfo()
    //         if (result.status == "success") {
    //             setItems(result.data)
    //         }
    //     }

    return <>
    
{/* 
    <div className="container mt-4">
        This is ViewMore
    </div> */}

        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h3><b>Course Information</b></h3>
                            <h5 className="card-title">{course.course_id}</h5>
                            <h5 className="card-title">{course.course_name}</h5>
                            <p className="card-text">{course.description}</p>
                            <h6 className="mb-3">Fees: Rs. {course.fees}</h6>
                            <button className="btn btn-primary w-100"onClick={register} >Register To Course</button> 
                              
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}
