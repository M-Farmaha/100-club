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

  const participantRank = defineRank(el.position);

  const complexId = Array.isArray(el.member_id)
    ? `${el.member_id[0]}-${el.member_id[1]}`
    : el.member_id;

  const handleItemClick = () => {
    navigate(complexId);
  };

  return (
    <>
      <Item id={complexId} onClick={handleItemClick}>
        {
          <ItemIndictator
            style={{ backgroundColor: getMedalColor(el.position) }}
          />
        }

        <ItemWrap>
          <ItemText>{index + 1}.</ItemText>

          <ItemText>{el?.name || "Невідомий учасник"}</ItemText>

          <ItemText>{el.win}</ItemText>

          <ItemText>{el.defeat}</ItemText>

          <ItemText>{participantRank}</ItemText>

          {
            <ItemIndictatorBG
              style={{
                background: `linear-gradient(to right, transparent,  ${getMedalColor(
                  el.position
                )})`,
              }}
            />
          }
        </ItemWrap>
      </Item>
    </>
  );
};
