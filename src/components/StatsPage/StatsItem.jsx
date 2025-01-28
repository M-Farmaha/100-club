import {
  Item,
  ItemIndictator,
  ItemIndictatorBG,
  ItemText,
  ItemWrap,
} from "./StatsPage-styled";
import { useNavigate } from "react-router-dom";
import { getMedalColor } from "../../helpers/getMedalColor";

export const StatsItem = ({ el, index }) => {
  const navigate = useNavigate();

  const { member_id, winCount, topFiveRank, name, globalPosition } = el;

  const complexId = Array.isArray(member_id)
    ? `${member_id[0]}-${member_id[1]}`
    : member_id;

  const handleItemClick = () => {
    navigate(complexId);
  };

  return (
    <>
      <Item id={complexId} onClick={handleItemClick}>
        {
          <ItemIndictator
            style={{ backgroundColor: getMedalColor(globalPosition) }}
          />
        }

        <ItemWrap>
          <ItemText>{index + 1}.</ItemText>

          <ItemText>{name}</ItemText>

          <ItemText>{winCount}</ItemText>

          <ItemText>{topFiveRank}</ItemText>

          {
            <ItemIndictatorBG
              style={{
                background: `linear-gradient(to right, transparent,  ${getMedalColor(
                  globalPosition
                )})`,
              }}
            />
          }
        </ItemWrap>
      </Item>
    </>
  );
};
