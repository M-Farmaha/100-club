import styled from "styled-components";

export const Section = styled.section`
  padding-top: 100px;
  color: var(--secondary-white-color);
  background: linear-gradient(
    to right,
    var(--secondary-black-color),
    var(--primary-black-color),
    var(--secondary-black-color)
  );
`;

export const Text = styled.p`
  max-width: 1200px;
  padding: 5px 24px;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  font-size: 13px;
  font-weight: 200;
`;

export const IconWrap = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 13px;
  height: 13px;
`;

export const IconSvg = styled.svg`
  width: 100%;
  height: 100%;
  fill: currentColor;
`;
