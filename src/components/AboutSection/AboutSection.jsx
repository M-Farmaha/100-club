import React from "react";
import sprite from "../../sprite.svg";
import {
  AboutIconSvg,
  Item,
  List,
  Section,
  SectionWrap,
  SubTitle,
  TitleH2,
  TitleH3,
} from "./AboutSection-styled";

export const AboutSection = () => {
  return (
    <>
      <Section>
        <SectionWrap>
          <TitleH2>Наш клуб пропонує:</TitleH2>
          <List>
            <Item>
              <AboutIconSvg>
                <use href={sprite + "#icon-serve"}></use>
              </AboutIconSvg>
              <TitleH3>Персональні та групові тренування</TitleH3>
              <SubTitle style={{ color: "var(--primary-black-color)" }}>
                Персональні тренування для будь-якого рівня навичкок з
                досвідченим тренером або групові тренування в залежності від
                вашого рівня
              </SubTitle>
            </Item>

            <Item>
              <AboutIconSvg>
                <use href={sprite + "#icon-racket"}></use>
              </AboutIconSvg>
              <TitleH3>Найкраще обладнання</TitleH3>
              <SubTitle style={{ color: "var(--primary-black-color)" }}>
                Наш клуб завжди дбає про якість м'ячів якими ми граємо,
                періодично оновлюємо корт та сітки, а також маємо послугу
                перетяжки струн досвідченими майстрами
              </SubTitle>
            </Item>

            <Item>
              <AboutIconSvg>
                <use href={sprite + "#icon-award"}></use>
              </AboutIconSvg>
              <TitleH3>Турніри та нагороди</TitleH3>
              <SubTitle style={{ color: "var(--primary-black-color)" }}>
                Піднімай свій рівень гри на різноманітних любительських та
                професійних турнірах. Отримуй кубки та медалі а також рейтинг
                щоб піднятись на вершину слави клубу 100.
              </SubTitle>
            </Item>

            <Item>
              <AboutIconSvg>
                <use href={sprite + "#icon-girl"}></use>
              </AboutIconSvg>
              <TitleH3>Широка спільнота</TitleH3>
              <SubTitle style={{ color: "var(--primary-black-color)" }}>
                Наш клуб приймає як початківців так і професіоналів будь-якого
                віку. Тут ти зможеш найти суперників, домовлятись про
                персональні та групові спаринги та просто провести час весело та
                з користю.
              </SubTitle>
            </Item>
          </List>
        </SectionWrap>
      </Section>
    </>
  );
};
