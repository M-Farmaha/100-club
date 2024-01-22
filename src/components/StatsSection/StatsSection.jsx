import {
  StatsIconSvg,
  Item,
  List,
  Section,
  SectionWrap,
  SubTitle,
} from "./StatsSection-styled";

import sprite from "../../sprite.svg";
import { AnimatedStat } from "./AnimatedStat";

export const StatsSection = () => {
  return (
    <>
      <Section>
        <SectionWrap>
          <List>
            <Item>
              <StatsIconSvg>
                <use href={sprite + "#icon-stats-1"}></use>
              </StatsIconSvg>
              <AnimatedStat number={45} id={"stats-1"} />
              <SubTitle>Турнірів за рік</SubTitle>
            </Item>

            <Item>
              <StatsIconSvg>
                <use href={sprite + "#icon-stats-2"}></use>
              </StatsIconSvg>
              <AnimatedStat number={100} id={"stats-2"} />
              <SubTitle>Гравців у клубі</SubTitle>
            </Item>

            <Item>
              <StatsIconSvg>
                <use href={sprite + "#icon-stats-3"}></use>
              </StatsIconSvg>
              <AnimatedStat number={8} id={"stats-3"} />
              <SubTitle>Років досвіду</SubTitle>
            </Item>

            <Item>
              <StatsIconSvg>
                <use href={sprite + "#icon-stats-4"}></use>
              </StatsIconSvg>
              <AnimatedStat number={5} id={"stats-4"} />
              <SubTitle>Тренерів у клубі</SubTitle>
            </Item>
          </List>
        </SectionWrap>
      </Section>
    </>
  );
};
