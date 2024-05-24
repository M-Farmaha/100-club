import { Item, ItemText, ItemWrap } from "./ParticipantsList-styled";
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

  const isHide = isDateHidden(id);

  return (
    <>
      <Item id={el.member_id}>
        <ItemWrap>
          <ItemText>{index + 1}.</ItemText>

          <ItemText>{participant?.name || "Невідомий учасник"}</ItemText>

          <ItemText>{isHide ? "?" : el.win}</ItemText>

          <ItemText>{isHide ? "?" : el.defeat}</ItemText>

          <ItemText>{isHide ? "?" : participantRank}</ItemText>
        </ItemWrap>
      </Item>
    </>
  );
};
