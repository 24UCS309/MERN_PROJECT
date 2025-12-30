import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { getProfile } from "../services/userServices";

function Profile() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    try {
      const res = await getProfile();

      console.log("Profile API response:", res); 
      

      if (res.status === "success") {
        setStudent(res.data[0]);
      }
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h3>Loading...</h3>;
  if (!student) return <h3>No Profile Found</h3>;

  return (
    <>
     
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body text-center">
                <h4>Register No: {student.reg_no}</h4>
                <h5>Name: {student.name}</h5>
                <h6>Email: {student.email}</h6>
                <h6>Mobile: {student.mobile_no}</h6>

                <button
                  className="btn btn-primary mt-2"
                  onClick={() => navigate("/updtePwd")}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
