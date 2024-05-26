import { useNavigate } from "react-router-dom";

import {
  MembersItemIndictator,
  MembersItemIndictatorBG,
  MembersItemLi,
  MembersItemText,
  MembersItemWrap,
} from "./Members-styled";
import { getColorByType } from "../../helpers/getColorByType";

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
        <MembersItemIndictator
          style={{ backgroundColor: getColorByType(el.type) }}
        />

        <MembersItemWrap isTodayBirthDay={isTodayBirthDay}>
          <MembersItemText>{index + 1}.</MembersItemText>
          <MembersItemText>{el.name}</MembersItemText>
          <MembersItemText>{el.type}</MembersItemText>
          <MembersItemIndictatorBG
            style={{
              background: `linear-gradient(to right, transparent,  ${getColorByType(
                el.type
              )})`,
            }}
          />
        </MembersItemWrap>
      </MembersItemLi>
    </>
  );
};
