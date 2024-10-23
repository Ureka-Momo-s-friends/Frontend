import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const goToProfilePage = () => {
    navigate("/profile"); // ProfilePage로 이동
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={goToProfilePage}>프로필</button>
    </div>
  );
}

export default HomePage;
