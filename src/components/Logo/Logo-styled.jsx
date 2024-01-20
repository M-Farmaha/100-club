import styled, { keyframes } from "styled-components";

const rotateAnimation = keyframes`
  0% {
    transform: rotate3d(0, 0, 0, 0deg);
  }

  25% {
    transform: rotate3d(0, 1, 0, 360deg);
  }

  100% {
    transform: rotate3d(0, 1, 0, 360deg);
  }
`;

export const LogoWWrap = styled.div`
  width: 80px;
  height: 80px;
  position: relative;

  /* -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d; */
`;

export const LogoSvg = styled.svg`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  /* backface-visibility: inherit; */

  fill: currentColor;

  animation-name: ${rotateAnimation};
  animation-duration: 10s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-delay: 1000ms;
`;
