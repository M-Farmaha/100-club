import { Outlet } from "react-router-dom";
import { AppBar } from "../components/AppBar/AppBar";
import { Footer } from "../components/Footer/Footer";
import { ScrollToTopButton } from "../components/ScrollToTopButton/ScrollToTopButton";
import { ContactsSection } from "../components/ContactsSection/ContactsSection";
import { LastUpdateSection } from "../components/LastUpdateSection/LastUpdateSection";
import { useEffect } from "react";
import { useStateContext } from "../state/stateContext";
import { membersApi, photosApi, tournamentsApi } from "../Api/ApiRequest";

const Layout = () => {
  const { setGlobalState } = useStateContext();

  useEffect(() => {
    const members = membersApi();
    members?.sort((a, b) => a.name.localeCompare(b.name));

    const tournaments = tournamentsApi();
    tournaments?.sort((a, b) => a.name.localeCompare(b.name));

    const photos = photosApi();
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
