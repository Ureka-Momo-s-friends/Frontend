import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  MapPage,
  ProductDetailPage,
  ProfilePage,
  ProfileUpdatePage,
  ProfilePetUpdatePage,
  ProductSearchPage,
} from "./pages";
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
      <Route path="/profile/update" element={<ProfileUpdatePage />} />
      <Route path="/profile/petupdate" element={<ProfilePetUpdatePage />} />
      <Route path="/product/:productId" element={<ProductDetailPage />} />
      <Route path="/search" element={<ProductSearchPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/success" element={<PaymentSuccess />} />
      <Route path="/history" element={<PaymentHistory />} />
    </Routes>
  );
};

export default Router;
