import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { useStateContext } from "../../state/stateContext";
import { tournamentsApi } from "../../Api/ApiRequest";
import {
  fetchTournamentsFromGitHub,
  setAdminBaseline,
} from "./adminHelpers";
import { Loader } from "../Loaders/Loaders";
import { AdminContainer, SuccessMessage } from "./AdminPanel.styled";

export const AdminRouteWrapper = () => {
  const { globalState, setGlobalState } = useStateContext();
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const baselineSetRef = useRef(false);

  // Determine if this is a fresh admin entry or a page refresh
  const isReturningSession = sessionStorage.getItem("admin_active") === "true";

  // Fetch fresh data from GitHub when entering admin
  useEffect(() => {
    if (baselineSetRef.current) return;
    baselineSetRef.current = true;

    const loadFreshData = async () => {
      try {
        const freshTournaments = await fetchTournamentsFromGitHub();
        freshTournaments.sort((a, b) => a.name.localeCompare(b.name));
        setAdminBaseline(freshTournaments);

        // Only overwrite working data on first entry, not on refresh
        if (!isReturningSession) {
          setGlobalState((prev) => ({ ...prev, tournaments: freshTournaments }));
        }
      } catch (err) {
        console.warn("Failed to fetch from GitHub, using bundled data:", err);
        setFetchError("⚠️ Не вдалося завантажити дані з GitHub. Використовуються локальні дані.");
        const bundled = JSON.parse(JSON.stringify(tournamentsApi()));
        bundled.sort((a, b) => a.name.localeCompare(b.name));
        setAdminBaseline(bundled);

        if (!isReturningSession) {
          setGlobalState((prev) => ({ ...prev, tournaments: bundled }));
        }
      } finally {
        sessionStorage.setItem("admin_active", "true");
        setLoading(false);
      }
    };

    loadFreshData();
  }, [setGlobalState, isReturningSession]);

  // Clear fetch error after 5 seconds
  useEffect(() => {
    if (fetchError) {
      const timer = setTimeout(() => setFetchError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [fetchError]);

  if (loading) {
    return (
      <AdminContainer>
        <Loader />
      </AdminContainer>
    );
  }

  return (
    <>
      {fetchError && (
        <AdminContainer>
          <SuccessMessage
            style={{
              background: "rgba(255, 168, 0, 0.1)",
              color: "#e6a200",
            }}
          >
            {fetchError}
          </SuccessMessage>
        </AdminContainer>
      )}
      <Outlet />
    </>
  );
};
