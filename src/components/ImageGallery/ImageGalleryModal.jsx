import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { ImageGalleryModalImg } from "./ImageGallery-styled";

import { Loader } from "../Loaders/Loaders";
import { Modal } from "../Modal/Modal";
import { Portal } from "../../Routes/Portal/Portal";
import { apiRequest } from "../../Api/ApiRequests";

export const ImageGalleryModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [el, setEl] = useState(state?.el);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!el) {
        console.log("вхід на сайт за посиланням");
        try {
          const { hits } = await apiRequest(1);
          if (hits) {
            const foundEl = hits.find((obj) => String(obj.id) === String(id));
            setEl(foundEl);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [id, el]);

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

  return (
    <>
      <Portal>
        <Modal closeModal={closeModal}>
          {isLoading && <Loader />}
          <ImageGalleryModalImg
            src={el?.largeImageURL}
            alt={el?.tags}
            loading="lazy"
            onLoad={() => setIsLoading(false)}
          />
        </Modal>
      </Portal>
    </>
  );
};
