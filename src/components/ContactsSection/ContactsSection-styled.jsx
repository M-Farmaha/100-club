import styled from "styled-components";
import { Link } from "react-router-dom";

export const Section = styled.section`
  background: linear-gradient(
    to right,
    var(--secondary-black-color),
    var(--primary-black-color),
    var(--secondary-black-color)
  );

  color: var(--primary-white-color);
  padding-top: 80px;
  padding-bottom: 50px;
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

export const BlockWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 50px;
`;

export const InfoWrap = styled.div`
  min-width: 290px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const SocialWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const Address = styled.address`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: right;
  gap: 5px;

  font-style: inherit;
`;

export const Text = styled.p`
  font-size: 17px;
  font-weight: 200;
  text-align: right;
`;

export const LinkA = styled.a`
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  border: none;

  display: flex;
  align-items: center;
  justify-content: right;

  gap: 10px;

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

export const LinkStyled = styled(Link)`
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  border: none;

  display: flex;
  align-items: center;
  justify-content: right;

  gap: 10px;

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

export const CourtIconSvg = styled.svg`
  width: 80px;
  height: 80px;
`;

export const SocialIconSvg = styled.svg`
  fill: currentColor;
  width: 50px;
  height: 50px;
`;

export const IconSvg = styled.svg`
  fill: currentColor;
  width: 25px;
  height: 25px;
`;

export const PhotoWrap = styled.div`
  width: 240px;
  height: 240px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 3px solid var(--primary-white-color);
  border-radius: 50%;
  overflow: hidden;

  box-shadow: var(--box-shadow);
`;

export const PhotoImg = styled.img`
  width: 100%;
  height: 100%;
`;
