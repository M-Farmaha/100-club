import { Outlet } from "react-router-dom";
import { ImageGallery } from "../../components/ImageGallery/ImageGallery";
import { useEffect } from "react";

const GalleryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ImageGallery />
      <Outlet />
    </>
  );
};

export default GalleryPage;
