import {
  Address,
  BlockWrap,
  CourtIconSvg,
  IconSvg,
  InfoWrap,
  LinkA,
  LinkStyled,
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
import DeputyImg from "./img/deputy.jpg";
import TrainerImg from "./img/trainer.jpg";
import AssistantImg from "./img/assistant.jpg";

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
            <Address style={{ alignItems: "center" }}>
              <Text>Адреса нашого домашнього корту:</Text>

              <LinkA
                href="https://maps.app.goo.gl/6N5YkhV3wPf3eLjBA"
                rel="noopener noreferrer"
                aria-label="Відкрити google maps"
              >
                <IconSvg>
                  <use href={sprite + "#icon-location"}></use>
                </IconSvg>
                м. Львів, вул. Сяйво, 18
              </LinkA>
            </Address>

            <SocialWrap>
              <LinkA
                href="https://www.facebook.com/club100tennisLviv"
                rel="noopener noreferrer"
                aria-label="facebook"
              >
                <SocialIconSvg>
                  <use href={sprite + "#icon-facebook"}></use>
                </SocialIconSvg>
              </LinkA>

              <LinkA
                href="https://www.instagram.com/tennislvivclub100/"
                rel="noopener noreferrer"
                aria-label="instagram"
              >
                <SocialIconSvg>
                  <use href={sprite + "#icon-instagram"}></use>
                </SocialIconSvg>
              </LinkA>

              <LinkA
                href="https://www.youtube.com/@atl-amateurtennislviv7215"
                rel="noopener noreferrer"
                aria-label="youtube"
              >
                <SocialIconSvg>
                  <use href={sprite + "#icon-youtube"}></use>
                </SocialIconSvg>
              </LinkA>
            </SocialWrap>
          </BlockWrap>

          <BlockWrap>
            <PhotoWrap>
              <PhotoImg src={BossImg} alt="Марина Семенівна" />
            </PhotoWrap>
            <InfoWrap>
              <Address>
                <Text>Директор клубу:</Text>

                <LinkA href="tel:+380975057249" aria-label="Подзвонити">
                  <IconSvg>
                    <use href={sprite + "#icon-phone"}></use>
                  </IconSvg>
                  Марина Семенівна
                </LinkA>

                <LinkStyled
                  to="/members/user/61"
                  aria-label="Переглянути профіль учасника"
                >
                  <IconSvg>
                    <use href={sprite + "#icon-users"}></use>
                  </IconSvg>
                  Переглянути профіль
                </LinkStyled>
              </Address>
              <SocialWrap>
                <LinkA
                  href="https://www.facebook.com/profile.php?id=100066487460791"
                  rel="noopener noreferrer"
                  aria-label="facebook"
                >
                  <SocialIconSvg>
                    <use href={sprite + "#icon-facebook"}></use>
                  </SocialIconSvg>
                </LinkA>
              </SocialWrap>
            </InfoWrap>
          </BlockWrap>

          <BlockWrap style={{ flexDirection: "row-reverse" }}>
            <PhotoWrap>
              <PhotoImg src={DeputyImg} alt="Наталія Степанівна" />
            </PhotoWrap>
            <InfoWrap>
              <Address>
                <Text>Голова наглядової ради клубу:</Text>

                <LinkA href="tel:+380997877316" aria-label="Подзвонити">
                  <IconSvg>
                    <use href={sprite + "#icon-phone"}></use>
                  </IconSvg>
                  Наталія Степанівна
                </LinkA>

                <LinkStyled
                  to="/members/user/2"
                  aria-label="Переглянути профіль учасника"
                >
                  <IconSvg>
                    <use href={sprite + "#icon-users"}></use>
                  </IconSvg>
                  Переглянути профіль
                </LinkStyled>
              </Address>
              <SocialWrap>
                <LinkA
                  href="https://www.facebook.com/profile.php?id=100001904710920"
                  rel="noopener noreferrer"
                  aria-label="facebook"
                >
                  <SocialIconSvg>
                    <use href={sprite + "#icon-facebook"}></use>
                  </SocialIconSvg>
                </LinkA>
              </SocialWrap>
            </InfoWrap>
          </BlockWrap>

          <BlockWrap >
            <PhotoWrap>
              <PhotoImg src={AssistantImg} alt="В'ячеслав Іванович" />
            </PhotoWrap>
            <InfoWrap>
              <Address>
                <Text>Заступник директора клубу:</Text>

                <LinkA href="tel:+380677445024" aria-label="Подзвонити">
                  <IconSvg>
                    <use href={sprite + "#icon-phone"}></use>
                  </IconSvg>
                  В'ячеслав Іванович
                </LinkA>

                <LinkStyled
                  to="/members/user/38"
                  aria-label="Переглянути профіль учасника"
                >
                  <IconSvg>
                    <use href={sprite + "#icon-users"}></use>
                  </IconSvg>
                  Переглянути профіль
                </LinkStyled>
              </Address>
              <SocialWrap>
                <LinkA
                  href="https://www.facebook.com/profile.php?id=100019350066012"
                  rel="noopener noreferrer"
                  aria-label="facebook"
                >
                  <SocialIconSvg>
                    <use href={sprite + "#icon-facebook"}></use>
                  </SocialIconSvg>
                </LinkA>
              </SocialWrap>
            </InfoWrap>
          </BlockWrap>

          <BlockWrap style={{ flexDirection: "row-reverse" }}>
            <PhotoWrap>
              <PhotoImg src={TrainerImg} alt="Ігор Осипович" />
            </PhotoWrap>

            <InfoWrap>
              <Address>
                <Text>Головний тренер клубу:</Text>

                <LinkA href="tel:+380960116128" aria-label="Подзвонити">
                  <IconSvg>
                    <use href={sprite + "#icon-phone"}></use>
                  </IconSvg>
                  Ігор Осипович
                </LinkA>

                <LinkStyled
                  to="/members/user/100"
                  aria-label="Переглянути профіль учасника"
                >
                  <IconSvg>
                    <use href={sprite + "#icon-users"}></use>
                  </IconSvg>
                  Переглянути профіль
                </LinkStyled>
              </Address>
              <SocialWrap>
                <LinkA
                  href="https://www.facebook.com/profile.php?id=100008346792063"
                  rel="noopener noreferrer"
                  aria-label="facebook"
                >
                  <SocialIconSvg>
                    <use href={sprite + "#icon-facebook"}></use>
                  </SocialIconSvg>
                </LinkA>
              </SocialWrap>
            </InfoWrap>
          </BlockWrap>
        </SectionWrap>
      </Section>
    </>
  );
};
