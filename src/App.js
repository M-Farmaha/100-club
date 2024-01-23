import { Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import { Layout } from "./Layout/Layout";
import { Loader } from "./components/Loaders/Loaders.jsx";

// import HomePage from "./pages/HomePage/HomePage";
// import MembersPage from "./pages/MembersPage/MembersPage";
// import GalleryPage from "./pages/GalleryPage/GalleryPage";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const MembersPage = lazy(() => import("./pages/MembersPage/MembersPage.jsx"));
const GalleryPage = lazy(() => import("./pages/GalleryPage/GalleryPage.jsx"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/members"
            element={
              <Suspense fallback={<Loader />}>
                <MembersPage />
              </Suspense>
            }
          />
          <Route
            path="/gallery"
            element={
              <Suspense fallback={<Loader />}>
                <GalleryPage />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
