import { useEffect, useState } from "react";
// import Modal from "react-modal";
// import Gallery from "react-image-gallery";
// import "react-image-gallery/styles/css/image-gallery.css";
import { apiRequest } from "../../Api/ApiRequests";
import {
  ImageGalleryImg,
  ImageGalleryItem,
  ImageGalleryList,
  Section,
  SectionWrap,
} from "./ImageGallery-styled";

export const ImageGallery = () => {
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

//   const openModal = (index) => {
//     setSelectedImageIndex(index);
//     setModalIsOpen(true);
//   };

  //   const closeModal = () => {
  //     setModalIsOpen(false);
  //   };

  //   const images = galleryArray.map((item) => ({
  //     original: item.largeImageURL,
  //     thumbnail: item.previewURL,
  //     description: item.tags,
  //   }));

  return (
    <>
      {galleryArray.length && (
        <Section>
          <SectionWrap>
            <ImageGalleryList>
              {galleryArray.map((el, index) => (
                <ImageGalleryItem key={index}>
                  <ImageGalleryImg src={el.webformatURL} alt={el.tags} />
                </ImageGalleryItem>
              ))}
            </ImageGalleryList>
          </SectionWrap>
        </Section>
      )}
      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Gallery Modal"
      >
        <Gallery
          items={images}
          startIndex={selectedImageIndex}
          onRequestClose={closeModal}
        />
      </Modal> */}
    </>
  );
};
