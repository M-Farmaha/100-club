import { format } from "date-fns";
import ukLocale from "date-fns/locale/uk";
import { Item, StagesItemText, StagesItemWrap } from "./StagesList-styled";
import { membersApi } from "../../Api/ApiRequest";

export const StagesItem = ({ el, index }) => {
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
  const winnerName = winner ? winner.name : "Не знайдено";

  return (
    <>
      <Item id={el.id}>
        <StagesItemWrap>
          <StagesItemText>{index + 1}.</StagesItemText>

          <StagesItemText>
            {format(new Date(el.date), " d MMMM yyyyр.", {
              locale: ukLocale,
            })}
          </StagesItemText>
          <StagesItemText>
            {el.date === "2024-04-07" || el.date === "2024-04-21"
              ? "Приховано"
              : winnerName}
          </StagesItemText>
        </StagesItemWrap>
      </Item>
    </>
  );
};
