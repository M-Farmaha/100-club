import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { apiRequest } from "../../Api/ApiRequests";
import {
  ImageGalleryImg,
  ImageGalleryItem,
  ImageGalleryList,
  Section,
  SectionWrap,
} from "./ImageGallery-styled";

export const ImageGallery = () => {
  const navigate = useNavigate();
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

  const openModal = (el) => {
    navigate(`modal/${el.id}`, {
      state: { el, scrollPosition: window.scrollY },
    });
  };

  return (
    <>
      {galleryArray.length !== 0 && (
        <Section>
          <SectionWrap>
            <ImageGalleryList>
              {galleryArray.map((el, index) => (
                <ImageGalleryItem key={index} onClick={() => openModal(el)}>
                  <ImageGalleryImg src={el.webformatURL} alt={el.tags} />
                </ImageGalleryItem>
              ))}
            </ImageGalleryList>
          </SectionWrap>
        </Section>
      )}

      <Outlet />
    </>
  );
};
