import styled from "styled-components";

export const LogoSvg = styled.svg`
  transform-style: preserve-3d;
  width: 80px;
  height: 80px;
  fill: currentColor;

  animation: rotateAnimation 10s infinite ease-in-out;

  @keyframes rotateAnimation {
    0% {
      transform: perspective(200px) rotateY(-360deg);
    }

    25% {
      transform: perspective(200px) rotateY(0deg);
    }
  }
`;
