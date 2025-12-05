import { useNavigate } from "react-router-dom";
import { List, Section, Item, MembersItemWrap, MembersItemText } from "./TournamentsList-styled";
import { TitleSection } from "../TitleSection/TitleSection";
import { useStateContext } from "../../state/stateContext";
import { TournamentLogo } from "../Logo/Logo";

export const TournamentsList = () => {
  const { globalState } = useStateContext();
  const { tournaments } = globalState;
  const navigate = useNavigate();

  // Sort tournaments alphabetically by name
  const sortedTournaments = [...(tournaments || [])].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  const handleTournamentClick = (tournamentId) => {
    navigate(`/tournaments/${tournamentId}`);
  };

  return (
    <>
      <Section>
        <TitleSection
          icon={"#icon-cup"}
          title={"Вибір турніру"}
          superStats
        />

        <List>
          {sortedTournaments?.map((tournament, index) => (
            <Item 
              key={tournament.tournament_id} 
              id={tournament.tournament_id} 
              onClick={() => handleTournamentClick(tournament.tournament_id)}
            >
              <MembersItemWrap>
                <MembersItemText>{index + 1}.</MembersItemText>
                <TournamentLogo path={tournament.logo} />
                <MembersItemText style={{ flexGrow: 1, paddingLeft: 10 }}>
                  {tournament.name}
                </MembersItemText>
                <MembersItemText>
                  Сезонів: {tournament.seasons?.length || 0}
                </MembersItemText>
              </MembersItemWrap>
            </Item>
          ))}
        </List>
      </Section>
    </>
  );
};
