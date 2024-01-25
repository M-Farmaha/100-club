import { useEffect, useState } from "react";
import { apiRequest } from "../../Api/ApiRequest";
import { ImageGalleryItem } from "./ImageGalleryItem";

import { ImageGalleryList, Section, SectionWrap } from "./ImageGallery-styled";

export const ImageGallery = () => {
  const [galleryArray, setGalleryArray] = useState([]);

  useEffect(() => {
    const response = apiRequest();
    setGalleryArray(response);
  }, []);

  return (
    <>
      <Section>
        <SectionWrap>
          <ImageGalleryList>
            {galleryArray?.map((el) => (
              <ImageGalleryItem key={el.id} el={el} />
            ))}
          </ImageGalleryList>
        </SectionWrap>
      </Section>
    </>
  );
};
