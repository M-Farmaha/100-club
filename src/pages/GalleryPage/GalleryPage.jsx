import { useState } from "react";
import { Outlet } from "react-router-dom";

import { ImageGallery } from "../../components/ImageGallery/ImageGallery";
import { ImageGalleryFilterBar } from "../../components/Filters/ImageGalleryFilterBar";

const GalleryPage = () => {
  const [orderedGalleryArray, setOrderedGalleryArray] = useState();

  return (
    <>
      <ImageGalleryFilterBar setOrderedGalleryArray={setOrderedGalleryArray} />
      <ImageGallery orderedGalleryArray={orderedGalleryArray} />

      <Outlet />
    </>
  );
};

export default GalleryPage;
