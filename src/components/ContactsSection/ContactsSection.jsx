import {
  Address,
  BlockWrap,
  CourtIconSvg,
  IconSvg,
  Link,
  PhotoImg,
  PhotoWrap,
  Section,
  SectionWrap,
  Text,
  TitleH2,
} from "./ContactsSection-styled";

import sprite from "../../sprite.svg";

import BossImg from "./img/boss.jpg";
import TrainerImg from "./img/trainer.jpg";

export const ContactsSection = () => {
  return (
    <>
      <Section>
        <SectionWrap>
          <TitleH2>Наші контакти:</TitleH2>

          <BlockWrap>
            <CourtIconSvg>
              <use href={sprite + "#icon-court"}></use>
            </CourtIconSvg>
            <Address>
              <Text>Адреса нашого домашнього корту:</Text>

              <Link
                href="https://maps.app.goo.gl/6N5YkhV3wPf3eLjBA"
                rel="noopener noreferrer"
                target="_blank"
                aria-label="Відкрити карту"
              >
                <IconSvg>
                  <use href={sprite + "#icon-location"}></use>
                </IconSvg>
                м. Львів, вул. Сяйво, 18
              </Link>
            </Address>
          </BlockWrap>

          <BlockWrap>
            <PhotoWrap>
              <PhotoImg src={BossImg} alt="Марина Семенівна" />
            </PhotoWrap>
            <Address>
              <Text>Директор клубу:</Text>

              <Link href="tel:+380975057249" aria-label="Подзвонити">
                <IconSvg>
                  <use href={sprite + "#icon-phone"}></use>
                </IconSvg>
                Марина Семенівна
              </Link>
            </Address>
          </BlockWrap>

          <BlockWrap style={{ flexDirection: "row-reverse" }}>
            <PhotoWrap>
              <PhotoImg src={TrainerImg} alt="Марина Семенівна" />
            </PhotoWrap>
            <Address>
              <Text>Головний тренер клубу:</Text>

              <Link href="tel:+380960116128" aria-label="Подзвонити">
                <IconSvg>
                  <use href={sprite + "#icon-phone"}></use>
                </IconSvg>
                Ігор Осипович
              </Link>
            </Address>
          </BlockWrap>
        </SectionWrap>
      </Section>
    </>
  );
};