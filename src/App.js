import { Route, Routes, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { Layout } from "./Layout/Layout";
import { MembersPage } from "./pages/MembersPage/MembersPage";
import { GalleryPage } from "./pages/GalleryPage/GalleryPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
