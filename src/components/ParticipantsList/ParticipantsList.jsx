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
import { getUkrLocaleDate } from "../../helpers/getUkrLocaleDate";

export const ParticipantsList = () => {
  const { globalState } = useStateContext();
  const { tournaments, members } = globalState;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const parts = pathname.split("/");
  const tournamentId = parts[2];
  const stageId = parts[3];

  const { stages } = tournaments?.find((t) => t.id === tournamentId);
  const currentStage = stages?.find((s) => s.date === stageId);

  const getPlayerNameById = (id) => {
    const member = members.find((member) => member.id === id);
    return member ? member.name : "unknown player";
  };

  const sortedPlayers = currentStage?.players
    .map((player) => ({
      ...player,
      name: getPlayerNameById(player?.member_id),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleBack = () => {
    navigate(`/tournaments/${tournamentId}`);
  };

  return (
    <>
      <Section>
        <TitleSection
          icon={"#icon-date"}
          title={getUkrLocaleDate(currentStage?.date)}
        >
          <Button onClick={handleBack}>
            <ButtonIconSvg>
              <use href={sprite + "#icon-undo"}></use>
            </ButtonIconSvg>
            Назад
          </Button>
        </TitleSection>
        <List>
          <ParticipantsListHeading />
          {sortedPlayers?.map((el, index) => (
            <ParticipantsItem key={el.member_id} el={el} index={index} />
          ))}
        </List>
      </Section>
    </>
  );
};
