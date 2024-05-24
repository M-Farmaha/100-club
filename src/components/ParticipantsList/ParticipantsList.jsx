import { useLocation, useNavigate } from "react-router-dom";
import { TitleSection } from "../TitleSection/TitleSection";

import {
  Button,
  ButtonIconSvg,
  List,
  Section,
} from "./ParticipantsList-styled";
import { ParticipantsListHeading } from "./ParticipantsListHeading";
import sprite from "../../sprite.svg";
import { ParticipantsItem } from "./ParticipantsItem";
import { useStateContext } from "../../state/stateContext";

export const ParticipantsList = () => {
  const { globalState } = useStateContext();
  const { tournaments } = globalState;

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const parts = pathname.split("/");
  const tournamentId = parts[2];
  const stageId = parts[3];

  const { stages } = tournaments?.find((t) => t.id === tournamentId);
  const currentStage = stages?.find((s) => s.date === stageId);

  const handleBack = () => {
    navigate(`/tournaments/${tournamentId}`);
  };

  return (
    <>
      <Section>
        <TitleSection icon={"#icon-users"} title={currentStage?.date}>
          <Button onClick={handleBack}>
            <ButtonIconSvg>
              <use href={sprite + "#icon-undo"}></use>
            </ButtonIconSvg>
            Назад
          </Button>
        </TitleSection>
        <List>
          <ParticipantsListHeading />
          {currentStage?.players?.map((el, index) => (
            <ParticipantsItem key={el.member_id} el={el} index={index} />
          ))}
        </List>
      </Section>
    </>
  );
};
