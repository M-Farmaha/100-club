import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform:  perspective(500px) rotateY(0deg);
  }

  to {
    transform:  perspective(500px) rotateY(360deg);
  }
`;

export const LoaderOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99999;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoaderWWrap = styled.div`
  color: var(--primary-black-color);

  width: 25%;
  height: 25%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoaderSvg = styled.svg`
  width: 100%;
  height: 100%;
  fill: currentColor;

  animation: ${rotate360} 1s linear infinite;
`;
