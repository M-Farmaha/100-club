import { ImageGalleryItem } from "./ImageGalleryItem";

import { ImageGalleryList, Section } from "./ImageGallery-styled";

export const ImageGallery = ({ orderedGalleryArray }) => {
  return (
    <>
      <Section>
        <ImageGalleryList>
          {orderedGalleryArray?.map((el) => (
            <ImageGalleryItem key={el.id} el={el} />
          ))}
        </ImageGalleryList>
      </Section>
    </>
  );
};
