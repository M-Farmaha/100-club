import { useEffect } from "react";
import { ModalOverlay, ModalWrap } from "./Modal-styled";

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
        <ModalWrap onClick={(e) => e.stopPropagation()}>{children}</ModalWrap>
      </ModalOverlay>
    </>
  );
};
