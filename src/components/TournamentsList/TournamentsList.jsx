import { List, Section } from "./TournamentsList-styled";
import { TournamentsItem } from "./TournamentsItem";
import { TitleSection } from "../TitleSection/TitleSection";

export const TournamentsList = ({ tournamentsArray }) => {
  return (
    <>
      <Section>
        <TitleSection
          icon={"#icon-tournament"}
          title={"Кількість турнірів: " + tournamentsArray.length}
        />
        <List>
          {tournamentsArray?.map((el, index) => (
            <TournamentsItem key={el.id} el={el} index={index} />
          ))}
        </List>
      </Section>
    </>
  );
};
