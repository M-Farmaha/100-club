import { Item, ItemText, ItemWrap } from "./StagesList-styled";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../state/stateContext";
import { getUkrLocaleDate } from "../../helpers/getUkrLocaleDate";
import { getPlayerNameById } from "../../helpers/getPlayerNameById";

export const StagesItem = ({ el, index }) => {
  const { globalState } = useStateContext();
  const { members } = globalState;

  const navigate = useNavigate();

  const { players, date } = el;

  const winner = players.find((player) => player.position === 1);
  const name = getPlayerNameById(winner.member_id, members);

  const handleItemClick = () => {
    navigate(date);
  };

  return (
    <>
      <Item id={date} onClick={handleItemClick}>
        <ItemWrap>
          <ItemText>{index + 1}.</ItemText>

          <ItemText>{getUkrLocaleDate(date)}</ItemText>
          <ItemText>{name}</ItemText>
        </ItemWrap>
      </Item>
    </>
  );
};
