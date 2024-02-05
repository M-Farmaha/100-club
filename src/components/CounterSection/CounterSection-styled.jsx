import styled from "styled-components";

export const Section = styled.section`
  background-color: var(--primary-black-color);
  color: var(--primary-white-color);
`;

export const Text = styled.p`
  max-width: 1200px;
  padding: 24px;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  justify-content: left;
  align-items: center;
  gap: 10px;
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