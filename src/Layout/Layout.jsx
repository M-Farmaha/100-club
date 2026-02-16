import { Outlet, useLocation } from "react-router-dom";
import { AppBar } from "../components/AppBar/AppBar";
import { Footer } from "../components/Footer/Footer";
import { ScrollToTopButton } from "../components/ScrollToTopButton/ScrollToTopButton";
import { ContactsSection } from "../components/ContactsSection/ContactsSection";
import { LastUpdateSection } from "../components/LastUpdateSection/LastUpdateSection";
import { useEffect, useRef } from "react";
import { useStateContext } from "../state/stateContext";
import { membersApi, photosApi, tournamentsApi } from "../Api/ApiRequest";

const Layout = () => {
  const { setGlobalState } = useStateContext();
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  // Clear admin auth when navigating away from /admin routes
  useEffect(() => {
    const wasOnAdmin = prevPathRef.current.startsWith("/admin");
    const isOnAdmin = location.pathname.startsWith("/admin");
    
    if (wasOnAdmin && !isOnAdmin) {
      // Navigated away from /admin - logout and clear all admin session data
      sessionStorage.removeItem("admin_authenticated");
      sessionStorage.removeItem("admin_active");
      sessionStorage.removeItem("admin_reloading");
      // Clear stage original date mappings
      Object.keys(sessionStorage)
        .filter(key => key.startsWith("admin_stage_original_"))
        .forEach(key => sessionStorage.removeItem(key));
    }
    
    prevPathRef.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    const storedState = JSON.parse(localStorage.getItem("globalState"));

    const members = storedState?.members?.length > 0 ? storedState.members : membersApi();
    members?.sort((a, b) => a.name.localeCompare(b.name));

    const tournaments = storedState?.tournaments?.length > 0 ? storedState.tournaments : tournamentsApi();
    tournaments?.sort((a, b) => a.name.localeCompare(b.name));

    const photos = storedState?.photos?.length > 0 ? storedState.photos : photosApi();
    photos?.sort((a, b) => b.date.localeCompare(a.date));

    setGlobalState((prev) => ({
      ...prev,
      members,
      tournaments,
      photos,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppBar />
      <LastUpdateSection />
      <main>
        <Outlet />
        <ContactsSection />
      </main>

      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default Layout;
