import axios from 'axios'
import config from './config'

export async function loginUser(email, password) {
    const URL = config.BASE_URL + "/auth/signin"
    const body = { email, password }
    // call the backend - use axios
    const response = await axios.post(URL, body) // resolve the promise
    return response.data
}

export async function registerUser(name, email, course_id, mobile_no) {
    // console.log("inside functiobn")
    const URL = config.BASE_URL + '/students/register-to-course'
    const body = { name, email, course_id, mobile_no }
    const response = await axios.post(URL, body)
    return response.data
}

export async function getUserProfile(token) {
    const URL = config.BASE_URL + '/profile'
    const headers = { token }
    const response = await axios.get(URL, { headers })
    return response.data
}

export async function updateProfile(token, mobile) {
    const URL = config.BASE_URL + '/profile'
    const headers = { token }
    const body = { mobile }
    const response = await axios.put(URL, body, { headers })
    return response.data
}

export async function getMyCourses(token, email) {
    const URL = config.BASE_URL + "/students/my-course";
    const headers = { token, email };  
    const response = await axios.get(URL, { headers });
    return response.data;            
}

export async function getMyCoursesWithVideos(token, email) {
    const URL = config.BASE_URL + "/students/my-course-with-videos";
    const headers = { token, email };  
    const response = await axios.get(URL, { headers });
    return response.data;            
}