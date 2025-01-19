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
`;

export const SectionWrap = styled.div`
  height: 80px;
  max-width: 1200px;
  padding: 24px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

export const Title = styled.h2`
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

export const LinkWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 30px;
  row-gap: 5px;
`;

export const LinkStyled = styled(Link)`
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  border: none;

  display: flex;
  align-items: center;
  justify-content: right;

  gap: 15px;

  font-size: 16px;
  font-weight: 200;
  line-height: 28px;

  color: inherit;

  transition: var(--main-transition);

  &:hover {
    cursor: pointer;
    color: var(--accent-hover-color);
    text-decoration-color: transparent;
  }
`;
