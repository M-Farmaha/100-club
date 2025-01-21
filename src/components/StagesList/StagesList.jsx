import { useNavigate, useParams } from "react-router-dom";
import { TitleSection } from "../TitleSection/TitleSection";
import { StagesItem } from "./StagesItem";
import { Button, ButtonIconSvg, List, Section } from "./StagesList-styled";
import { StagesListHeading } from "./StagesListHeading";
import sprite from "../../sprite.svg";
import { useStateContext } from "../../state/stateContext";

export const StagesList = () => {
  const { globalState } = useStateContext();
  const { tournaments } = globalState;

  const navigate = useNavigate();
  const { id } = useParams();
  const currentTournament = tournaments?.find((t) => t.id === id);

  const handleBack = () => {
    navigate("/tournaments");
  };

  return (
    <>
      <Section>
        <TitleSection
          icon={"#icon-medal"}
          title={"Кількість етапів: " + currentTournament?.stages?.length}
          stats
        >
          <Button onClick={handleBack}>
            <ButtonIconSvg>
              <use href={sprite + "#icon-undo"}></use>
            </ButtonIconSvg>
            Назад
          </Button>
        </TitleSection>
        <List>
          <StagesListHeading />
          {currentTournament?.stages?.map((el, index) => (
            <StagesItem key={el.date} el={el} index={index} />
          ))}
        </List>
      </Section>
    </>
  );
};
