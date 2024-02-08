import styled from "styled-components";

import MaleDefaultImg from "./img/male-dafault.svg";
import FemaleDefaultImg from "./img/female-dafault.svg";
import BirthdayTape from "./img/birthday-tape.svg";
import BirthdayBG from "./img/BirthDayBG.svg";

export const Section = styled.section`
  padding-bottom: 100px;
  min-height: 1200px;
  background-color: var(--secondary-white-color);
`;

export const MembersUl = styled.ul``;

export const MembersItemLi = styled.li`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 50px;

  background-image: url(${(props) => props.isTodayBirthDay ? BirthdayTape : null});
  background-size: contain;
  background-position: center;
  background-repeat: repeat-x;

  &:nth-child(odd) {
    background-color: ${(props) =>
      props.isTodayBirthDay
        ? "var(--secondary-red-color)"
        : "var(--primary-white-color)"};
  }

  &:nth-child(even) {
    background-color: ${(props) =>
      props.isTodayBirthDay
        ? "var(--secondary-red-color)"
        : "var(--secondary-white-color)"};
  }

  &:hover {
    cursor: pointer;
  }

  @media screen and (min-width: 1200px) {
    &:hover {
      background-color: ${(props) =>
        props.isTodayBirthDay
          ? "var(--primary-red-color)"
          : "var(--primary-black-color)"};
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

export const Group = styled.div`
  display: flex;
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

  &:nth-child(1) {
    width: 35px;
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

export const ModalContentWrap = styled.div`
  overflow: auto;
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  color: ${(props) =>
    props.isTodayBirthDay
      ? "var(--primary-black-color)"
      : "var(--primary-white-color)"};

  background-color: ${(props) =>
    props.isTodayBirthDay
      ? "var(--secondary-red-color)"
      : "var(--primary-black-color)"};

  background-image: url(${(props) => props.isTodayBirthDay ? BirthdayBG : null});
  background-size: cover;
  background-position: center;


  @media screen and (min-width: 500px) {
    width: 500px;
  }
`;

export const AvatarWrap = styled.div`
  width: 100%;
  height: auto;
  background: linear-gradient(
    to top right,
    var(--primary-black-color),
    var(--primary-white-color)
  );
`;

export const Avatar = styled.img`
  width: 100%;
  height: 400px;
  object-fit: contain;
  background-image: url(${(props) => props.sex === "male" ? MaleDefaultImg : FemaleDefaultImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 10px 20px;
`;

export const DescriptionWrap = styled.div`
  padding: 24px;
  padding-bottom: 130px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  gap: 10px;
`;

export const Text = styled.p`
  font-size: 16px;
  font-weight: 600;

  span {
    font-weight: 200;
  }
`;
