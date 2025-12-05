import { useNavigate, useParams } from "react-router-dom";
import { TitleSection } from "../TitleSection/TitleSection";
import { StagesItem } from "./StagesItem";
import { Button, ButtonIconSvg, List, Section } from "./StagesList-styled";
import { StagesListHeading } from "./StagesListHeading";
import sprite from "../../sprite.svg";
import { useStateContext } from "../../state/stateContext";
import { NotFound } from "../NotFound/NotFound";

export const StagesList = () => {
  const { globalState } = useStateContext();
  const { tournaments } = globalState;

  const navigate = useNavigate();
  const { tournamentId, year } = useParams();
  
  // Find tournament by tournament_id
  const currentTournament = tournaments?.find((t) => t.tournament_id === tournamentId);
  // Find season by year
  const currentSeason = currentTournament?.seasons?.find((s) => s.year === parseInt(year));

  const handleBack = () => {
    navigate(`/tournaments/${tournamentId}`);
  };

  // Show NotFound if tournament or season doesn't exist
  if (!currentTournament) {
    return (
      <Section>
        <NotFound
          title="Турнір не знайдено"
          message={`Турнір "${tournamentId}" не існує.`}
          backPath="/tournaments"
          backLabel="До списку турнірів"
        />
      </Section>
    );
  }

  if (!currentSeason) {
    return (
      <Section>
        <NotFound
          title="Сезон не знайдено"
          message={`Сезон ${year} для турніру "${currentTournament.name}" не існує.`}
          backPath={`/tournaments/${tournamentId}`}
          backLabel="До сезонів"
        />
      </Section>
    );
  }

  return (
    <>
      <Section>
        <TitleSection
          icon={"#icon-medal"}
          title={"Кількість турнірів: " + (currentSeason?.stages?.length || 0)}
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
          {currentSeason?.stages?.map((el, index) => (
            <StagesItem key={el.date} el={el} index={index} />
          ))}
        </List>
      </Section>
    </>
  );
};
