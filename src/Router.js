import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages';
import { MapPage } from './pages';
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/map" element={<MapPage />} />
    </Routes>
  );
};

export default Router;
