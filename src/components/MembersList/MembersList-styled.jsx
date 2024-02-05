import styled from "styled-components";

export const Section = styled.section`
  padding-bottom: 100px;
  min-height: 1200px;
  background-color: var(--secondary-white-color);
`;

export const MembersUl = styled.ul`
  color: var(--primary-black-color);
`;

export const MembersItemLi = styled.li`
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
    background-color: var(--primary-grey-color);
    color: var(--primary-white-color);
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

export const Group = styled.div`
  display: flex;
  height: 100%;
`;

export const MembersItemText = styled.p`
  overflow: hidden;
  display: flex;
  justify-content: left;
  align-items: center;

  /* border: 1px solid var(--primary-black-color); */

  height: 100%;

  font-size: 16px;
  font-weight: 400;

  &:nth-child(1) {
    width: 30px;
  }

  &:nth-child(2) {
    width: 120px;
    flex-grow: 1;
  }

  &:nth-child(3) {
    width: 120px;
    justify-content: right;
    text-align: right;

    @media screen and (min-width: 450px) {
      width: 150px;
    }
  }
`;
