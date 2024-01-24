import { useEffect } from "react";
import {
  ButtonClose,
  CloseIcon,
  ModalOverlay,
  ModalWrap,
} from "./Modal-styled";

import sprite from "../../sprite.svg";

export const Modal = ({ children, closeModal }) => {
  useEffect(() => {
    const handlePressESC = (e) => {
      if (e.code === "Escape") closeModal();
    };

    window.addEventListener("keydown", handlePressESC);

    return () => {
      window.removeEventListener("keydown", handlePressESC);
    };
  }, [closeModal]);

  return (
    <>
      <ModalOverlay onClick={closeModal}>
        <ButtonClose type="button">
          <CloseIcon>
            <use href={sprite + "#icon-close"}></use>
          </CloseIcon>
        </ButtonClose>
        <ModalWrap onClick={(e) => e.stopPropagation()}>{children}</ModalWrap>
      </ModalOverlay>
    </>
  );
};
