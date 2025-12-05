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
import { getPlayerNameById } from "../../helpers/getPlayerNameById";
import { NotFound } from "../NotFound/NotFound";

export const ParticipantsList = () => {
  const { globalState } = useStateContext();
  const { tournaments, members } = globalState;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const parts = pathname.split("/");
  const tournamentId = parts[2];
  const year = parts[3];
  const stageId = parts[4];

  // Find tournament by tournament_id
  const currentTournament = tournaments?.find((t) => t.tournament_id === tournamentId);
  // Find season by year
  const currentSeason = currentTournament?.seasons?.find((s) => s.year === parseInt(year));
  // Find stage by date
  const currentStage = currentSeason?.stages?.find((s) => s.date === stageId);

  const sortedPlayers = currentStage?.players
    ?.map((player) => ({
      ...player,
      name: getPlayerNameById(player?.member_id, members),
    }))
    .sort((a, b) => {
      if (a.position === b.position) {
        return a.name.localeCompare(b.name);
      }
      return a.position - b.position;
    });

  const handleBack = () => {
    navigate(`/tournaments/${tournamentId}/${year}`);
  };

  // Show NotFound for invalid data
  if (!currentTournament || !currentSeason) {
    return (
      <Section>
        <NotFound
          title="Дані не знайдено"
          message="Турнір або сезон не існує."
          backPath="/tournaments"
          backLabel="До турнірів"
        />
      </Section>
    );
  }

  if (!currentStage) {
    return (
      <Section>
        <NotFound
          title="Етап не знайдено"
          message={`Етап ${stageId} для турніру "${currentTournament.name}" (${year}) не існує.`}
          backPath={`/tournaments/${tournamentId}/${year}`}
          backLabel="До турнірів"
        />
      </Section>
    );
  }

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
            <ParticipantsItem key={index} el={el} index={index} />
          ))}
        </List>
      </Section>
    </>
  );
};
