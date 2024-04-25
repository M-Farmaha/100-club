import { format } from "date-fns";
import ukLocale from "date-fns/locale/uk";
import { Item, ItemText, ItemWrap } from "./StagesList-styled";
import { membersApi } from "../../Api/ApiRequest";
import { useNavigate } from "react-router-dom";

export const StagesItem = ({ el, index }) => {
  const navigate = useNavigate();

  const members = membersApi();
  const { member_id } = el?.players?.reduce((acc, curr) => {
    if (
      curr.win > acc.win ||
      (curr.win === acc.win && curr.defeat < acc.defeat)
    ) {
      return curr;
    } else {
      return acc;
    }
  });

  const winner = members.find((member) => member.id === member_id);
  const winnerName = winner ? winner?.name : "Не знайдено";

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
          <ItemText>
            {el.date === "2024-04-07" || el.date === "2024-04-21"
              ? "Приховано"
              : winnerName}
          </ItemText>
        </ItemWrap>
      </Item>
    </>
  );
};
