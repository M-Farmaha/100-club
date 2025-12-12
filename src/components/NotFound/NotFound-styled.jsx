import styled from "styled-components";

export const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 40px 20px;
  text-align: center;
  background-color: var(--secondary-white-color);
  border-radius: 8px;
`;

export const NotFoundIcon = styled.svg`
  width: 80px;
  height: 80px;
  fill: var(--player-default-color);
  margin-bottom: 20px;
  opacity: 0.6;
`;

export const NotFoundTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: var(--primary-black-color);
  margin-bottom: 12px;
`;

export const NotFoundText = styled.p`
  font-size: 16px;
  color: var(--player-default-color);
  margin-bottom: 24px;
  max-width: 400px;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  color: var(--primary-white-color);
  background-color: var(--accent-color);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--accent-hover-color);
  }

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
`;
