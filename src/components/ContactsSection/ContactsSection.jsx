import {
  Address,
  BlockWrap,
  CourtIconSvg,
  IconSvg,
  InfoWrap,
  Link,
  PhotoImg,
  PhotoWrap,
  Section,
  SectionWrap,
  SocialIconSvg,
  SocialWrap,
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

            <SocialWrap>
              <Link
                href="https://www.facebook.com/club100tennisLviv"
                rel="noopener noreferrer"
                aria-label="facebook"
              >
                <SocialIconSvg>
                  <use href={sprite + "#icon-facebook"}></use>
                </SocialIconSvg>
              </Link>

              <Link
                href="https://www.instagram.com/tennislvivclub100/"
                rel="noopener noreferrer"
                aria-label="instagram"
              >
                <SocialIconSvg>
                  <use href={sprite + "#icon-instagram"}></use>
                </SocialIconSvg>
              </Link>

              <Link
                href="https://www.youtube.com/@atl-amateurtennislviv7215"
                rel="noopener noreferrer"
                aria-label="youtube"
              >
                <SocialIconSvg>
                  <use href={sprite + "#icon-youtube"}></use>
                </SocialIconSvg>
              </Link>
            </SocialWrap>
          </BlockWrap>

          <BlockWrap>
            <PhotoWrap>
              <PhotoImg src={BossImg} alt="Марина Семенівна" />
            </PhotoWrap>
            <InfoWrap>
              <Address>
                <Text>Директор клубу:</Text>

                <Link href="tel:+380975057249" aria-label="Подзвонити">
                  <IconSvg>
                    <use href={sprite + "#icon-phone"}></use>
                  </IconSvg>
                  Марина Семенівна
                </Link>
              </Address>
              <SocialWrap>
                <Link
                  href="https://www.facebook.com/profile.php?id=100066487460791"
                  rel="noopener noreferrer"
                  aria-label="facebook"
                >
                  <SocialIconSvg>
                    <use href={sprite + "#icon-facebook"}></use>
                  </SocialIconSvg>
                </Link>
              </SocialWrap>
            </InfoWrap>
          </BlockWrap>

          <BlockWrap style={{ flexDirection: "row-reverse" }}>
            <PhotoWrap>
              <PhotoImg src={TrainerImg} alt="Марина Семенівна" />
            </PhotoWrap>

            <InfoWrap>
              <Address>
                <Text>Головний тренер клубу:</Text>

                <Link href="tel:+380960116128" aria-label="Подзвонити">
                  <IconSvg>
                    <use href={sprite + "#icon-phone"}></use>
                  </IconSvg>
                  Ігор Осипович
                </Link>
              </Address>
              <SocialWrap>
                <Link
                  href="https://www.facebook.com/profile.php?id=100008346792063"
                  rel="noopener noreferrer"
                  aria-label="facebook"
                >
                  <SocialIconSvg>
                    <use href={sprite + "#icon-facebook"}></use>
                  </SocialIconSvg>
                </Link>
              </SocialWrap>
            </InfoWrap>
          </BlockWrap>
        </SectionWrap>
      </Section>
    </>
  );
};
