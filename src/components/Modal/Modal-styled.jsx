import styled from "styled-components";
import { Modal, Box } from "@mui/material";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999999;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;

  overflow-y: auto;
  
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
  top: 16px;
  right: 16px;
  width: 30px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--accent-color);
  color: var(--button-color);
  box-shadow: var(--box-shadow);

  border: none;
  border-radius: 50%;

  transition: var(--main-transition);

  &:hover {
    cursor: pointer;
    background-color: var(--accent-hover-color);
  }
`;

export const CloseIcon = styled.svg`
  width: 75%;
  height: 75%;
  stroke: currentcolor;
`;

export const ModalOverlayMIU = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;

  backdrop-filter: blur(10px);
`;

export const ModalWrapMIU = styled(Box)`
  background-color: transparent;
  color: var(--primary-white-color);
  overflow: hidden;
  box-shadow: var(--box-shadow);

  outline: none;
  border: none;
  border-radius: 0%;
`;
