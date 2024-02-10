import styled from "styled-components";

export const Section = styled.section`
  background: linear-gradient(
    to right,
    var(--secondary-black-color),
    var(--primary-black-color),
    var(--secondary-black-color)
  );
  color: var(--primary-white-color);
`;

export const Title = styled.h2`
  max-width: 1200px;
  padding: 24px;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  justify-content: left;
  align-items: center;
  gap: 15px;

  font-weight: 500;
  font-size: 16px;
`;

export const IconWrap = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
`;

export const IconSvg = styled.svg`
  width: 100%;
  height: 100%;
  fill: currentColor;
`;
