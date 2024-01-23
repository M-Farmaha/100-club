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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <>
      <ModalOverlay onClick={handleOverlayClick}>
        <ModalWrap>{children}</ModalWrap>
      </ModalOverlay>
    </>
  );
};
