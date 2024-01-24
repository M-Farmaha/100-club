import { Outlet } from "react-router-dom";
import { ImageGallery } from "../../components/ImageGallery/ImageGallery";

const GalleryPage = () => {
  return (
    <>
      <ImageGallery />
      <Outlet />
    </>
  );
};

export default GalleryPage;
