import {
  optionsByAge,
  optionsByBackhand,
  optionsByCity,
  optionsByExperience,
  optionsByForhand,
  optionsBySex,
  optionsByType,
} from "../../constants/constants";
import { TitleSection } from "../TitleSection/TitleSection";
import { Chart } from "./Chart";
import { Section, Subtitle } from "./ChartSection-styled";

export const ChartSection = ({ membersArray }) => {
  return (
    <>
      <Section>
        <TitleSection icon={"#icon-chart"} title={"Кого в клубі більше?"} />
        <Subtitle>За категорією:</Subtitle>
        <Chart membersArray={membersArray} options={optionsByType} />

        <Subtitle>За статтю:</Subtitle>
        <Chart membersArray={membersArray} options={optionsBySex} />

        <Subtitle>За форхендом:</Subtitle>
        <Chart membersArray={membersArray} options={optionsByForhand} />

        <Subtitle>За бекхендом:</Subtitle>
        <Chart membersArray={membersArray} options={optionsByBackhand} />

        <Subtitle>За рідним містом:</Subtitle>
        <Chart membersArray={membersArray} options={optionsByCity} />

        <Subtitle>За віком:</Subtitle>
        <Chart membersArray={membersArray} options={optionsByAge} />

        <Subtitle>За досвідом:</Subtitle>
        <Chart membersArray={membersArray} options={optionsByExperience} />
      </Section>
    </>
  );
};
