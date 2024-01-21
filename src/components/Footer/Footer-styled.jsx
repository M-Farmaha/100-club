import styled, { keyframes } from "styled-components";

const heartbeat = keyframes`
  0% {
    transform: scale(1);
    fill: var(--primary-red-color);
  }

  100% {
    transform: scale(1.5);
  }
`;

export const Section = styled.footer`
  background-color: var(--secondary-white-color);
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const SectionWrap = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
  max-width: 1200px;
`;

export const FooterText = styled.p`
  color: var(--primary-black-color);
  font-family: "Manrope";
  font-size: 14px;
  line-height: 2;
`;

export const FooterIcon = styled.svg`
  width: 14px;
  height: 13px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: -3px;
  fill: var(--primary-black-color);

  animation-name: ${heartbeat};
  animation-duration: 777ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  animation-iteration-count: infinite;
  animation-direction: alternate;
`;

export const FooterLink = styled.a`
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;

  color: inherit;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: inline-block;
  padding: 0px;

  transition: var(--main-transition);

  &:hover {
    color: var(--primary-red-color);
    text-decoration-color: transparent;
  }
`;
