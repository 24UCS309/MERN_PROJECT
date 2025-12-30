import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMyCoursesWithVideos } from "../Services/userServices";

function MyCoursesWithVideos() {
  const { course_id } = useParams();

  const [videos, setVideos] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [loading, setLoading] = useState(true); 
  const [isExpired, setIsExpired] = useState(false);  

  useEffect(() => {
    getVideos();
  }, [course_id]);

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("embed")) return url;

    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const getVideos = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const email = sessionStorage.getItem("email");

      const result = await getMyCoursesWithVideos(token, email);

      const data = result.data; // API response array

      const filtered = data.filter(
        (item) => String(item.course_id) === String(course_id)
      );

      setVideos(filtered);
      setCourseName(filtered[0]?.course_name || "");
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h4>Details About Course</h4>
      {/* <h2>{courseName}</h2> */}

      {loading && <p>Loading videos...</p>}

      {!loading && videos.length === 0 && (
        <p>No videos found for this course</p>
      )}

      {!loading &&
        videos.map((video, index) => (
          <div
            key={index}
            style={{
              marginBottom: "30px",
              padding: "15px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <h4>{video.title}</h4>
            <p>{video.description}</p>

            <iframe
              width="100%"
              height="350"
              src={getEmbedUrl(video.youtube_url)}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
    </div>
  );
}

export default MyCoursesWithVideos;
