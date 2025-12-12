import { useNavigate, useParams } from "react-router-dom";
import { List, Section, Item, ItemWrap, ItemText } from "../TournamentsByYearList/TournamentsByYearList-styled";
import { TitleSection } from "../TitleSection/TitleSection";
import { useStateContext } from "../../state/stateContext";
import sprite from "../../sprite.svg";
import {
  Button,
  ButtonIconSvg,
} from "../StagesList/StagesList-styled";
import { NotFound } from "../NotFound/NotFound";

export const TournamentSeasonsList = () => {
  const { globalState } = useStateContext();
  const { tournaments } = globalState;
  const { tournamentId } = useParams();
  const navigate = useNavigate();

  // Find the current tournament
  const currentTournament = tournaments?.find((t) => t.tournament_id === tournamentId);
  
  // Get seasons sorted by year descending (newest first)
  const seasons = [...(currentTournament?.seasons || [])].sort((a, b) => b.year - a.year);

  const handleYearClick = (year) => {
    navigate(`/tournaments/${tournamentId}/${year}`);
  };

  const handleBack = () => {
    navigate("/tournaments");
  };

  // Show NotFound if tournament doesn't exist
  if (!currentTournament) {
    return (
      <Section>
        <NotFound
          title="Турнір не знайдено"
          message={`Турнір з ідентифікатором "${tournamentId}" не існує.`}
          backPath="/tournaments"
          backLabel="До списку турнірів"
        />
      </Section>
    );
  }

  return (
    <>
      <Section>
        <TitleSection
          icon={"#icon-cup"}
          title={currentTournament?.name || "Турнір"}
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
          {seasons?.map((season, index) => (
            <Item
              key={season.year}
              id={season.year}
              onClick={() => handleYearClick(season.year)}
            >
              <ItemWrap>
                <ItemText style={{ flexGrow: 1 }}>
                  Сезон {season.year}
                </ItemText>
                <ItemText style={{ textAlign: "right", justifyContent: "flex-end" }}>
                  Турнірів: {season.stages?.length || 0}
                </ItemText>
              </ItemWrap>
            </Item>
          ))}
        </List>
      </Section>
    </>
  );
};
