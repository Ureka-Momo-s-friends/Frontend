import { Routes, Route } from "react-router-dom";
import { HomePage, MapPage, ProductDetailPage } from "./pages";
import ProfilePage from "./pages/Profile/ProfilePage";
import ProfileUpdatePage from "./pages/Profile/ProfileUpdatePage";
import PetProfileUpdatePage from "./pages/Profile/PetProfileUpdatePage";
import "./ProfilePage.css";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/mappage" element={<MapPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profileupdate" element={<ProfileUpdatePage />} />
      <Route path="/petprofileupdate" element={<PetProfileUpdatePage />} />
      <Route path="/product/:productId" element={<ProductDetailPage />} />
    </Routes>
  );
};

export default Router;
