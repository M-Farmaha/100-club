import {
  Item,
  ItemIndictator,
  ItemIndictatorBG,
  ItemText,
  ItemWrap,
} from "./ParticipantsList-styled";
import { useParams } from "react-router-dom";
import { defineRank } from "../../helpers/defineRank";
import { useStateContext } from "../../state/stateContext";
import { isDateHidden } from "../../helpers/isDateHidden";

export const ParticipantsItem = ({ el, index }) => {
  const { globalState } = useStateContext();
  const { members } = globalState;

  const { id } = useParams();
  const participant = members.find((member) => member.id === el.member_id);

  const participantRank = defineRank(el.position);

  const getItemColorByPosition = (position) => {
    switch (position) {
      case 1:
        return "var(--player-gold-color)";
      case 2:
        return "var(--player-silver-color)";
      case 3:
        return "var(--player-bronze-color)";

      default:
        return;
    }
  };

  const isHide = isDateHidden(id);

  return (
    <>
      <Item id={el.member_id}>
        {!isHide && (
          <ItemIndictator
            style={{ backgroundColor: getItemColorByPosition(el.position) }}
          />
        )}

        <ItemWrap>
          <ItemText>{index + 1}.</ItemText>

          <ItemText>{participant?.name || "Невідомий учасник"}</ItemText>

          <ItemText>{isHide ? "?" : el.win}</ItemText>

          <ItemText>{isHide ? "?" : el.defeat}</ItemText>

          <ItemText>{isHide ? "?" : participantRank}</ItemText>

          {!isHide && (
            <ItemIndictatorBG
              style={{
                background: `linear-gradient(to right, transparent,  ${getItemColorByPosition(
                  el.position
                )})`,
              }}
            />
          )}
        </ItemWrap>
      </Item>
    </>
  );
};
