import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import MembersPage from "./pages/MembersPage/MembersPage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import Layout from "./Layout/Layout";

import { ImageGalleryModal } from "./components/ImageGallery/ImageGalleryModal";
import { MembersModal } from "./components/MembersList/MembersModal";

function App() {
  return (
    <>
      <BrowserRouter basename="/100-club">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            
            <Route path="members" element={<MembersPage />}>
              <Route path="user/:id" element={<MembersModal />} />
            </Route>

            <Route path="gallery" element={<GalleryPage />}>
              <Route path="photo/:id" element={<ImageGalleryModal />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
