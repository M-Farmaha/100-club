import {
  FooterIcon,
  FooterLink,
  FooterText,
  Section,
  SectionWrap,
} from "./Footer-styled";

import sprite from "../../sprite.svg";

export const Footer = () => {
  return (
    <>
      <Section>
        <SectionWrap>
          <FooterText>
            &#169; 2024, All Rights Reserved, Developed with
            <FooterIcon>
              <use href={sprite + "#icon-footer-heart"}></use>
            </FooterIcon>
            by{" "}
            <FooterLink
              href="https://www.linkedin.com/in/max-farmaha"
              rel="noopener noreferrer"
              aria-label="Перейти на сторінку автора у linkedin"
            >
              Max Farmaha
            </FooterLink>
          </FooterText>
        </SectionWrap>
      </Section>
    </>
  );
};
