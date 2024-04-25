import { Item, ItemText, ItemWrap } from "./ParticipantsList-styled";
import { membersApi } from "../../Api/ApiRequest";
import { useParams } from "react-router-dom";

export const ParticipantsItem = ({ el, index }) => {
  const { id } = useParams();
  const members = membersApi();
  const participant = members.find((member) => member.id === el.member_id);

  const isHide = id === "2024-04-07" || id === "2024-04-21";

  return (
    <>
      <Item id={el.member_id}>
        <ItemWrap>
          <ItemText>{index + 1}.</ItemText>

          <ItemText>{participant?.name || "Невідомий учасник"}</ItemText>

          <ItemText>{isHide ? "?" : el.win}</ItemText>

          <ItemText>{isHide ? "?" : el.defeat}</ItemText>

          <ItemText>{isHide ? "?" : "rank"}</ItemText>
        </ItemWrap>
      </Item>
    </>
  );
};
