import { Outlet } from "react-router-dom";
import { AppBar } from "../components/AppBar/AppBar";
import { Footer } from "../components/Footer/Footer";

export const Layout = () => {
  return (
    <>
      <AppBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
