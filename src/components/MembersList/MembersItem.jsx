import { useNavigate } from "react-router-dom";

import {
  MembersItemIndictator,
  MembersItemIndictatorBG,
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

  const indicatorColor = () => {
    switch (el.type) {
      case "Аматор":
        return "var(--type-amateur-color)";
      case "Професіонал":
        return "var(--type-profi-color)";
      case "Напів професіонал":
        return "var(--type-semiprofi-color)";
      case "Тренер":
        return "var(--type-coach-color)";
      case "Дитяча група":
        return "var(--type-kid-color)";
      case "Тенісна мама":
        return "var(--type-tennismom-color)";
      case "Чемпіон":
        return "var(--type-champion-color)";
      default:
        return "var(--secondary-grey-color)";
    }
  };

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
        <MembersItemIndictator
          style={{ backgroundColor: indicatorColor() }}
        ></MembersItemIndictator>
        <MembersItemWrap isTodayBirthDay={isTodayBirthDay}>
          <MembersItemText>{index + 1}.</MembersItemText>
          <MembersItemText>{el.name}</MembersItemText>
          <MembersItemText>{el.type}</MembersItemText>
          <MembersItemIndictatorBG
            style={{
              background: `linear-gradient(to right, transparent,  ${indicatorColor()})`,
            }}
          ></MembersItemIndictatorBG>
        </MembersItemWrap>
      </MembersItemLi>
    </>
  );
};
