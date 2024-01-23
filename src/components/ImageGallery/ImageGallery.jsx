import { useEffect, useState } from "react";
import { apiRequest } from "../../Api/ApiRequests";
import {
  ImageGalleryImg,
  ImageGalleryItem,
  ImageGalleryList,
  ImageGalleryModalImg,
  Section,
  SectionWrap,
} from "./ImageGallery-styled";

import { Loader } from "../Loaders/Loaders";

import { ModalOverlayMIU, ModalWrapMIU } from "../Modal/Modal-styled";

export const ImageGallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [galleryArray, setGalleryArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiRequest(1);
        setGalleryArray(response.hits);
      } catch (error) {
        alert(error);
      }
    };

    fetchData();
  }, []);

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
    setIsLoading(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {galleryArray.length !== 0 && (
        <Section>
          <SectionWrap>
            <ImageGalleryList>
              {galleryArray.map((el, index) => (
                <ImageGalleryItem
                  key={index}
                  onClick={() => {
                    openModal(index);
                  }}
                >
                  <ImageGalleryImg src={el.webformatURL} alt={el.tags} />
                </ImageGalleryItem>
              ))}
            </ImageGalleryList>
          </SectionWrap>
        </Section>
      )}

      {isModalOpen && (
        <ModalOverlayMIU
          open={isModalOpen}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-description"
        >
          <ModalWrapMIU>
            {isLoading && <Loader />}
            <ImageGalleryModalImg
              src={galleryArray[selectedImageIndex].largeImageURL}
              alt={galleryArray[selectedImageIndex].tags}
              onLoad={() => setIsLoading(false)}
            />
          </ModalWrapMIU>
        </ModalOverlayMIU>
      )}
    </>
  );
};
