import styled, { keyframes } from "styled-components";

const showFromLeft = keyframes`
  0% {
    transform: translate(-100%);
  }
  100% {
    transform: translate(0%);
  }
`;

const showFromRight = keyframes`
  0% {
    transform: translate(100%);
  }
  100% {
    transform: translate(0%);
  }
`;

export const Section = styled.section`
  background-color: var(--primary-white-color);
  padding-top: 80px;
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
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
  gap: 50px;
`;

export const Item = styled.li`
  max-width: 500px;
  flex-grow: 1;
  text-align: center;

  transform: ${(props) => (props.even ? "translate(-100%)" : "translate(100%)")};
  animation-name: ${(props) => (props.isVisible ? (props.even ? showFromLeft : showFromRight) : null)};
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
`;

export const TitleH2 = styled.h2`
  text-align: center;
  margin-bottom: 35px;

  font-size: 28px;
  font-weight: 600;

  color: var(--primary-black-color);
`;

export const TitleH3 = styled.h3`
  margin-bottom: 20px;

  font-size: 20px;
  font-weight: 400;
  color: var(--primary-black-color);
`;

export const SubTitle = styled.p`
  font-size: 18px;
  font-weight: 200;
  color: var(--primary-black-color);
  line-height: 28px;
`;

export const AboutIconSvg = styled.svg`
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
`;
