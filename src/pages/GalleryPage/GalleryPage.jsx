import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { photosApi } from "../../Api/ApiRequest";

import { ImageGallery } from "../../components/ImageGallery/ImageGallery";
import { ImageGalleryFilterBar } from "../../components/Filters/ImageGalleryFilterBar";

const GalleryPage = () => {
  const [galleryArray, setGalleryArray] = useState([]);
  const [orderedGalleryArray, setOrderedGalleryArray] = useState(galleryArray);
  const [order, setOrder] = useState("newest");

  useEffect(() => {
    window.scrollTo(0, 0);
    const gallery = photosApi();
    gallery?.sort((a, b) => b.date.localeCompare(a.date));
    setGalleryArray(gallery);
  }, []);

  return (
    <>
      <ImageGalleryFilterBar
        galleryArray={galleryArray}
        setOrderedGalleryArray={setOrderedGalleryArray}
        setOrder={setOrder}
      />
      <ImageGallery orderedGalleryArray={orderedGalleryArray} order={order} />

      <Outlet />
    </>
  );
};

export default GalleryPage;
