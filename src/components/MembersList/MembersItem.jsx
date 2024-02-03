import {
  MembersItemLi,
  MembersItemText,
  MembersItemWrap,
} from "./MembersList-styled";

export const MembersItem = ({ el, index }) => {
  return (
    <>
      <MembersItemLi id={el.id}>
        <MembersItemWrap>
          <MembersItemText>{index + 1}.</MembersItemText>
          <MembersItemText>{el.name}</MembersItemText>
          <MembersItemText>{el.type}</MembersItemText>
        </MembersItemWrap>
      </MembersItemLi>
    </>
  );
};
