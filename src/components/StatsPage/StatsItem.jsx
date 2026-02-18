import {
  Item,
  ItemIndictator,
  ItemIndictatorBG,
  ItemText,
  ItemWrap,
} from "./StatsPage-styled";
import { useNavigate } from "react-router-dom";
import { getMedalColor } from "../../helpers/getMedalColor";
import { useStateContext } from "../../state/stateContext";

export const StatsItem = ({ el, index }) => {
  const navigate = useNavigate();
  const { globalState } = useStateContext();
  const statsRating = globalState.filters?.statsRating || "total";

  const { member_id, winCount, topFiveRank, totalRank, name, globalPosition } = el;

  const stringId = member_id.join("-");

  const handleItemClick = () => {
    navigate(stringId);
  };

  const rankValue = statsRating === "topFive" ? topFiveRank : totalRank;

  return (
    <>
      <Item id={stringId} onClick={handleItemClick}>
        {
          <ItemIndictator
            style={{ backgroundColor: getMedalColor(globalPosition) }}
          />
        }

        <ItemWrap>
          <ItemText>{index + 1}.</ItemText>

          <ItemText>{name}</ItemText>

          <ItemText>{winCount}</ItemText>

          <ItemText>{rankValue}</ItemText>

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
