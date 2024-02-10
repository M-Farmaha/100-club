import { MembersUl, Section } from "./Members-styled";
import { MembersItem } from "./MembersItem";
import { TitleSection } from "../TitleSection/TitleSection";

export const MembersList = ({ visibleMembersArray }) => {
  return (
    <>
      <Section>
        <TitleSection
          icon={"#icon-users"}
          title={"Кількість учасників: " + visibleMembersArray.length}
        />
        <MembersUl>
          {visibleMembersArray?.map((el, index) => (
            <MembersItem key={el.id} el={el} index={index} />
          ))}
        </MembersUl>
      </Section>
    </>
  );
};
