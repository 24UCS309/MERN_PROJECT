import axios from "axios";
import config from "./config";

export async function getAllCourses() {
    const URL = config.BASE_URL + '/course/all-active-courses'
    const token=sessionStorage.getItem("token")
    const headers={token}
    const response = await axios.get(URL,{headers})
    return response.data
}

// export async function getCourseInfo() {
//     const URL = config.BASE_URL + '/students/my-course'
//     const token=sessionStorage.getItem("token")
//     const headers={token}
//     const response = await axios.get(URL,{headers})
//     return response.data
// }
export async function getCourseInfo(course_id)  {
   
    const URL = config.BASE_URL +`/courses/${course_id}`
    const response = await axios.get(URL)
    return response.data
}
