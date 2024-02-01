import {
  MembersItemLi,
  MembersItemText,
  MembersItemWrap,
} from "./MemdersList-styled";

export const MembersItem = ({ el, index }) => {
  return (
    <>
      <MembersItemLi id={el.id}>
        <MembersItemWrap>
          <MembersItemText>{index + 1}.</MembersItemText>
          <MembersItemText>{el.lastName + " " + el.firstName}</MembersItemText>
          <MembersItemText>{el.type}</MembersItemText>
        </MembersItemWrap>
      </MembersItemLi>
    </>
  );
};
