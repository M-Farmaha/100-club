import { Outlet, useLocation, useBlocker } from "react-router-dom";
import { AppBar } from "../components/AppBar/AppBar";
import { Footer } from "../components/Footer/Footer";
import { ScrollToTopButton } from "../components/ScrollToTopButton/ScrollToTopButton";
import { ContactsSection } from "../components/ContactsSection/ContactsSection";
import { LastUpdateSection } from "../components/LastUpdateSection/LastUpdateSection";
import { useEffect, useRef, useCallback } from "react";
import { useStateContext } from "../state/stateContext";
import { membersApi, photosApi, tournamentsApi } from "../Api/ApiRequest";
import {
  hasAdminUnsavedChanges,
  clearAdminBaseline,
} from "../components/AdminPanel/adminHelpers";
import { ConfirmModal } from "../components/AdminPanel/ConfirmModal";

const Layout = () => {
  const { globalState, setGlobalState } = useStateContext();
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const tournamentsRef = useRef(globalState.tournaments);
  tournamentsRef.current = globalState.tournaments;

  const cleanupAdminSession = useCallback(() => {
    sessionStorage.removeItem("admin_authenticated");
    sessionStorage.removeItem("admin_active");
    sessionStorage.removeItem("admin_reloading");
    Object.keys(sessionStorage)
      .filter((key) => key.startsWith("admin_stage_original_"))
      .forEach((key) => sessionStorage.removeItem(key));
    clearAdminBaseline();

    // Reset tournaments to bundled JSON so localStorage no longer holds admin edits
    const freshTournaments = JSON.parse(JSON.stringify(tournamentsApi()));
    freshTournaments.sort((a, b) => a.name.localeCompare(b.name));
    setGlobalState((prev) => ({ ...prev, tournaments: freshTournaments }));
  }, [setGlobalState]);

  // Block navigation away from /admin when there are unsaved changes
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) => {
      const leavingAdmin =
        currentLocation.pathname.startsWith("/admin") &&
        !nextLocation.pathname.startsWith("/admin");
      if (!leavingAdmin) return false;
      return hasAdminUnsavedChanges(tournamentsRef.current);
    }
  );

  const handleConfirmLeave = useCallback(() => {
    cleanupAdminSession();
    blocker.proceed();
  }, [cleanupAdminSession, blocker]);

  const handleCancelLeave = useCallback(() => {
    blocker.reset();
  }, [blocker]);

  // Clean up admin session when navigating away without unsaved changes
  useEffect(() => {
    const wasOnAdmin = prevPathRef.current.startsWith("/admin");
    const isOnAdmin = location.pathname.startsWith("/admin");

    if (wasOnAdmin && !isOnAdmin) {
      cleanupAdminSession();
    }

    prevPathRef.current = location.pathname;
  }, [location.pathname, cleanupAdminSession]);

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

      <ConfirmModal
        isOpen={blocker.state === "blocked"}
        onConfirm={handleConfirmLeave}
        onCancel={handleCancelLeave}
        title="Незбережені зміни"
        message="У вас є незбережені зміни в адмін панелі. Якщо ви покинете сторінку, всі зміни будуть втрачені."
        confirmText="Покинути"
        cancelText="Залишитись"
        requirePassword={false}
        variant="danger"
      />
    </>
  );
};

export default Layout;
