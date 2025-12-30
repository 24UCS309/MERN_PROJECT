import axios from 'axios'
import config from './config'

export async function loginUser(email, password) {
    const URL = config.BASE_URL + "auth/signin"
    const body = { email, password }
    // call the backend - use axios
    const response = await axios.post(URL, body) // resolve the promise
    return response.data
}

export async function registerUser(name, email, course_id, mobile) {
    const URL = config.BASE_URL + 'students/register-to-course'
    const body = { name, email, course_id, mobile }
    const response = await axios.post(URL, body)
    return response.data
}
export async function getAllStudents() {
  const URL = config.BASE_URL + "students/all-students";
  const token = sessionStorage.getItem("token");
  const headers = { token };
  const response = await axios.get(URL, { headers });
  return response.data;
}
export async function getProfile(email){
    const token=sessionStorage.getItem("token")
    const headers={token:token}
    const URL =config.BASE_URL+`students/my-profile`
   
    const res=await axios.get(URL,{headers})
    return res.data
}
export async function changePassword(newPassword,confirmPassword) {
    const URL=config.BASE_URL+"students/change-password"
    const body={newPassword,confirmPassword}
     const token=sessionStorage.getItem("token")
    const headers={token:token}
    const res=await axios.put(URL,body,{headers})
    return res.data
}
export async function getMyCourses(token, email) {
    const URL = config.BASE_URL + "students/my-course";
    const headers = { token, email };  
    const response = await axios.get(URL, { headers });
    return response.data;            
}

export async function getMyCoursesWithVideos(token, email) {
    const URL = config.BASE_URL + "students/my-course-with-videos";
    const headers = { token, email };  
    const response = await axios.get(URL, { headers });
    return response.data;            
}