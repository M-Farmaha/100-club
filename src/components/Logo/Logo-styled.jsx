import styled, { keyframes } from "styled-components";

const rotateAnimation = keyframes`
  0% {
    transform: perspective(200px) rotateY(0deg);
  }

  25% {
    transform: perspective(200px) rotateY(360deg);
  }

  100% {
    transform: perspective(200px) rotateY(360deg);
  }
`;

export const LogoSvg = styled.svg`
  width: 80px;
  height: 80px;
  fill: currentColor;

  animation-name: ${rotateAnimation};
  animation-duration: 10s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-delay: 1000ms;
`;
