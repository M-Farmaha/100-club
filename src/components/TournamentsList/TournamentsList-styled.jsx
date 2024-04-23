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
  height: 100px;

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

export const MembersItemWrap = styled.div`
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

export const MembersItemText = styled.p`
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

  &:nth-child(3) {
    padding-left: 10px;
    width: 120px;
    flex-grow: 1;
  }

  &:nth-child(4) {
    width: 120px;
    justify-content: right;
    text-align: right;

    @media screen and (min-width: 450px) {
      width: 150px;
    }
  }
`;
