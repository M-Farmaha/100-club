import {
  Button,
  ButtonIconSvg,
  ButtonLink,
  ButtonWrap,
  Filter,
  Poster,
  HeroButtonsWrap,
  IconSvg,
  IconSvgWrap,
  Section,
  SectionWrap,
  SubTitle,
  TitleH1,
} from "./HeroSection-styled";

import sprite from "../../sprite.svg";

export const HeroSection = () => {
  return (
    <>
      <Section>
        <SectionWrap>
          <Filter />
          <Poster />

          <TitleH1>
            Клуб <span>100!</span>
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
