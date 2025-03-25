import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ImageGalleryImg, ImageGalleryItemLi } from "./ImageGallery-styled";
import { Loader } from "../Loaders/Loaders";
import { useStateContext } from "../../state/stateContext";

export const ImageGalleryItem = ({ el }) => {
  const { globalState } = useStateContext();
  const { filters } = globalState;
  const { date } = filters.galleryPage || {};

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const openModal = () => {
    navigate(`photo/${el.id}?order=${date}`);
  };

  return (
    <>
      <ImageGalleryItemLi id={el.id} onClick={openModal}>
        {isLoading && <Loader />}
        <ImageGalleryImg loading="lazy" src={el.path} alt={el.id} onLoad={() => setIsLoading(false)} />
      </ImageGalleryItemLi>
    </>
  );
};
