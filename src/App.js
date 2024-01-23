import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";

import { Layout } from "./Layout/Layout";

import HomePage from "./pages/HomePage/HomePage";
import MembersPage from "./pages/MembersPage/MembersPage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";

// const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
// const MembersPage = lazy(() => import("./pages/MembersPage/MembersPage.jsx"));
// const GalleryPage = lazy(() => import("./pages/GalleryPage/GalleryPage.jsx"));

function App() {
  return (
    <>
      {" "}
      <BrowserRouter basename="/100-club">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>{" "}
      </BrowserRouter>
    </>
  );
}

export default App;
