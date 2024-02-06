import { useNavigate } from "react-router-dom";
import {
  MembersItemLi,
  MembersItemText,
  MembersItemWrap,
} from "./Members-styled";

export const MembersItem = ({ el, index }) => {
  const navigate = useNavigate();

  const openModal = () => {
    navigate(`user/${el.id}`);
  };

  return (
    <>
      <MembersItemLi id={el.id} onClick={openModal}>
        <MembersItemWrap>
          <MembersItemText>{index + 1}.</MembersItemText>
          <MembersItemText>{el.name}</MembersItemText>
          <MembersItemText>{el.type}</MembersItemText>
        </MembersItemWrap>
      </MembersItemLi>
    </>
  );
};
