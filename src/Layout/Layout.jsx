import { Outlet } from "react-router-dom";
import { AppBar } from "../components/AppBar/AppBar";
import { Footer } from "../components/Footer/Footer";
import { ScrollToTopButton } from "../components/ScrollToTopButton/ScrollToTopButton";
import { ContactsSection } from "../components/ContactsSection/ContactsSection";

const Layout = () => {
  return (
    <>
      <AppBar />

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
