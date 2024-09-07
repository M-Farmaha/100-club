import {
  Item,
  ItemIndictator,
  ItemIndictatorBG,
  ItemText,
  ItemWrap,
} from "./ParticipantsList-styled";
import { useNavigate } from "react-router-dom";
import { defineRank } from "../../helpers/defineRank";
import { useStateContext } from "../../state/stateContext";
// import { isDateHidden } from "../../helpers/isDateHidden";
import { getMedalColor } from "../../helpers/getMedalColor";

export const ParticipantsItem = ({ el, index }) => {
  const { globalState } = useStateContext();
  const { members } = globalState;
  const navigate = useNavigate();

  // const { id } = useParams();
  const participant = members.find((member) => member.id === el.member_id);
  const participantRank = defineRank(el.position);

  const handleItemClick = () => {
    navigate(el.member_id);
  };

  // const isHide = isDateHidden(id);

  return (
    <>
      <Item id={el.member_id} onClick={handleItemClick}>
        {
          <ItemIndictator
            style={{ backgroundColor: getMedalColor(el.position) }}
          />
        }

        <ItemWrap>
          <ItemText>{index + 1}.</ItemText>

          <ItemText>{participant?.name || "Невідомий учасник"}</ItemText>

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
