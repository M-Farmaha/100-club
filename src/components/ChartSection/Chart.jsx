import { useEffect, useRef, useState } from "react";
import { differenceInYears } from "date-fns";
import { useSpring, a } from "@react-spring/web";

import { ChartElement, ChartWrap } from "./ChartSection-styled";
import {
  optionsByAge,
  optionsByBackhand,
  optionsByCity,
  optionsByExperience,
  optionsByForhand,
  optionsBySex,
  optionsByType,
} from "../../constants/constants";

export const Chart = ({ membersArray, options }) => {
  const [isVisible, setIsVisible] = useState(false);

  const chartRef = useRef(null);

  const props = useSpring({
    from: { width: isVisible ? "0%" : "100%" },
    to: { width: isVisible ? "100%" : "0%" },
    config: { tension: 200, friction: 50 },
  });

  useEffect(() => {
    const handleScroll = () => {
      const rect = chartRef?.current.getBoundingClientRect();
      const visible = rect.top <= window.innerHeight && rect.bottom >= 0;

      setIsVisible(visible);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <a.div style={props}>
        <ChartWrap ref={chartRef}>
          {Object.entries(options).map(([key, el]) => {
            const amount = membersArray?.reduce((acc, member) => {
              if (options === optionsByExperience) {
                const experience = new Date().getFullYear() - member.joinTennisYear;

                if (!member.joinTennisYear) {
                  if (key === optionsByExperience.null.id) return acc + 1;
                } else {
                  if (key === optionsByExperience.to2.id && experience < 2) return acc + 1;
                  if (key === optionsByExperience.to5.id && experience >= 2 && experience < 5) return acc + 1;
                  if (key === optionsByExperience.to10.id && experience >= 5 && experience < 10) return acc + 1;
                  if (key === optionsByExperience.over10.id && experience >= 10) return acc + 1;
                }
              }

              if (options === optionsByAge) {
                const age = differenceInYears(new Date(), new Date(member.birthDate));

                if (!member.birthDate) {
                  if (key === optionsByAge.null.id) return acc + 1;
                } else {
                  if (key === optionsByAge.to20.id && age < 20) return acc + 1;
                  if (key === optionsByAge.to40.id && age >= 20 && age < 40) return acc + 1;
                  if (key === optionsByAge.to60.id && age >= 40 && age < 60) return acc + 1;
                  if (key === optionsByAge.over60.id && age >= 60) return acc + 1;
                }
              }

              if (options === optionsByCity) {
                if (!member.hometown) {
                  if (key === optionsByCity.null.id) return acc + 1;
                } else {
                  if (key === optionsByCity.lviv.id && member.hometown === optionsByCity.lviv.title) return acc + 1;
                  if (key === optionsByCity.others.id && member.hometown !== optionsByCity.lviv.title) return acc + 1;
                }
              }

              if (options === optionsBySex) {
                if (key === member.sex) {
                  return acc + 1;
                }
              }

              if (options === optionsByForhand) {
                if (key === optionsByForhand.null.id && !member.forhand) {
                  return acc + 1;
                }
                if (key === member.forhand) {
                  return acc + 1;
                }
              }

              if (options === optionsByBackhand) {
                if (key === optionsByBackhand.null.id && !member.backhand) {
                  return acc + 1;
                }
                if (key === member.backhand) {
                  return acc + 1;
                }
              }

              if (options === optionsByType) {
                if (key === member.type) {
                  return acc + 1;
                }
              }

              return acc;
            }, 0);

            const coefficient = amount / membersArray?.length;

            return (
              <ChartElement
                key={key}
                el={`${el.title}: ${amount}`}
                style={{
                  width: `${coefficient * 100}%`,
                  backgroundColor: options[key].color,
                }}
              ></ChartElement>
            );
          })}
        </ChartWrap>
      </a.div>
    </>
  );
};
