import { TitleSection } from "../TitleSection/TitleSection";
import { Chart } from "./Chart";
import { Section, Subtitle } from "./ChartSection-styled";

export const ChartSection = ({ membersArray }) => {
  const optionsByType = [
    "Аматор",
    "Чемпіон",
    "Напів професіонал",
    "Професіонал",
    "Тренер",
    "Тенісна мама",
    "Дитяча група",
  ];
  const optionsBySex = ["male", "female"];
  const optionsByForhand = ["Зліва", "Справа"];
  const optionsByBackhand = [
    "Одноручний",
    "Одноручний та Дворучний",
    "Дворучний",
  ];

  const optionsByHomeTown = ["Львів", "Інші"];

  const optionsByAge = [
    "Менше 20 років",
    "20-40 років",
    "40-60 років",
    "Більше 60 років",
  ];

  const optionsByExperience = [
    "До 2 років",
    "2-5 років",
    "5-10 років",
    "Більше 10 років",
  ];

  return (
    <>
      <Section>
        <TitleSection icon={"#icon-chart"} title={"Загальна статистика:"} />
        <Subtitle>За категорією:</Subtitle>
        <Chart
          membersArray={membersArray}
          options={optionsByType}
          type={"type"}
        />

        <Subtitle>За статтю:</Subtitle>
        <Chart
          membersArray={membersArray}
          options={optionsBySex}
          type={"sex"}
        />

        <Subtitle>За форхендом:</Subtitle>
        <Chart
          membersArray={membersArray}
          options={optionsByForhand}
          type={"forhand"}
        />

        <Subtitle>За бекхендом:</Subtitle>
        <Chart
          membersArray={membersArray}
          options={optionsByBackhand}
          type={"backhand"}
        />

        <Subtitle>За рідним містом:</Subtitle>
        <Chart
          membersArray={membersArray}
          options={optionsByHomeTown}
          type={"hometown"}
        />

        <Subtitle>За віком:</Subtitle>
        <Chart
          membersArray={membersArray}
          options={optionsByAge}
          type={"birthDate"}
        />

        <Subtitle>За досвідом:</Subtitle>
        <Chart
          membersArray={membersArray}
          options={optionsByExperience}
          type={"joinTennisYear"}
        />
      </Section>
    </>
  );
};
