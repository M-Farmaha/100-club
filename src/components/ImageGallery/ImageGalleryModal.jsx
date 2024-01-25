import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  ImageGalleryModalImg,
  NavButton,
  NavIcon,
} from "./ImageGallery-styled";

import sprite from "../../sprite.svg";

import { Loader } from "../Loaders/Loaders";
import { Modal } from "../Modal/Modal";
import { Portal } from "../../Routes/Portal/Portal";
import { apiRequest } from "../../Api/ApiRequests";

export const ImageGalleryModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [galleryArray, setGalleryArray] = useState([]);
  const [currentImg, setCurrentImg] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { hits } = await apiRequest(1);
        setGalleryArray(hits);
        const current = hits.find((obj) => String(obj.id) === String(id));
        setCurrentImg(current);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    document.body.classList.add("modal-open");
    document.documentElement.classList.add("modal-open");
  }, []);

  const closeModal = () => {
    document.body.classList.remove("modal-open");
    document.documentElement.classList.remove("modal-open");

    navigate("/gallery");
    window.scrollTo(0, state?.scrollPosition);
  };

  const changePicture = (e) => {
    if (galleryArray.length === 0) return;

    const findCurrentIndex = galleryArray.indexOf(currentImg);

    const prev =
      findCurrentIndex === 0
        ? galleryArray.length[galleryArray.length - 1]
        : galleryArray[findCurrentIndex - 1];

    const next =
      findCurrentIndex === galleryArray.length - 1
        ? galleryArray[0]
        : galleryArray[findCurrentIndex + 1];

    if (e.currentTarget.id === "toLeft") {
      navigate(`/gallery/modal/${prev.id}`);
    } else {
      navigate(`/gallery/modal/${next.id}`);
    }

    setIsLoading(true);
  };

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
            <ImageGalleryModalImg
              src={currentImg?.largeImageURL}
              alt={currentImg?.tags}
              loading="lazy"
              onLoad={() => setIsLoading(false)}
            />
          )}
        </Modal>
      </Portal>
    </>
  );
};
