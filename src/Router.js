import { Routes, Route } from "react-router-dom";
import { HomePage, MapPage, ProductDetailPage } from "./pages";
import ProfilePage from "./pages/Profile/ProfilePage";
import ProfileUpdatePage from "./pages/Profile/ProfileUpdatePage";
import PetProfileUpdatePage from "./pages/Profile/PetProfileUpdatePage";
import "./ProfilePage.css";
import PaymentPage from "pages/Pay/PaymentPage";
import PaymentSuccess from "pages/Pay/PaymentSuccess";
import CartPage from "pages/Cart/CartPage";
import PaymentHistory from "pages/Pay/PaymentHistory";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/mappage" element={<MapPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profileupdate" element={<ProfileUpdatePage />} />
      <Route path="/petprofileupdate" element={<PetProfileUpdatePage />} />
      <Route path="/product/:productId" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/success" element={<PaymentSuccess />} />
      <Route path="/history" element={<PaymentHistory />} />
    </Routes>
  );
};

export default Router;
