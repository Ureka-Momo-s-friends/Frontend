import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  MapPage,
  ProductDetailPage,
  ProfilePage,
  ProfileUpdatePage,
  ProfilePetUpdatePage,
  ProductSearchPage,
  CartPage,
  OrderDetailPage,
} from "./pages";
import PaymentPage from "pages/Pay/PaymentPage";
import PaymentSuccess from "pages/Pay/PaymentSuccess";
import PaymentHistory from "pages/Pay/PaymentHistory";
import Layout from "components/Layout";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/update" element={<ProfileUpdatePage />} />
        <Route path="profile/petupdate" element={<ProfilePetUpdatePage />} />
        <Route path="product/:productId" element={<ProductDetailPage />} />
        <Route path="search" element={<ProductSearchPage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="success" element={<PaymentSuccess />} />
        <Route path="history" element={<PaymentHistory />} />
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default Router;
