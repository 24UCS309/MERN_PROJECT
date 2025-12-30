import axios from "axios";
import config from "./config";

export async function getAllVideo() {
  const URL = config.BASE_URL + "video";
  const token = sessionStorage.getItem("token");
  const headers = { token };

  const response = await axios.get(URL, { headers });
  return response.data;
}

/* ================= GET ALL VIDEOS BY ID ================= */
export async function getAllVideos(courseId) {
  const URL = config.BASE_URL + `video/${courseId}`;
  const token = sessionStorage.getItem("token");
  const headers = { token };

  const response = await axios.get(URL, { headers });
  return response.data;
}

/* ================= UPDATE VIDEO ================= */
export async function updateVideo(videoData) {
  const URL = config.BASE_URL + `video/${videoData.video_id}`;
  const token = sessionStorage.getItem("token");
  const headers = { token };

  const response = await axios.put(URL, videoData, { headers });
  return response.data;
}

/* ================= DELETE VIDEO ================= */
export async function deleteVideo(videoId) {
  const URL = config.BASE_URL + `video/${videoId}`;
  const token = sessionStorage.getItem("token");
  const headers = { token };

  const response = await axios.delete(URL, { headers });
  return response.data;
}

export async function addVideo(video) {
  const URL = config.BASE_URL + "video/addVideo";
  const token = sessionStorage.getItem("token");
  const headers = { token };
  const response = await axios.post(URL, video, { headers });
  return response.data;
}
