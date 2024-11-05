import React from "react";
import MainContents from "components/Main/MainContents";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const goToProfilePage = () => {
    navigate("/profile"); // ProfilePage로 이동
  };

  return (
    <section>
      <MainContents />
    </section>
  );
}

export default HomePage;
