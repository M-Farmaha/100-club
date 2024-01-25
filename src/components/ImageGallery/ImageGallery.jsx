import { useEffect, useState } from "react";
import { apiRequest } from "../../Api/ApiRequests";
import { ImageGalleryItem } from "./ImageGalleryItem";

import { ImageGalleryList, Section, SectionWrap } from "./ImageGallery-styled";

export const ImageGallery = () => {
  const [galleryArray, setGalleryArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiRequest(1);
        setGalleryArray(response.hits);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Section>
        <SectionWrap>
          <ImageGalleryList>
            {galleryArray?.map((el, index) => (
              <ImageGalleryItem key={index} el={el} />
            ))}
          </ImageGalleryList>
        </SectionWrap>
      </Section>
    </>
  );
};
