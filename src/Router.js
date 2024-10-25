import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages";
import { MapPage } from "./pages";
import ProfilePage from "./pages/Profile/ProfilePage";
import ProfileUpdatePage from "./pages/Profile/ProfileUpdatePage";
import PetProfileUpdatePage from "./pages/Profile/PetProfileUpdatePage";
import "./ProfilePage.css";
// index.js 또는 App.js에 추가

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profileupdate" element={<ProfileUpdatePage />} />
      <Route path="/petprofileupdate" element={<PetProfileUpdatePage />} />
    </Routes>
  );
};

export default Router;
