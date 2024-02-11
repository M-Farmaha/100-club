import styled from "styled-components";
import PosterImg from "./img/poster.jpg";

export const Section = styled.section`
  padding-top: 100px;
  padding-bottom: 100px;
  background-color: var(--secondary-black-color);
  background-image: url(${PosterImg});
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;

`;

export const SectionWrap = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
  max-width: 1200px;
`;

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

export const Item = styled.li`
  width: 200px;
  flex-grow: 1;
  text-align: center;
`;

export const TitleH3 = styled.h3`
  font-size: 50px;
  font-weight: 800;
  color: var(--primary-white-color);
`;

export const SubTitle = styled.p`
  font-size: 20px;
  font-weight: 200;
  color: var(--primary-white-color);
`;

export const StatsIconSvg = styled.svg`
  width: 80px;
  height: 80px;
  fill: var(--primary-white-color);
  background-color: rgba(45, 219, 42, 0.1);

  border: outset;
  border-width: 1px;
  border-radius: 50%;

  margin-bottom: 10px;
`;
