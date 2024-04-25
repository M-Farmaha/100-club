import { List, Section } from "./TournamentsList-styled";
import { TournamentsItem } from "./TournamentsItem";
import { TitleSection } from "../TitleSection/TitleSection";

export const TournamentsList = ({ tournamentsArray, membersArray }) => {
  return (
    <>
      <Section>
        <TitleSection
          icon={"#icon-cup"}
          title={"Кількість турнірів: " + tournamentsArray.length}
        />

        <List>
          {tournamentsArray?.map((el, index) => (
            <TournamentsItem
              key={el.id}
              el={el}
              index={index}
              membersArray={membersArray}
            />
          ))}
        </List>
      </Section>
    </>
  );
};
