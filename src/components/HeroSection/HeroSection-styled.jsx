import styled from "styled-components";
import { Link } from "react-router-dom";
import Poster from "./poster.jpg";

export const Video = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -6;
`;

export const VideoFilter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -5;

  background: linear-gradient(
    to right,
    var(--secondary-black-color),
    var(--primary-black-color)
  );

  opacity: 0.6;
`;

export const VideoPoster = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -7;

  background-image: url(${Poster});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Section = styled.section`
  min-height: 100vh;
  padding-top: 150px;
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
  max-width: 400px;
  margin-bottom: 30px;

  font-family: var(--secondary-font);
  font-size: 80px;
  font-weight: 800;

  color: var(--primary-white-color);

  & span {
    color: var(--accent-hover-color);
  }
`;

export const SubTitle = styled.p`
  max-width: 400px;
  margin-bottom: 30px;

  font-size: 18px;
  font-weight: 200;
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

  border-radius: 12px;
  padding: 12px;

  background-color: var(--accent-color);
  color: var(--button-color);
  box-shadow: var(--box-shadow);

  font-size: 15px;
  font-weight: 600;

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

  height: 50px;
  border-radius: 12px;
  padding: 12px;

  background-color: var(--accent-color);
  color: var(--button-color);
  box-shadow: var(--box-shadow);

  font-size: 15px;
  font-weight: 600;

  transition: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  

  &:hover {
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
  background: linear-gradient(
    to bottom,
    var(--primary-black-color),
    var(--secondary-black-color)
  );
  opacity: 0.8;
`;

export const IconSvg = styled.svg`
  width: 100%;
  height: 100%;
`;
