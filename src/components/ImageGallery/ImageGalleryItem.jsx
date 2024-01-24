import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ImageGalleryImg, ImageGalleryItemLi } from "./ImageGallery-styled";
import { Loader } from "../Loaders/Loaders";

export const ImageGalleryItem = ({ el }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const openModal = (el) => {
    navigate(`modal/${el.id}`, {
      state: { el, scrollPosition: window.scrollY },
    });
  };

  return (
    <>
      <ImageGalleryItemLi onClick={() => openModal(el)}>
        {isLoading && <Loader />}
        <ImageGalleryImg
          loading="lazy"
          src={el.webformatURL}
          alt={el.tags}
          onLoad={() => setIsLoading(false)}
        />
      </ImageGalleryItemLi>


    </>
  );
};
