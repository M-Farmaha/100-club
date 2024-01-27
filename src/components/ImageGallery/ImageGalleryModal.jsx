import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ImageCount,
  ImageDescription,
  ImageGalleryModalImg,
  ModalImgWrap,
  NavButton,
  NavIcon,
} from "./ImageGallery-styled";

import sprite from "../../sprite.svg";

import { Loader } from "../Loaders/Loaders";
import { Modal } from "../Modal/Modal";
import { Portal } from "../../Routes/Portal/Portal";
import { apiRequest } from "../../Api/ApiRequest";

export const ImageGalleryModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [galleryArray, setGalleryArray] = useState([]);
  const [currentImg, setCurrentImg] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const liElement = document.getElementById(id);

  useEffect(() => {
    document.body.classList.add("modal-open");
    document.documentElement.classList.add("modal-open");

    if (liElement) {
      const rect = liElement.getBoundingClientRect();
      setScrollPosition(rect.y - rect.height - 100);
    }

    const response = apiRequest();
    const current = response.find((el) => String(el.id) === String(id));
    setGalleryArray(response);
    setCurrentImg(current);
  }, [id, liElement]);

  const closeModal = () => {
    document.body.classList.remove("modal-open");
    document.documentElement.classList.remove("modal-open");

    navigate("/gallery");
    window.scrollTo(0, scrollPosition);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changePicture = (e) => {
    if (galleryArray.length === 0) return;

    const findCurrentIndex = galleryArray.indexOf(currentImg);

    const prev =
      findCurrentIndex === 0
        ? galleryArray[galleryArray.length - 1]
        : galleryArray[findCurrentIndex - 1];

    const next =
      findCurrentIndex === galleryArray.length - 1
        ? galleryArray[0]
        : galleryArray[findCurrentIndex + 1];

    if (e.currentTarget.id === "toLeft" || e.code === "ArrowLeft") {
      navigate(`/gallery/photo/${prev.id}`);
    } else {
      navigate(`/gallery/photo/${next.id}`);
    }

    setIsLoading(true);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
        changePicture(e);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [changePicture]);

  return (
    <>
      <Portal>
        <Modal closeModal={closeModal}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <NavButton
                type="button"
                id="toLeft"
                style={{ left: 0 }}
                onClick={changePicture}
              >
                <NavIcon>
                  <use href={sprite + "#icon-arrow-left"}></use>
                </NavIcon>
              </NavButton>
              <NavButton
                type="button"
                id="toRight"
                style={{ right: 0 }}
                onClick={changePicture}
              >
                <NavIcon>
                  <use href={sprite + "#icon-arrow-right"}></use>
                </NavIcon>
              </NavButton>
            </>
          )}

          {currentImg && (
            <ModalImgWrap>
              <ImageCount>{`${galleryArray.indexOf(currentImg) + 1} / ${
                galleryArray.length
              }`}</ImageCount>

              <ImageDescription>{currentImg?.description}</ImageDescription>
              <ImageGalleryModalImg
                src={currentImg?.path}
                alt={currentImg?.description}
                loading="lazy"
                onLoad={() => setIsLoading(false)}
              />
            </ModalImgWrap>
          )}
        </Modal>
      </Portal>
    </>
  );
};
