import { getColorByType } from "../../helpers/getColorByType";
import { ChartElement, ChartWrap } from "./ChartSection-styled";

export const Chart = ({ membersArray, options, type }) => {
  return (
    <>
      <ChartWrap>
        {options.map((el) => {
          const amount = membersArray?.reduce((acc, member) => {
            if (type === "hometown" && el === "Інші") {
              return member[type] !== "Львів" ? acc + 1 : acc;
            } else {
              return member[type] === el ? acc + 1 : acc;
            }
          }, 0);

          const coefficient = amount / membersArray?.length;

          let content = el;
          if (el === "male") content = "Чоловіки";
          if (el === "female") content = "Жінки";
          if (el === "Одноручний та Дворучний") content = "Обидвоє";

          return (
            <ChartElement
              key={el}
              el={`${content}: ${amount}`}
              style={{
                width: `${coefficient * 100}%`,
                backgroundColor: getColorByType(el),
              }}
            ></ChartElement>
          );
        })}
      </ChartWrap>
    </>
  );
};
