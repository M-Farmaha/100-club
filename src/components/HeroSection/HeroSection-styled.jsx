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

  background-color: var(--secondary-black-color);
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
  padding-top: 200px;
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
  font-family: "Manrope";
  font-size: 50px;
  font-weight: 900;
  color: var(--primary-white-color);

  & span {
    color: var(--accent-color);
    font-weight: 900;
  }
`;

export const SubTitle = styled.p`
  max-width: 400px;
  margin-bottom: 30px;
  font-family: "Manrope";
  font-size: 18px;
  font-weight: 400;
  color: var(--primary-white-color);
  line-height: 28px;
`;

export const ButtonLink = styled(Link)`
  height: 50px;
  border-radius: 12px;
  padding: 12px;
  margin-right: 10px;
  margin-bottom: 10px;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  background-color: var(--accent-color);
  color: var(--primary-white-color);

  font-size: 16px;
  font-family: "Manrope";
  font-weight: 600;

  transition: var(--main-transition);

  &:hover {
    background-color: var(--accent-hover-color);
  }
`;
