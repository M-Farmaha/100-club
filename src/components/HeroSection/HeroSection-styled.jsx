import styled from "styled-components";
import { Link } from "react-router-dom";
import PosterImg from "./poster.jpg";

export const Filter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -5;

  background-color: var(--secondary-black-color);
  opacity: 0.2;
`;

export const Poster = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -6;

  background-color: var(--secondary-black-color);
  background-image: url(${PosterImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Section = styled.section`
  height: 100vh;
  padding-bottom: 100px;
`;

export const SectionWrap = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
  max-width: 1200px;
`;

export const TitleH1 = styled.h1`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 30px;

  margin-bottom: 30px;
`;

export const TitleH1Text = styled.p`
  font-family: var(--secondary-font);
  font-size: 80px;
  font-weight: 800;
  padding-top: 20px;

  color: var(--primary-white-color);
`;

export const SubTitle = styled.p`
  max-width: 600px;
  margin-bottom: 30px;

  font-size: 18px;
  font-weight: 400;
  line-height: 28px;

  color: var(--primary-white-color);
`;

export const HeroButtonsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 500px;
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
  box-shadow: var(--box-shadow);

  font-size: 16px;
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

  /* background-color: var(--primary-black-color); */
  color: var(--primary-white-color);
  box-shadow: var(--box-shadow);

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
