import styled, { keyframes } from "styled-components";

const rotateAnimation = keyframes`
  0% {
    -webkit-transform: perspective(200px) rotateY(0deg);
    transform: perspective(200px) rotateY(0deg);
  }

  25% {
    -webkit-transform: perspective(200px) rotateY(360deg);
    transform: perspective(200px) rotateY(360deg);
  }

  100% {
    -webkit-transform: perspective(200px) rotateY(0deg);
    transform: perspective(200px) rotateY(360deg);
  }
`;

export const LogoWWrap = styled.div`
  width: 80px;
  height: 80px;
  transform-style: preserve-3d;
`;

export const LogoSvg = styled.svg`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: inherit;
  
  fill: currentColor;

  animation-name: ${rotateAnimation};
  animation-duration: 10s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-delay: 1000ms;
`;
