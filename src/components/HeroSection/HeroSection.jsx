import {
  Button,
  ButtonIconSvg,
  ButtonLink,
  ButtonWrap,
  HeroButtonsWrap,
  IconSvg,
  IconSvgWrap,
  Section,
  SectionWrap,
  SubTitle,
  TitleH1,
  Video,
  VideoFilter,
  VideoPoster,
} from "./HeroSection-styled";

import sprite from "../../sprite.svg";
import BackgroundWebm from "./tennis.webm";
import BackgroundMp4 from "./tennis.mp4";

export const HeroSection = () => {
  return (
    <>
      <Section>
        <SectionWrap>
          <VideoFilter />
          <VideoPoster />
          <Video muted loop playsInline preload="auto" autoPlay>
            <source src={BackgroundWebm} type="video/webm" />
            <source src={BackgroundMp4} type="video/mp4" />
          </Video>

          <TitleH1>
            Клуб <span>100!</span>
          </TitleH1>
          <SubTitle>
            Ласкаво просимо на сайт клубу любительського тенісу у Львові.
          </SubTitle>
          <SubTitle>
            У нас займаються тенісом гравці будь-якого віку та рівня навичок, а
            також діти з 4-ох років. Можна взяти участь у турнірах: одиночних,
            парних, сімейних; покращити свій рівень гри на тренуваннях з
            досвідченими тренерами або просто весело провести час в колі друзів.
          </SubTitle>

          <HeroButtonsWrap>
            <ButtonLink to="/gallery">
              <ButtonIconSvg>
                <use href={sprite + "#icon-camera"}></use>
              </ButtonIconSvg>
              Перейти до галереї
            </ButtonLink>
            <ButtonLink to="/members">
              <ButtonIconSvg>
                <use href={sprite + "#icon-users"}></use>
              </ButtonIconSvg>
              Переглянути учасників
            </ButtonLink>
            <ButtonWrap>
              <Button
                href="https://send.monobank.ua/jar/3MpUJRH8gs"
                rel="noopener noreferrer"
                target="_blank"
                aria-label="Посилання на збір коштів у монобанку"
              >
                <ButtonIconSvg>
                  <use href={sprite + "#icon-credit-card"}></use>
                </ButtonIconSvg>
                Підтримати розвиток проекту
              </Button>
              <IconSvgWrap>
                <IconSvg>
                  <use href={sprite + "#icon-mono"}></use>
                </IconSvg>
              </IconSvgWrap>
            </ButtonWrap>
          </HeroButtonsWrap>
        </SectionWrap>
      </Section>
    </>
  );
};
