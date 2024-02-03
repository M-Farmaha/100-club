import styled from "styled-components";

export const Section = styled.section`
  margin-top: 100px;

  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;

  background-color: var(--secondary-white-color);
`;

export const Form = styled.form`
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  font-size: 16px;
  font-weight: 600;

  transition: var(--main-transition);

  color: ${(props) =>
    props.isFilterFocused
      ? "var(--accent-hover-color)"
      : "var(--primary-black-color)"};
`;

export const Input = styled.input`
  width: 290px;
  height: 50px;
  padding: 0px 20px;

  font-family: inherit;
  font-size: 16px;

  outline: none;
  border-radius: 50px;
  border: 2px solid var(--primary-black-color);

  color: var(--primary-black-color);
  background-color: var(--secondary-white-color);

  transition: var(--main-transition);

  &:focus {
    background-color: var(--primary-white-color);
    border: 2px solid var(--accent-hover-color);
  }
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
