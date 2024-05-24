import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { ImageGallery } from "../../components/ImageGallery/ImageGallery";
import { ImageGalleryFilterBar } from "../../components/Filters/ImageGalleryFilterBar";
import { useStateContext } from "../../state/stateContext";

const GalleryPage = () => {
  const { globalState } = useStateContext();
  const { photos } = globalState;

  const [orderedGalleryArray, setOrderedGalleryArray] = useState(photos);
  const [order, setOrder] = useState("newest");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ImageGalleryFilterBar
        galleryArray={photos}
        setOrderedGalleryArray={setOrderedGalleryArray}
        setOrder={setOrder}
      />
      <ImageGallery orderedGalleryArray={orderedGalleryArray} order={order} />

      <Outlet />
    </>
  );
};

export default GalleryPage;
