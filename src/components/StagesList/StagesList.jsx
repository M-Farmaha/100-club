import { useLocation } from "react-router-dom";
import { TitleSection } from "../TitleSection/TitleSection";
import { StagesItem } from "./StagesItem";
import { List, Section } from "./StagesList-styled";
import { StagesListHeading } from "./StagesListHeading";

export const StagesList = () => {
  const { state } = useLocation();
  return (
    <>
      <Section>
        <TitleSection
          icon={"#icon-medal"}
          title={"Кількість етапів: " + state?.stages?.length}
        />
        <List>
          <StagesListHeading />
          {state?.stages?.map((el, index) => (
            <StagesItem key={el.date} el={el} index={index} />
          ))}
        </List>
      </Section>
    </>
  );
};
