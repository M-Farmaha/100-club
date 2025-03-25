import { useNavigate } from "react-router-dom";

import {
  MembersItemIndictator,
  MembersItemIndictatorBG,
  MembersItemLi,
  MembersItemText,
  MembersItemWrap,
} from "./Members-styled";

import { filterOptionsByType } from "../../constants/constants";

export const MembersItem = ({ el, index }) => {
  const navigate = useNavigate();

  const birth = new Date(el.birthDate);
  const today = new Date();
  const isTodayBirthDay = birth.getDate() === today.getDate() && birth.getMonth() === today.getMonth();

  const openModal = () => {
    const scrollPosition = window.scrollY;
    navigate(`user/${el.id}`, { state: { scrollPosition } });
  };

  return (
    <>
      <MembersItemLi isTodayBirthDay={isTodayBirthDay} id={el.id} onClick={openModal}>
        <MembersItemIndictator style={{ backgroundColor: filterOptionsByType[el.type].color }} />

        <MembersItemWrap isTodayBirthDay={isTodayBirthDay}>
          <MembersItemText>{index + 1}.</MembersItemText>
          <MembersItemText>{el.name}</MembersItemText>
          <MembersItemText>{filterOptionsByType[el.type].title}</MembersItemText>
          <MembersItemIndictatorBG
            style={{
              background: `linear-gradient(to right, transparent,  ${filterOptionsByType[el.type].color})`,
            }}
          />
        </MembersItemWrap>
      </MembersItemLi>
    </>
  );
};
