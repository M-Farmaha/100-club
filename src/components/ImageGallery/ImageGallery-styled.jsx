import styled from "styled-components";

export const Section = styled.section`
  min-height: 1200px;
  background-color: var(--primary-white-color);
`;

export const ImageGalleryList = styled.ul`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;

export const ImageGalleryItemLi = styled.li`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 200px;
  color: var(--primary-white-color);
  background: linear-gradient(
    to bottom right,
    var(--primary-white-color),
    var(--primary-black-color)
  );
`;

export const ImageGalleryImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  transition: var(--main-transition);

  &:hover {
    transform: scale(1.06);
    cursor: pointer;
  }
`;

export const ImageGalleryModalImg = styled.img`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  max-height: 100vh;
  object-fit: cover;
`;

export const NavButton = styled.button`
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);

  width: 50px;
  height: 15%;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  background-color: transparent;

  color: var(--primary-white-color);

  transition: var(--main-transition);

  &:hover {
    cursor: pointer;
    color: var(--accent-hover-color);
  }
`;

export const NavIcon = styled.svg`
  width: 60%;
  height: 60%;
  fill: currentcolor;
  filter: drop-shadow(0px 0px 3px rgb(0 0 0 / 0.7));
`;

export const ImageCount = styled.p`
  position: absolute;
  left: 0;
  top: 0;

  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0px 10px;

  color: var(--primary-white-color);
  background-color: transparent;

  font-size: 20px;
  z-index: 1;
`;

export const ImageDate = styled.p`
  position: absolute;
  left: 0;
  bottom: 0;

  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0px 10px;

  color: var(--primary-white-color);
  background-color: transparent;

  font-size: 18px;
  z-index: 1;
`;
