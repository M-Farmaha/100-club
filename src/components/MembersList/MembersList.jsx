import { MembersUl, Section } from "./Members-styled";
import { MembersItem } from "./MembersItem";

export const MembersList = ({ visibleMembersArray }) => {
  return (
    <>
      <Section>
        <MembersUl>
          {visibleMembersArray?.map((el, index) => (
            <MembersItem key={el.id} el={el} index={index} />
          ))}
        </MembersUl>
      </Section>
    </>
  );
};
