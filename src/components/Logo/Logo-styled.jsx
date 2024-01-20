import styled from "styled-components";

export const LogoSvg = styled.svg`
  width: 80px;
  height: 80px;
  fill: currentColor;

  animation: rotateAnimation 10s infinite ease-in-out;

  @keyframes rotateAnimation {
  0% {
    -webkit-transform: perspective(200px) rotateY(-360deg);
    transform: perspective(200px) rotateY(-360deg);
  }

  25% {
    -webkit-transform: perspective(200px) rotateY(0deg);
    transform: perspective(200px) rotateY(0deg);
  }
}

`;
