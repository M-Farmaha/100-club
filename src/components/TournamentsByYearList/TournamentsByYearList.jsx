import { useNavigate, useParams } from "react-router-dom";
import { List, Section, Item, ItemWrap, ItemText } from "./TournamentsByYearList-styled";
import { TitleSection } from "../TitleSection/TitleSection";
import { useStateContext } from "../../state/stateContext";
import { TournamentLogo } from "../Logo/Logo";
import sprite from "../../sprite.svg";
import {
  Button,
  ButtonIconSvg,
} from "../StagesList/StagesList-styled";

export const TournamentsByYearList = () => {
  const { globalState } = useStateContext();
  const { tournaments } = globalState;
  const { year } = useParams();
  const navigate = useNavigate();

  // Filter tournaments that have a season for the selected year
  const tournamentsForYear = tournaments
    ?.map((tournament) => {
      const season = tournament.seasons?.find((s) => s.year === parseInt(year));
      if (season) {
        return {
          tournament_id: tournament.tournament_id,
          name: tournament.name,
          logo: tournament.logo,
          stagesCount: season.stages?.length || 0,
        };
      }
      return null;
    })
    .filter(Boolean);

  const handleItemClick = (tournamentId) => {
    navigate(`/tournaments/${year}/${tournamentId}`);
  };

  const handleBack = () => {
    navigate("/tournaments");
  };

  return (
    <>
      <Section>
        <TitleSection
          icon={"#icon-cup"}
          title={`Турніри ${year} року`}
        >
          <Button onClick={handleBack}>
            <ButtonIconSvg>
              <use href={sprite + "#icon-undo"}></use>
            </ButtonIconSvg>
            Назад
          </Button>
        </TitleSection>

        <List>
          {tournamentsForYear?.map((el, index) => (
            <Item
              key={el.tournament_id}
              id={el.tournament_id}
              onClick={() => handleItemClick(el.tournament_id)}
            >
              <ItemWrap>
                <TournamentLogo path={el.logo} />
                <ItemText>{el.name}</ItemText>
                <ItemText>Турнірів: {el.stagesCount}</ItemText>
              </ItemWrap>
            </Item>
          ))}
        </List>
      </Section>
    </>
  );
};
