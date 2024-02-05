import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { photosApi } from "../../Api/ApiRequest";

import { ImageGallery } from "../../components/ImageGallery/ImageGallery";
import { ImageGalleryFilterBar } from "../../components/Filters/ImageGalleryFilterBar";

const GalleryPage = () => {
  const [galleryArray, setGalleryArray] = useState([]);
  const [orderedGalleryArray, setOrderedGalleryArray] = useState(galleryArray);

  useEffect(() => {
    window.scrollTo(0, 0);

    const gallery = photosApi();
    gallery?.sort((a, b) => a.date.localeCompare(b.date));
    setGalleryArray(gallery);
  }, []);

  return (
    <>
      <ImageGalleryFilterBar
        galleryArray={galleryArray}
        setOrderedGalleryArray={setOrderedGalleryArray}
      />
      <ImageGallery orderedGalleryArray={orderedGalleryArray} />
      <Outlet />
    </>
  );
};

export default GalleryPage;
