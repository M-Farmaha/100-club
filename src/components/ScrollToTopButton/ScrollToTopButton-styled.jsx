import styled from "styled-components";

export const Button = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--accent-color);
  color: var(--primary-white-color);

  display: flex;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;

  cursor: pointer;

  transition: var(--main-transition);

  animation: floatAnimation 3s infinite ease;
  
  @keyframes floatAnimation {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0);
    }
  }

  &:hover {
    background-color: var(--accent-hover-color);
  }
`;

export const ArrowIconSvg = styled.svg`
  width: 30px;
  height: 30px;
  fill: currentColor;
`;