import { useNavigate } from "react-router-dom";
import {
  MembersItemLi,
  MembersItemText,
  MembersItemWrap,
} from "./Members-styled";

export const MembersItem = ({ el, index }) => {
  const navigate = useNavigate();

  const openModal = () => {
    const scrollPosition = window.scrollY;
    navigate(`user/${el.id}`, { state: { scrollPosition } });
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
