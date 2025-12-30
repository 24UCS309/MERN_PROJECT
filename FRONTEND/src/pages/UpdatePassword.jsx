import React, { useState } from 'react'
import { useNavigate } from "react-router";
import { changePassword } from '../services/userServices';
import { toast } from 'react-toastify';

function UpdatePassword() {

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const changePassword1 = async () => {

    if (newPassword.trim() === "") {
      toast.warn("Password must be entered");
      return;
    }

    if (confirmPassword.trim() === "") {
      toast.warn("Confirm password must be entered");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await changePassword(newPassword, confirmPassword);

      if (res.status === "success") {
        toast.success("Password changed successfully");
        navigate("/home");
      } else {
        toast.error(res.message || "Unable to change password");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="container d-flex justify-content-center p-5 vh-100">
      <div className="card shadow p-4" style={{ width: "400px", height: "350px" }}>

        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter new password"
            onChange={e => setNewPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm password"
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-success w-100" onClick={changePassword1}>
          Change Password
        </button>
      </div>
    </div>
  );
}

export default UpdatePassword;
