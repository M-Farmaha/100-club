import styled from "styled-components";

export const LogoSvg = styled.svg`
  width: 80px;
  height: 80px;
  fill: currentColor;

  animation: rotateAnimation 10s infinite;

  @keyframes rotateAnimation {
    0% {
      transform: perspective(200px) rotateY(0deg);
    }

    25% {
      transform: perspective(200px) rotateY(360deg);
    }

    100% {
      transform: perspective(200px) rotateY(360deg);
    }
  }
`;
