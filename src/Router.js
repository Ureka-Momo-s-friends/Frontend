import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages";
import ProfilePage from "./pages/Profile/ProfilePage";
import ProfileUpdatePage from "./pages/Profile/ProfileUpdatePage";
import "./App.css";
import "./ProfilePage.css";
import "./ProfileUpdatePage.css"; // 스타일 파일을 import
// index.js 또는 App.js에 추가

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profileupdate" element={<ProfileUpdatePage />} />
    </Routes>
  );
};

export default Router;
