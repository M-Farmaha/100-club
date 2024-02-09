import { useNavigate } from "react-router-dom";

import {
  MembersItemLi,
  MembersItemText,
  MembersItemWrap,
} from "./Members-styled";

export const MembersItem = ({ el, index }) => {
  const navigate = useNavigate();

  const birth = new Date(el.birthDate);
  const today = new Date();
  const isTodayBirthDay =
    birth.getDate() === today.getDate() &&
    birth.getMonth() === today.getMonth();

  const openModal = () => {
    const scrollPosition = window.scrollY;
    navigate(`user/${el.id}`, { state: { scrollPosition } });
  };

  return (
    <>
      <MembersItemLi
        isTodayBirthDay={isTodayBirthDay}
        id={el.id}
        onClick={openModal}
      >
        <MembersItemWrap isTodayBirthDay={isTodayBirthDay}>
          <MembersItemText>{index + 1}.</MembersItemText>
          <MembersItemText>{el.name}</MembersItemText>
          <MembersItemText>{el.type}</MembersItemText>
        </MembersItemWrap>
      </MembersItemLi>
    </>
  );
};
