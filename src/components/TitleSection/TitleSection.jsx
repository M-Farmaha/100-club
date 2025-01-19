import {
  IconSvg,
  IconWrap,
  LinkStyled,
  LinkWrap,
  Section,
  SectionWrap,
  Title,
} from "./TitleSection-styled";

import sprite from "../../sprite.svg";

export const TitleSection = ({ icon, title, children, memberId = null }) => {
  return (
    <>
      <Section>
        <SectionWrap>
          <LinkWrap>
            <Title>
              <IconWrap>
                <IconSvg>
                  <use href={sprite + icon}></use>
                </IconSvg>
              </IconWrap>
              {title}
            </Title>

            {memberId && (
              <LinkStyled
                to={`/members/user/${memberId}`}
                aria-label="Переглянути профіль учасника"
              >
                <IconWrap>
                  <IconSvg>
                    <use href={sprite + "#icon-info"}></use>
                  </IconSvg>
                </IconWrap>
                Переглянути
              </LinkStyled>
            )}
          </LinkWrap>
          {children}
        </SectionWrap>
      </Section>
    </>
  );
};
