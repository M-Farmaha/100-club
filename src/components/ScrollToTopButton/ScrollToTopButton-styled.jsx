import styled from "styled-components";

export const Button = styled.button`
  position: fixed;
  right: 20px;

  ${({ buttonScrollBottom }) => {
    return `
      bottom: ${buttonScrollBottom}px;
    `;
  }}

  background-color: var(--primary-black-color);
  color: var(--primary-white-color);
  box-shadow: var(--box-shadow);

  display: flex;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;

  border: none;
  border-radius: 50%;

  cursor: pointer;

  transition: var(--main-transition);

  animation: floatAnimation 3s infinite ease, appearAnimation 1s ease;

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

  @keyframes appearAnimation {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
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
