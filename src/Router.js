import { Routes, Route } from "react-router-dom";
import { CartPage, HomePage, MapPage, ProductDetailPage } from "./pages";
import ProfilePage from "./pages/Profile/ProfilePage";
import ProfileUpdatePage from "./pages/Profile/ProfileUpdatePage";
import PetProfileUpdatePage from "./pages/Profile/PetProfileUpdatePage";
import "./ProfilePage.css";
import Layout from "components/Layout";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="mappage" element={<MapPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profileupdate" element={<ProfileUpdatePage />} />
        <Route path="petprofileupdate" element={<PetProfileUpdatePage />} />
        <Route path="product/:productId" element={<ProductDetailPage />} />
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default Router;
