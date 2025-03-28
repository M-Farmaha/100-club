import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import MembersPage from "./pages/MembersPage/MembersPage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import Layout from "./Layout/Layout";

import { ImageGalleryModal } from "./components/ImageGallery/ImageGalleryModal";
import { MembersModal } from "./components/MembersList/MembersModal";
import TournamentsPage from "./pages/TournamentsPage/TournamentsPage";
import { StagesList } from "./components/StagesList/StagesList";
import { ParticipantsList } from "./components/ParticipantsList/ParticipantsList";
import { ParticipantNestedPage } from "./components/ParticipantNestedPage/ParticipantNestedPage";
import { ScrollSave } from "./components/ScrollSave/ScrollSave";
import { StatsPage } from "./components/StatsPage/StatsPage";
import { StatsItemDetail } from "./components/StatsPage/StatsItemDetail";

function App() {
  return (
    <>
      <BrowserRouter basename="/100-club">
        <ScrollSave />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />F
            <Route path="tournaments" element={<TournamentsPage />} />
            <Route path="tournaments/:id" element={<StagesList />} />
            <Route path="tournaments/:id/stats" element={<StatsPage />} />
            <Route
              path="tournaments/:id/stats/:id"
              element={<StatsItemDetail />}
            />
            <Route path="tournaments/:id/:id" element={<ParticipantsList />} />
            <Route
              path="tournaments/:id/:id/:id"
              element={<ParticipantNestedPage />}
            />
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
