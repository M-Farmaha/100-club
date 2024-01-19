import React from "react";
import {
  StatsIconSvg,
  Item,
  List,
  Section,
  SectionWrap,
  SubTitle,
  TitleH3,
} from "./StatsSection-styled";

import sprite from "../../sprite.svg";

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
              <TitleH3>45</TitleH3>
              <SubTitle>Турнірів за рік</SubTitle>
            </Item>

            <Item>
              <StatsIconSvg>
                <use href={sprite + "#icon-stats-2"}></use>
              </StatsIconSvg>
              <TitleH3>100</TitleH3>
              <SubTitle>Гравців у клубі</SubTitle>
            </Item>

            <Item>
              <StatsIconSvg>
                <use href={sprite + "#icon-stats-3"}></use>
              </StatsIconSvg>
              <TitleH3>8</TitleH3>
              <SubTitle>Років досвіду</SubTitle>
            </Item>

            <Item>
              <StatsIconSvg>
                <use href={sprite + "#icon-stats-4"}></use>
              </StatsIconSvg>
              <TitleH3>5</TitleH3>
              <SubTitle>Тренерів у клубі</SubTitle>
            </Item>
          </List>
        </SectionWrap>
      </Section>
    </>
  );
};
