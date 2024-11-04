import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import "./Header.css"; // Header 스타일

function ProfileHeader() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <button className="header-button" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
      <button className="header-button" onClick={() => navigate("/")}>
        <FaHome />
      </button>
    </div>
  );
}

export default ProfileHeader;
