import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ImageGalleryImg, ImageGalleryItemLi } from "./ImageGallery-styled";
import { Loader } from "../Loaders/Loaders";

export const ImageGalleryItem = ({ el, order }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const openModal = (el) => {
    navigate(`photo/${el.id}?order=${order}`);
  };

  return (
    <>
      <ImageGalleryItemLi id={el.id} onClick={() => openModal(el)}>
        {isLoading && <Loader />}
        <ImageGalleryImg
          loading="lazy"
          src={el.path}
          alt={el.id}
          onLoad={() => setIsLoading(false)}
        />
      </ImageGalleryItemLi>
    </>
  );
};
