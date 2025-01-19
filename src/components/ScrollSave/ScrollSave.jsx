import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollSave = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem(pathname);

    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(pathname, window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return null;
};
