import {
  Item,
  ItemIndictator,
  ItemIndictatorBG,
  ItemText,
  ItemWrap,
} from "./ParticipantsList-styled";
import { useNavigate } from "react-router-dom";
import { defineRank } from "../../helpers/defineRank";
import { getMedalColor } from "../../helpers/getMedalColor";

export const ParticipantsItem = ({ el, index }) => {
  const navigate = useNavigate();

  const { member_id, position, name, win, defeat } = el;

  const stringId = member_id.join("-");

  const participantRank = defineRank(position);

  const handleItemClick = () => {
    navigate(stringId);
  };

  return (
    <>
      <Item id={stringId} onClick={handleItemClick}>
        {
          <ItemIndictator
            style={{ backgroundColor: getMedalColor(el.position) }}
          />
        }

        <ItemWrap>
          <ItemText>{index + 1}.</ItemText>

          <ItemText>{name || "Невідомий учасник"}</ItemText>

          <ItemText>{win}</ItemText>

          <ItemText>{defeat}</ItemText>

          <ItemText>{participantRank}</ItemText>

          {
            <ItemIndictatorBG
              style={{
                background: `linear-gradient(to right, transparent,  ${getMedalColor(
                  position
                )})`,
              }}
            />
          }
        </ItemWrap>
      </Item>
    </>
  );
};
