import styled from "styled-components";

export const Section = styled.section`
  background-color: var(--primary-black-color);
  color: var(--primary-white-color);
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

export const TitleH2 = styled.h2`
  text-align: center;
  margin-bottom: 35px;

  font-size: 28px;
  font-weight: 600;
`;

export const AddressWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const Address = styled.address`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;

  font-style: inherit;
`;

export const Text = styled.p`
  font-size: 17px;
  font-weight: 200;
  line-height: 28px;
`;

export const Link = styled.a`
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  border: none;

  display: flex;
  justify-content: left;
  align-items: center;

  font-size: 17px;
  font-weight: 400;
  line-height: 28px;

  color: inherit;

  transition: var(--main-transition);

  &:hover {
    cursor: pointer;
    color: var(--accent-hover-color);
    text-decoration-color: transparent;
  }
`;

export const IconSvg = styled.svg`
  fill: currentColor;
  width: 26px;
  height: 32px;
`;
