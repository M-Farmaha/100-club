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
  LogoIconWrap,
  TitleH1Text,
  HeartIconSvgWrap,
  TitleH2,
  TitleH2Text,
  FirstPoster,
  SecondPoster,
} from "./HeroSection-styled";

import PosterImg5 from "./img/poster5.jpg";
import PosterImg6 from "./img/poster6.jpg";

import sprite from "../../sprite.svg";

export const HeroSection = () => {
  return (
    <>
      <Section>
        <FirstPoster style={{ backgroundImage: `url(${PosterImg6})` }} />
        <SecondPoster style={{ backgroundImage: `url(${PosterImg5})` }} />
        <SectionWrap>
          <TitleH2>
            <HeartIconSvgWrap>
              <IconSvg>
                <use href={sprite + "#icon-ukr-heart"}></use>
              </IconSvg>
            </HeartIconSvgWrap>
            <TitleH2Text>Дякуємо ЗСУ</TitleH2Text>
          </TitleH2>

          <TitleH1>
            <TitleH1Text>Клуб</TitleH1Text>
            <LogoIconWrap>
              <IconSvg>
                <use href={sprite + "#logo-100"}></use>
              </IconSvg>
            </LogoIconWrap>
          </TitleH1>
          <SubTitle>
            Вітаємо на сторінці "Клубу-100" любительського тенісу у Львові.
          </SubTitle>
          <SubTitle>
            У нас займаються тенісом гравці будь-якого віку та рівня навичок, а
            також діти з 4-ох років. Можна взяти участь у турнірах: одиночних,
            парних, сімейних; покращити свій рівень гри на тренуваннях з
            досвідченими тренерами або просто весело провести час в колі друзів.
          </SubTitle>

          <HeroButtonsWrap>
            <ButtonWrap>
              <Button
                href="https://send.monobank.ua/jar/3MpUJRH8gs"
                rel="noopener noreferrer"
                aria-label="Посилання на банку у додатку 'Монобанк'"
              >
                <IconSvgWrap>
                  <IconSvg>
                    <use href={sprite + "#icon-mono"}></use>
                  </IconSvg>
                </IconSvgWrap>
                Підтримати проект
              </Button>
            </ButtonWrap>

            <ButtonLink to="/tournaments">
              <ButtonIconSvg>
                <use href={sprite + "#icon-cup"}></use>
              </ButtonIconSvg>
              Переглянути турніри
            </ButtonLink>

            <ButtonLink to="/members">
              <ButtonIconSvg>
                <use href={sprite + "#icon-users"}></use>
              </ButtonIconSvg>
              Переглянути гравців
            </ButtonLink>

            <ButtonLink to="/gallery">
              <ButtonIconSvg>
                <use href={sprite + "#icon-camera"}></use>
              </ButtonIconSvg>
              Перейти до галереї
            </ButtonLink>
          </HeroButtonsWrap>
        </SectionWrap>
      </Section>
    </>
  );
};
