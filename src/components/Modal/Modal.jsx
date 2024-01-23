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

  return (
    <>
      <ModalOverlay onClick={closeModal}>
        <ModalWrap onClick={(e) => e.stopPropagation()}>{children}</ModalWrap>
      </ModalOverlay>
    </>
  );
};
