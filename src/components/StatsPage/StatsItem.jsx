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
  const handleItemClick = () => {
    navigate(member_id);
  };

  return (
    <>
      <Item id={member_id} onClick={handleItemClick}>
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
