import {
  MembersItemLi,
  MembersItemText,
  MembersItemWrap,
} from "./MembersList-styled";

export const MembersItem = ({ el, index }) => {
  const onItemClick = (e) => {
    console.log(e.currentTarget);
  };

  return (
    <>
      <MembersItemLi id={el.id} onClick={onItemClick}>
        <MembersItemWrap>
          <MembersItemText>{index + 1}.</MembersItemText>
          <MembersItemText>{el.name}</MembersItemText>
          <MembersItemText>{el.type}</MembersItemText>
        </MembersItemWrap>
      </MembersItemLi>
    </>
  );
};
