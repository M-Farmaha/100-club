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
  }

  @media screen and (min-width: 1200px) {
    &:hover {
      cursor: pointer;
      background-color: var(--primary-grey-color);
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
  background: linear-gradient(
    to right,
    var(--secondary-black-color),
    var(--primary-black-color)
  );

  @media screen and (min-width: 500px) {
    width: 500px;
  }
`;

export const AvatarWrap = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  background: linear-gradient(
    to bottom right,
    var(--primary-white-color),
    var(--primary-black-color)
  );
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// export const ModalTitle = styled.p`
//   position: absolute;
//   top: -34px;
//   left: 24px;
//   font-size: 20px;
// `;

export const DescriptionWrap = styled.div`
  padding: 24px;
  padding-bottom: 72px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  gap: 12px;
`;

export const Text = styled.p`
  color: var(--accent-hover-color);

  font-size: 16px;

  span {
    color: var(--primary-white-color);
    font-weight: 600;
  }
`;
