import { differenceInYears } from "date-fns";
import { getColorByType } from "../../helpers/getColorByType";
import { ChartElement, ChartWrap } from "./ChartSection-styled";

export const Chart = ({ membersArray, options, type }) => {
  return (
    <>
      <ChartWrap>
        {options.map((el) => {
          const amount = membersArray?.reduce((acc, member) => {
            if (type === "birthDate") {
              const age = differenceInYears(
                new Date(),
                new Date(member.birthDate)
              );
              if (el === "Менше 20 років" && age < 20) {
                return acc + 1;
              }
              if (el === "20-40 років" && age >= 20 && age < 40) {
                return acc + 1;
              }
              if (el === "40-60 років" && age >= 40 && age < 60) {
                return acc + 1;
              }
              if (el === "Більше 60 років" && age >= 60) {
                return acc + 1;
              }
            }

            if (type === "hometown" && el === "Інші") {
              return member[type] !== "Львів" ? acc + 1 : acc;
            }

            return member[type] === el ? acc + 1 : acc;
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
