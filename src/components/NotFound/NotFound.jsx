import { useNavigate } from "react-router-dom";
import sprite from "../../sprite.svg";
import {
  NotFoundWrapper,
  NotFoundIcon,
  NotFoundTitle,
  NotFoundText,
  BackButton,
} from "./NotFound-styled";

export const NotFound = ({ 
  title = "Інформацію не знайдено", 
  message = "Схоже, такої сторінки не існує або дані були видалені.",
  backPath = "/tournaments",
  backLabel = "До турнірів"
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(backPath);
  };

  return (
    <NotFoundWrapper>
      <NotFoundIcon>
        <use href={sprite + "#icon-search"}></use>
      </NotFoundIcon>
      <NotFoundTitle>{title}</NotFoundTitle>
      <NotFoundText>{message}</NotFoundText>
      <BackButton onClick={handleBack}>
        <svg>
          <use href={sprite + "#icon-undo"}></use>
        </svg>
        {backLabel}
      </BackButton>
    </NotFoundWrapper>
  );
};
