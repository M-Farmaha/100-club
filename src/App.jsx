import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

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
import AdminPage from "./pages/AdminPage/AdminPage";
import { AdminTournamentsList } from "./components/AdminPanel/AdminTournamentsList";
import { AdminTournamentEditor } from "./components/AdminPanel/AdminTournamentEditor";
import { AdminStagePage } from "./components/AdminPanel/AdminStagePage";
import { AdminMembersPage } from "./components/AdminPanel/AdminMembersPage";
import { AdminMemberEditor } from "./components/AdminPanel/AdminMemberEditor";
import { AdminRouteWrapper } from "./components/AdminPanel/AdminRouteWrapper";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <>
          <ScrollSave />
          <Layout />
        </>
      ),
      children: [
        { index: true, element: <HomePage /> },
        { path: "tournaments", element: <TournamentsPage /> },
        { path: "tournaments/stats", element: <SuperStatsPage /> },
        { path: "tournaments/stats/:playerId", element: <SuperStatsItemDetail /> },
        { path: "tournaments/:tournamentId", element: <TournamentSeasonsPage /> },
        { path: "tournaments/:tournamentId/stats", element: <AllSeasonsStatsPage /> },
        { path: "tournaments/:tournamentId/stats/:playerId", element: <AllSeasonsStatsItemDetail /> },
        { path: "tournaments/:tournamentId/:year", element: <StagesList /> },
        { path: "tournaments/:tournamentId/:year/stats", element: <StatsPage /> },
        { path: "tournaments/:tournamentId/:year/stats/:playerId", element: <StatsItemDetail /> },
        { path: "tournaments/:tournamentId/:year/:stageDate", element: <ParticipantsList /> },
        { path: "tournaments/:tournamentId/:year/:stageDate/:playerId", element: <ParticipantNestedPage /> },
        {
          path: "members",
          element: <MembersPage />,
          children: [{ path: "user/:id", element: <MembersModal /> }],
        },
        {
          path: "gallery",
          element: <GalleryPage />,
          children: [{ path: "photo/:id", element: <ImageGalleryModal /> }],
        },
        {
          path: "admin",
          element: <AdminRouteWrapper />,
          children: [
            { index: true, element: <AdminPage /> },
            { path: "tournaments", element: <AdminTournamentsList /> },
            { path: "tournaments/:tournamentId", element: <AdminTournamentEditor /> },
            { path: "tournaments/:tournamentId/:year/:stageDate", element: <AdminStagePage /> },
            { path: "members", element: <AdminMembersPage /> },
            { path: "members/:memberId", element: <AdminMemberEditor /> },
          ],
        },
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
  ],
  { basename: "/100-club" }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
