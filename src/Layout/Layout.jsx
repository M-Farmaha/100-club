import { Outlet } from "react-router-dom";
import { AppBar } from "../components/AppBar/AppBar";
import { Footer } from "../components/Footer/Footer";
import { ScrollToTopButton } from "../components/ScrollToTopButton/ScrollToTopButton";
import { ContactsSection } from "../components/ContactsSection/ContactsSection";
import { LastUpdateSection } from "../components/LastUpdateSection/LastUpdateSection";

const Layout = () => {
  return (
    <>
      <AppBar />
      <LastUpdateSection />
      <main>
        <Outlet />
      </main>

      <ContactsSection />
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default Layout;
