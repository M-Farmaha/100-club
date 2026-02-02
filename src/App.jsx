import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import MembersPage from "./pages/MembersPage/MembersPage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import Layout from "./Layout/Layout";

import { ImageGalleryModal } from "./components/ImageGallery/ImageGalleryModal";
import { MembersModal } from "./components/MembersList/MembersModal";
import TournamentsPage from "./pages/TournamentsPage/TournamentsPage";
import TournamentSeasonsPage from "./pages/TournamentSeasonsPage/TournamentSeasonsPage";
import { StagesList } from "./components/StagesList/StagesList";
import { ParticipantsList } from "./components/ParticipantsList/ParticipantsList";
import { ParticipantNestedPage } from "./components/ParticipantNestedPage/ParticipantNestedPage";
import { ScrollSave } from "./components/ScrollSave/ScrollSave";
import { StatsPage } from "./components/StatsPage/StatsPage";
import { StatsItemDetail } from "./components/StatsPage/StatsItemDetail";
import { AllSeasonsStatsPage } from "./components/StatsPage/AllSeasonsStatsPage";
import { AllSeasonsStatsItemDetail } from "./components/StatsPage/AllSeasonsStatsItemDetail";
import { SuperStatsPage } from "./components/StatsPage/SuperStatsPage";
import { SuperStatsItemDetail } from "./components/StatsPage/SuperStatsItemDetail";

function App() {
  return (
    <>
      <BrowserRouter basename="/100-club">
        <ScrollSave />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="tournaments" element={<TournamentsPage />} />
            <Route path="tournaments/stats" element={<SuperStatsPage />} />
            <Route path="tournaments/stats/:playerId" element={<SuperStatsItemDetail />} />
            <Route path="tournaments/:tournamentId" element={<TournamentSeasonsPage />} />
            <Route path="tournaments/:tournamentId/stats" element={<AllSeasonsStatsPage />} />
            <Route path="tournaments/:tournamentId/stats/:playerId" element={<AllSeasonsStatsItemDetail />} />
            <Route path="tournaments/:tournamentId/:year" element={<StagesList />} />
            <Route path="tournaments/:tournamentId/:year/stats" element={<StatsPage />} />
            <Route
              path="tournaments/:tournamentId/:year/stats/:playerId"
              element={<StatsItemDetail />}
            />
            <Route path="tournaments/:tournamentId/:year/:stageDate" element={<ParticipantsList />} />
            <Route
              path="tournaments/:tournamentId/:year/:stageDate/:playerId"
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
