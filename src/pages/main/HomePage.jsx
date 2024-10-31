import React from "react";
import MainContents from "components/Main/MainContents";
import { useNavigate } from "react-router-dom";
import Layout from "pages/Layout";

function HomePage() {
  const navigate = useNavigate();

  const goToProfilePage = () => {
    navigate("/profile"); // ProfilePage로 이동
  };

  return (
    <Layout>
      <section>
        <MainContents />
      </section>
    </Layout>
  );
}

export default HomePage;
