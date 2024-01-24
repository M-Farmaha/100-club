import styled from "styled-components";

export const Section = styled.section`
  background-color: var(--primary-white-color);
  padding-bottom: 100px;
  min-height: 1300px;
`;

export const SectionWrap = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
`;

export const ImageGalleryList = styled.ul`
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
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const ImageGalleryModalImg = styled.img`
  max-width: 100vw;
  max-height: 100vh;
  object-fit: scale-down;
`;
