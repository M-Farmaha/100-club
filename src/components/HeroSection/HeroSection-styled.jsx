import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const showFromLeft = keyframes`
  0% {
    transform: translate(-120%);
  }
  100% {
    transform: translate(0%);
  }
`;

const posterAnimation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const Section = styled.section`
  position: relative;
  padding-top: 30px;
  padding-bottom: 100px;
`;

export const FirstPoster = styled.div`
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-size: cover;
  background-position: 98% center;
  background-repeat: no-repeat;

  animation: ${posterAnimation} 3s infinite ease-in-out alternate;
`;

export const SecondPoster = styled.div`
  background-color: var(--secondary-black-color);
  z-index: -2;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-size: cover;
  background-position: 98% center;
  background-repeat: no-repeat;
`;

export const SectionWrap = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
  max-width: 1200px;
  overflow: hidden;
`;

export const TitleH1 = styled.h1`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;

  transform: translateX(-120%);
  animation-name: ${showFromLeft};
  animation-duration: 500ms;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
  animation-delay: 200ms;
`;

export const TitleH1Text = styled.p`
  font-family: var(--secondary-font);
  font-size: 80px;
  font-weight: 800;
  padding-top: 20px;
  color: var(--primary-white-color);
`;

export const TitleH2 = styled.h2`
  padding-left: 10px;

  display: flex;
  justify-content: left;
  align-items: center;
  gap: 20px;

  font-family: var(--secondary-font);
  font-weight: 200;

  transform: translateX(-120%);
  animation-name: ${showFromLeft};
  animation-duration: 500ms;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
`;

export const TitleH2Text = styled.p`
  color: #ffed00;
  font-size: 26px;
`;

export const SubTitle = styled.p`
  max-width: 600px;
  margin-bottom: 30px;

  font-size: 16px;
  line-height: 28px;

  color: var(--primary-white-color);

  transform: translateX(-120%);
  animation-name: ${showFromLeft};
  animation-duration: 500ms;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
  animation-delay: 400ms;
`;

export const HeroButtonsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 500px;

  transform: translateX(-120%);
  animation-name: ${showFromLeft};
  animation-duration: 500ms;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
  animation-delay: 600ms;
`;

export const ButtonLink = styled(Link)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  height: 50px;
  padding: 12px;

  border-radius: 50px;

  background-color: var(--primary-black-color);
  color: var(--primary-white-color);
  /* box-shadow: var(--box-shadow); */

  font-size: 14px;
  font-weight: 400;

  transition: var(--main-transition);

  &:hover {
    background-color: var(--accent-hover-color);
  }
`;

export const Button = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  flex-shrink: 0;

  height: 50px;
  padding: 12px;

  border: 2px solid var(--primary-white-color);
  border-radius: 50px;

  color: var(--primary-white-color);

  font-size: 14px;
  font-weight: 400;

  transition: 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border: 2px solid var(--accent-hover-color);
    background-color: var(--accent-hover-color);
  }
`;

export const ButtonIconSvg = styled.svg`
  width: 20px;
  height: 20px;
  fill: currentColor;
`;

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

export const IconSvgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin-left: 10px;
  min-width: 40px;
  width: 40px;
  height: 40px;
  background: linear-gradient(to bottom, #576378, #0d1525);
`;

export const HeartIconSvgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 60px;
  height: 60px;
`;

export const LogoIconWrap = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: 160px;
  color: var(--accent-hover-color);
`;

export const IconSvg = styled.svg`
  width: 100%;
  height: 100%;
  fill: currentColor;
`;
