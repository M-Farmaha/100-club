import {
  Item,
  ItemIndictator,
  ItemIndictatorBG,
  ItemText,
  ItemWrap,
} from "./StatsPage-styled";
import { useNavigate } from "react-router-dom";
import { getMedalColor } from "../../helpers/getMedalColor";

export const StatsItem = ({ el, index, isAllSeasons }) => {
  const navigate = useNavigate();

  const { member_id, winCount, topFiveRank, totalRank, name, globalPosition } = el;

  const stringId = member_id.join("-");

  const handleItemClick = () => {
    navigate(stringId);
  };

  // Show totalRank for all-seasons stats, topFiveRank for single-season
  const rankValue = isAllSeasons ? totalRank : topFiveRank;

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
