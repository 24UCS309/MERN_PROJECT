import axios from "axios";
import config from "./config";

export async function getAllCourses() {
  console.log("inside function");
  const URL = config.BASE_URL + "course/all-active-courses";
  const token = sessionStorage.getItem("token");
  const headers = { token };
  const response = await axios.get(URL, { headers });

  console.log(response.data);
  return response.data;
}

export function formatDate(date) {
  if (!date) return null;
  return date.split("T")[0];
}

export async function updateCourse(course) {
  const url = `${config.BASE_URL}courses/${course.course_id}`;

  const response = await axios.put(url, {
    course_name: course.course_name,
    description: course.description,
    fees: course.fees,
    start_date: course.start_date,
    end_date: course.end_date,
    video_expire_days: course.video_expire_days,
  });

  return response.data;
}

export const deleteCourse = async (course_id) => {
  try {
    const response = await axios.delete(
      `${config.BASE_URL}courses/${course_id}`
    );
    return response.data;
  } catch (error) {
    return { status: "error", error };
  }
};

export const addCourse = async (course) => {
  const url = config.BASE_URL + "courses/addCourse";
  const response = await axios.post(url, course);
  return response.data;
};
