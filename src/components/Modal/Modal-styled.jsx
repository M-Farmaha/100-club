import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;

  z-index: 999999;

  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalWrap = styled.div`
  background-color: transparent;
  color: var(--primary-white-color);
  overflow: hidden;
  box-shadow: var(--box-shadow);

  outline: none;
  border: none;
`;

export const ButtonClose = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 60px;
  height: 60px;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  background-color: transparent;
  color: var(--primary-white-color);

  transition: var(--main-transition);

  &:hover {
    cursor: pointer;
    color: var(--accent-hover-color);
  }
`;

export const CloseIcon = styled.svg`
  width: 40%;
  height: 40%;
  fill: currentcolor;
  filter: drop-shadow(0px 0px 3px rgb(0 0 0 / 0.7));
`;
