import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { useStateContext } from "../../state/stateContext";
import { tournamentsApi, membersApi } from "../../Api/ApiRequest";
import {
  fetchTournamentsFromGitHub,
  fetchMembersFromGitHub,
  setAdminBaseline,
} from "./adminHelpers";
import { AdminAuth } from "./AdminAuth";
import { Loader } from "../Loaders/Loaders";
import { AdminContainer } from "./AdminPanel.styled";
import { AdminToastProvider, useAdminToast } from "./AdminToast";

const AdminRouteContent = () => {
  const { globalState, setGlobalState } = useStateContext();
  const [loading, setLoading] = useState(true);
  const baselineSetRef = useRef(false);
  const showToast = useAdminToast();

  // Determine if this is a fresh admin entry or a page refresh
  const isReturningSession = sessionStorage.getItem("admin_active") === "true";

  // Fetch fresh data from GitHub when entering admin
  useEffect(() => {
    if (baselineSetRef.current) return;
    baselineSetRef.current = true;

    const loadFreshData = async () => {
      try {
        const [freshTournaments, freshMembers] = await Promise.all([
          fetchTournamentsFromGitHub(),
          fetchMembersFromGitHub(),
        ]);
        freshTournaments.sort((a, b) => a.name.localeCompare(b.name));
        freshMembers.sort((a, b) => a.name.localeCompare(b.name));
        setAdminBaseline(freshTournaments, freshMembers);

        // Only overwrite working data on first entry, not on refresh
        if (!isReturningSession) {
          setGlobalState((prev) => ({
            ...prev,
            tournaments: freshTournaments,
            members: freshMembers,
          }));
        }
      } catch (err) {
        console.warn("Failed to fetch from GitHub, using bundled data:", err);
        showToast("Не вдалося завантажити дані з GitHub. Використовуються локальні дані.", "warning", 5000);
        const bundled = JSON.parse(JSON.stringify(tournamentsApi()));
        bundled.sort((a, b) => a.name.localeCompare(b.name));
        const bundledMembers = JSON.parse(JSON.stringify(membersApi()));
        bundledMembers.sort((a, b) => a.name.localeCompare(b.name));
        setAdminBaseline(bundled, bundledMembers);

        if (!isReturningSession) {
          setGlobalState((prev) => ({
            ...prev,
            tournaments: bundled,
            members: bundledMembers,
          }));
        }
      } finally {
        sessionStorage.setItem("admin_active", "true");
        setLoading(false);
      }
    };

    loadFreshData();
  }, [setGlobalState, isReturningSession, showToast]);

  if (loading) {
    return (
      <AdminContainer>
        <Loader />
      </AdminContainer>
    );
  }

  return <Outlet />;
};

export const AdminRouteWrapper = () => {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem("admin_authenticated") === "true"
  );

  if (!authenticated) {
    return <AdminAuth onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <AdminToastProvider>
      <AdminRouteContent />
    </AdminToastProvider>
  );
};
