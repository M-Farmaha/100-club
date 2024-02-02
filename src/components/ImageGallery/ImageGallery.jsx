import { useEffect, useState } from "react";
import { photosApi } from "../../Api/ApiRequest";
import { ImageGalleryItem } from "./ImageGalleryItem";

import { ImageGalleryList, Section } from "./ImageGallery-styled";

export const ImageGallery = () => {
  const [galleryArray, setGalleryArray] = useState([]);

  useEffect(() => {
    const response = photosApi();
    setGalleryArray(response);
  }, []);

  return (
    <>
      <Section>
        <ImageGalleryList>
          {galleryArray?.map((el) => (
            <ImageGalleryItem key={el.id} el={el} />
          ))}
        </ImageGalleryList>
      </Section>
    </>
  );
};
