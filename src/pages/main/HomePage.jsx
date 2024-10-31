import React from "react";
import MainContents from "components/Main/MainContents";
import Login from "../Login";
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
        <Login />
      </section>
      <MainContents />
    </Layout>
  );
}

export default HomePage;
