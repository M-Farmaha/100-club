import styled from 'styled-components';

export const Section = styled.section`
  background-color: var(--primary-white-color);
  padding-top: 24px;
  padding-bottom: 100px;
`;

export const SectionWrap = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
  max-width: 1200px;
`;

export const ImageGalleryList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 8px;
`;

export const ImageGalleryItem = styled.li`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 15px 0px;
`;

export const ImageGalleryImg = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;

  transition: var(--main-transition);

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;