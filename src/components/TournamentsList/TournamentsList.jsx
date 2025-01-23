import { List, Section } from "./TournamentsList-styled";
import { TournamentsItem } from "./TournamentsItem";
import { TitleSection } from "../TitleSection/TitleSection";
import { useStateContext } from "../../state/stateContext";

export const TournamentsList = () => {
  const { globalState } = useStateContext();
  const { tournaments } = globalState;

  const sortedByYear = tournaments.sort((a, b) => b.year - a.year);

  return (
    <>
      <Section>
        <TitleSection
          icon={"#icon-cup"}
          title={"Кількість турнірів: " + tournaments?.length}
        />

        <List>
          {sortedByYear?.map((el, index) => (
            <TournamentsItem key={el.id} el={el} index={index} />
          ))}
        </List>
      </Section>
    </>
  );
};
