import { Outlet } from "react-router-dom";
import { AppBar } from "../components/AppBar/AppBar";
import { Footer } from "../components/Footer/Footer";
import { ScrollToTopButton } from "../components/ScrollToTopButton/ScrollToTopButton";
import { ScrollWrap } from "./Layout-styled";

export const Layout = () => {
  return (
    <>
      <AppBar />

      <ScrollWrap>
        <main style={{paddingTop: "100px"}}>
          <Outlet />
        </main>

        <Footer />
        <ScrollToTopButton />
      </ScrollWrap>


      
    </>
  );
};
