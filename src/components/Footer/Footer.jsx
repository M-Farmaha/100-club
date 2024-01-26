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
              href="https://github.com/M-Farmaha"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Відвідати профіль автора у гітхабі"
            >
              Max Farmaha
            </FooterLink>
          </FooterText>
        </SectionWrap>
      </Section>
    </>
  );
};
