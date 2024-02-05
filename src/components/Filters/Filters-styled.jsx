import styled from "styled-components";

export const Section = styled.section`
  margin-left: auto;
  margin-right: auto;
  padding: 24px;

  background-color: var(--secondary-white-color);
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  gap: 5px;
`;

export const Label = styled.label`
  padding-left: 20px;

  display: flex;
  justify-content: left;
  align-items: left;
  gap: 6px;

  font-size: 14px;
  font-weight: 400;

  transition: var(--main-transition);

  color: ${(props) =>
    props.isFilterFocused
      ? "var(--accent-hover-color)"
      : "var(--primary-grey-color)"};
`;

export const Input = styled.input`
  width: 250px;
  height: 50px;
  padding: 0px 20px;

  font-family: inherit;
  font-size: 16px;

  outline: none;
  border-radius: 50px;
  border: 1px solid var(--primary-black-color);

  color: var(--primary-black-color);
  background-color: var(--secondary-white-color);

  transition: var(--main-transition);

  &::placeholder {
    color: var(--primary-grey-color);
  }

  &:focus {
    background-color: var(--primary-white-color);
    border: 1px solid var(--accent-hover-color);
  }
`;

export const IconWrap = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
`;

export const IconSvg = styled.svg`
  width: 100%;
  height: 100%;
  fill: currentColor;
`;
