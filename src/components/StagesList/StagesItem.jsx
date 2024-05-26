import { Item, ItemText, ItemWrap } from "./StagesList-styled";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../state/stateContext";
import { isDateHidden } from "../../helpers/isDateHidden";
import { getUkrLocaleDate } from "../../helpers/getUkrLocaleDate";

export const StagesItem = ({ el, index }) => {
  const { globalState } = useStateContext();
  const { members } = globalState;

  const navigate = useNavigate();

  const isHide = isDateHidden(el.date);

  const winner = el?.players?.find((player) => player.position === 1);
  const { name } = members?.find((member) => member.id === winner.member_id);

  const handleItemClick = () => {
    navigate(el.date);
  };

  return (
    <>
      <Item id={el.date} onClick={handleItemClick}>
        <ItemWrap>
          <ItemText>{index + 1}.</ItemText>

          <ItemText>{getUkrLocaleDate(el.date)}</ItemText>
          <ItemText>{isHide ? "Приховано" : name}</ItemText>
        </ItemWrap>
      </Item>
    </>
  );
};
