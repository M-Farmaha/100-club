import styled from "styled-components";

export const LogoSvg = styled.svg`
  width: 80px;
  height: 80px;
  fill: currentColor;

  animation: rotateAnimation 10s infinite ;

  @keyframes rotateAnimation {
    0% {
      transform: perspective(200px) rotateY(0deg);
    }

    5% {
      transform: perspective(200px) rotateY(90deg);
    }

    10% {
      transform: perspective(200px) rotateY(0deg);
    }

    15% {
      transform: perspective(200px) rotateY(-90deg);
    }

    20% {
      transform: perspective(200px) rotateY(0deg);
    }

    100% {
      transform: perspective(200px) rotateY(0deg);
    }
  }
`;
