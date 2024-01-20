import React from "react";
import {
  ButtonLink,
  Section,
  SectionWrap,
  SubTitle,
  TitleH1,
  Video,
  VideoWrap,
} from "./HeroSection-styled";

import BackgroundWebm from "./tennis.webm";
import BackgroundMp4 from "./tennis.mp4";
import { Logo } from "../Logo/Logo";

export const HeroSection = () => {
  return (
    <>
      <Section>
        <SectionWrap>
          <VideoWrap>
            <Video autoPlay muted loop playsInline preload="auto">
              <source src={BackgroundWebm} type="video/webm" />
              <source src={BackgroundMp4} type="video/mp4" />
            </Video>
          </VideoWrap>

          <TitleH1>
            Клуб <span>100!</span>
          </TitleH1>
          <SubTitle>
            Ласкаво просимо на офійний сайт клубу любительського тенісу у
            Львові.
          </SubTitle>
          <SubTitle>
            У нас займаються тенісом гравці будь-якого віку та рівня навичок, а
            також діти з 4-ох років. Можна взяти участь у турнірах: одиночних,
            парних, сімейних; покращити свій рівень гри на тренуваннях з
            досвідченими тренерами або просто весело провести час в колі друзів.
          </SubTitle>

          <Logo/>

          <ButtonLink to="/gallery">Перейти до галереї</ButtonLink>
          <ButtonLink to="/members">Переглянути учасників</ButtonLink>
        </SectionWrap>
      </Section>
    </>
  );
};
