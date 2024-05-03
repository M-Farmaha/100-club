import { format } from "date-fns";
import ukLocale from "date-fns/locale/uk";
import { Item, ItemText, ItemWrap } from "./StagesList-styled";
import { membersApi } from "../../Api/ApiRequest";
import { useNavigate } from "react-router-dom";

export const StagesItem = ({ el, index }) => {
  const isHide =
    el.date === "2024-04-07" ||
    el.date === "2024-04-21" ||
    el.date === "2024-04-28";
  const navigate = useNavigate();

  const members = membersApi();

  const winner = el?.players?.find((player) => player.position === 1);
  const { name } = members?.find((member) => member.id === winner.member_id);

  const handleItemClick = () => {
    navigate(el.date, { state: { players: el.players } });
  };

  return (
    <>
      <Item id={el.date} onClick={handleItemClick}>
        <ItemWrap>
          <ItemText>{index + 1}.</ItemText>

          <ItemText>
            {format(new Date(el.date), " d MMMM yyyyр.", {
              locale: ukLocale,
            })}
          </ItemText>
          <ItemText>{isHide ? "Приховано" : name}</ItemText>
        </ItemWrap>
      </Item>
    </>
  );
};
