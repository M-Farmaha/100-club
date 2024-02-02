import { MembersUl, Section } from "./MemdersList-styled";
import { MembersItem } from "./MembersItem";

export const MembersList = ({ membersArray }) => {
  return (
    <>
      <Section>
        <MembersUl>
          {membersArray?.map((el, index) => (
            <MembersItem key={el.id} el={el} index={index} />
          ))}
        </MembersUl>
      </Section>
    </>
  );
};
