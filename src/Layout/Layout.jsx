import { Outlet } from "react-router-dom";
import { AppBar } from "../components/AppBar/AppBar";
import { Footer } from "../components/Footer/Footer";
import { ScrollToTopButton } from "../components/ScrollToTopButton/ScrollToTopButton";

export const Layout = () => {
  return (
    <>
      <AppBar />

      <main style={{ paddingTop: "100px" }}>
        <Outlet />
      </main>

      <Footer />
      <ScrollToTopButton />
    </>
  );
};
