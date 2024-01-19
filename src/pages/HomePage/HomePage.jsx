import React from "react";
import {
  ButtonLink,
  HeroSection,
  NextSection,
  Section,
  SubTitle,
  Title,
  Video,
} from "./HomePage-styled";

import BackgroundWebm from "./tennis.webm";
import BackgroundMp4 from "./tennis.mp4";

export const HomePage = () => {
  return (
    <>
      <HeroSection>
        <Section>
          <Video autoPlay muted loop preload="auto">
            <source src={BackgroundWebm} type="video/webm" />
            <source src={BackgroundMp4} type="video/mp4" />
          </Video>

          <Title>
            Клуб <span>100!</span>
          </Title>
          <SubTitle>
            Ласкаво просимо на офійний сайт клубу любительського тенісу у
            Львові.
          </SubTitle>
          <SubTitle>
            У нас грають теніс для будь-яких вікових категорій та рівня навичок
            а також для дітей. Можна прийняти участь у турнірах: одиночні,
            парні, сімейні, підняти свій рівень гри на тренуваннях з
            досвідченими тренерами, або просто весело провести час в колі
            друзів.
          </SubTitle>

          <ButtonLink to="/gallery">Перейти до галереї</ButtonLink>
          <ButtonLink to="/members">Переглянути учасників</ButtonLink>
        </Section>
      </HeroSection>

      <NextSection>
        <Section>
          <Title>
            Клуб <span>100!</span>
          </Title>
          <SubTitle>
            Ласкаво просимо на офійний сайт клубу любительського тенісу у
            Львові.
          </SubTitle>
          <SubTitle>
            У нас грають теніс для будь-яких вікових категорій та рівня навичок
            а також для дітей. Можна прийняти участь у турнірах: одиночні,
            парні, сімейні, підняти свій рівень гри на тренуваннях з
            досвідченими тренерами, або просто весело провести час в колі
            друзів.
          </SubTitle>

          <ButtonLink to="/gallery">Перейти до галереї</ButtonLink>
          <ButtonLink to="/members">Переглянути учасників</ButtonLink>
        </Section>
      </NextSection>
    </>
  );
};
