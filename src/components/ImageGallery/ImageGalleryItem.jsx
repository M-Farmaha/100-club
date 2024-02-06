import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ImageGalleryImg, ImageGalleryItemLi } from "./ImageGallery-styled";
import { Loader } from "../Loaders/Loaders";

export const ImageGalleryItem = ({ el, order }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const openModal = () => {
    navigate(`photo/${el.id}?order=${order}`);
  };

  return (
    <>
      <ImageGalleryItemLi id={el.id} onClick={openModal}>
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
