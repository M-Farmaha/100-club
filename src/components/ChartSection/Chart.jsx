import { useEffect, useState } from "react";
import { differenceInYears } from "date-fns";
import { useSpring, a } from "@react-spring/web";

import { getColorByType } from "../../helpers/getColorByType";
import { ChartElement, ChartWrap } from "./ChartSection-styled";

export const Chart = ({ membersArray, options, type }) => {
  const [isVisible, setIsVisible] = useState(false);

  const props = useSpring({
    from: { width: isVisible ? "0%" : "100%" },
    to: { width: isVisible ? "100%" : "0%" },
    config: { tension: 200, friction: 50 },
  });

  useEffect(() => {
    const handleScroll = () => {
      const id = document.getElementById(type);
      const rect = id.getBoundingClientRect();
      const visible = rect.top <= window.innerHeight && rect.bottom >= 0;

      setIsVisible(visible);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [type]);

  return (
    <>
      <a.div style={props}>
        <ChartWrap id={type}>
          {options.map((el) => {
            const amount = membersArray?.reduce((acc, member) => {

              if (type === "joinTennisYear") {
                const experience = new Date().getFullYear() - member.joinTennisYear;
                console.log(experience);
            
                if (el === "До 2 років" && experience < 2) {
                  return acc + 1;
                }
                if (el === "2-5 років" && experience >= 2 && experience < 5) {
                  return acc + 1;
                }
                if (el === "5-10 років" && experience >= 5 && experience < 10) {
                  return acc + 1;
                }
                if (el === "Більше 10 років" && experience >= 10) {
                  return acc + 1;
                }
              }

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
      </a.div>
    </>
  );
};
