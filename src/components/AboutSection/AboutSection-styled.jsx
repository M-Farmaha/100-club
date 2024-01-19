import styled from "styled-components";

export const Section = styled.section`
  background-color: var(--primary-white-color);
  padding-top: 60px;
  padding-bottom: 100px;
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

  gap: 30px;
`;

export const Item = styled.li`
max-width: 500px;
text-align: center;
`;


export const TitleH2 = styled.h2`
text-align: center;
  margin-bottom: 35px;
  font-family: "Manrope";
  font-size: 35px;
  font-style: normal;
  font-weight: 700;
  color: var(--primary-black-color);
`;

export const TitleH3 = styled.h3`
  margin-bottom: 20px;
  font-family: "Manrope";
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  color: var(--primary-black-color);
`;

export const SubTitle = styled.p`
  font-family: "Manrope";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  color: var(--primary-black-color);
  line-height: 28px;
`;

export const AboutIconSvg = styled.svg`
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
`;
