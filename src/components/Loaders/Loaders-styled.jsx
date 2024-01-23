import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LoaderWWrap = styled.div`
  z-index: 99999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 25%;
  height: 25%;

  display: flex;
  align-items: center;
  justify-content: center;
  color: currentColor;
`;

export const LoaderSvg = styled.svg`
  width: 100%;
  height: 100%;
  fill: currentColor;

  animation: ${rotate360} 5s linear infinite;
`;
