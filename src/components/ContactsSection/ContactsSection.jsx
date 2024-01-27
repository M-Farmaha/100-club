import {
  Address,
  AddressWrap,
  IconSvg,
  Link,
  Section,
  SectionWrap,
  Text,
  TitleH2,
} from "./ContactsSection-styled";

import sprite from "../../sprite.svg";

import { Logo } from "../Logo/Logo";

export const ContactsSection = () => {
  return (
    <>
      <Section>
        <SectionWrap>
          <TitleH2>Наші контакти:</TitleH2>
          <AddressWrap>
            <Logo />
            <Address>
              <Text> Адреса нашого домашнього корту:</Text>

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
          </AddressWrap>
        </SectionWrap>
      </Section>
    </>
  );
};
