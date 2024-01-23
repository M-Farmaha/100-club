import { useEffect } from "react";
import { ModalOverlay, ModalWrap } from "./Modal-styled";

export const Modal = ({ children, closeModal }) => {
  useEffect(() => {
    const handlePressESC = (e) => {
      if (e.code === "Escape") closeModal();
    };

    window.addEventListener("keydown", handlePressESC);
    document.body.classList.add("modal-open");
    return () => {
      window.removeEventListener("keydown", handlePressESC);
      document.body.classList.remove("modal-open");
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
