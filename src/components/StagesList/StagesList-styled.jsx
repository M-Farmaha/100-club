import styled from "styled-components";

export const Section = styled.section`
  padding-bottom: 50px;
  min-height: 800px;
  background-color: var(--secondary-white-color);
`;

export const List = styled.ul``;

export const Item = styled.li`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 50px;

  &:nth-child(odd) {
    background-color: var(--primary-white-color);
  }

  &:nth-child(even) {
    background-color: var(--secondary-white-color);
  }

  &:hover {
    cursor: pointer;
  }

  @media screen and (min-width: 1200px) {
    &:hover {
      background-color: var(--primary-black-color);
      color: var(--primary-white-color);
    }
  }
`;

export const ItemWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-left: 24px;
  padding-right: 24px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
  width: 100%;
  height: 100%;
`;

export const ItemText = styled.p`
  overflow: hidden;
  display: flex;
  justify-content: left;
  align-items: center;
  height: 100%;

  font-size: 16px;
  font-weight: 400;

  &:nth-child(1) {
    width: 35px;
  }

  &:nth-child(2) {
    width: 140px;
    flex-grow: 1;
  }

  &:nth-child(3) {
    width: 190px;
    justify-content: right;
    text-align: right;
  }
`;

export const Heading = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100px;
  background-color: var(--list-heading-bg-color);
  color: var(--primary-black-color);
`;

export const HeadingWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-left: 24px;
  padding-right: 24px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
  width: 100%;
  height: 100%;
`;

export const HeadingText = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: left;
  align-items: center;
  height: 100%;

  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;

  &:nth-child(1) {
    width: 35px;
  }

  &:nth-child(2) {
    width: 140px;
    flex-grow: 1;
  }

  &:nth-child(3) {
    width: 120px;
    justify-content: right;
    text-align: right;
  }
`;

export const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  flex-shrink: 0;

  height: 50px;
  padding: 12px;

  border-radius: 50px;
  background-color: transparent;
  border: 2px solid var(--primary-white-color);
  color: var(--primary-white-color);

  font-size: 14px;
  font-weight: 400;

  transition: 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border: 2px solid var(--accent-hover-color);
    color: var(--accent-hover-color);
  }
`;

export const ButtonIconSvg = styled.svg`
  width: 20px;
  height: 20px;
  fill: currentColor;
`;
