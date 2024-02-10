import styled from "styled-components";

export const Section = styled.section`
  background-color: var(--primary-white-color);
`;

export const Subtitle = styled.h3`
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
  padding: 5px 24px;
  max-width: 1200px;
  font-size: 16px;
  font-weight: 400;
`;

export const ChartWrap = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const ChartElement = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.3;

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }

  &:hover::before {
    content: ${(props) => `"${props.el}"`};
    font-weight: 400;
    font-size: 16px;
    white-space: nowrap;

    position: absolute;
    top: -24px;
    right: 24px;
  }
`;
