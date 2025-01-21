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

export const TitleSection = ({
  icon,
  title,
  children,
  memberId = null,
  stats = false,
}) => {
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

            {stats && (
              <LinkStyled
                to={`stats`}
                aria-label="Переглянути загальну статистику по турніру"
              >
                <IconWrap>
                  <IconSvg>
                    <use href={sprite + "#icon-info"}></use>
                  </IconSvg>
                </IconWrap>
                Статистика
              </LinkStyled>
            )}

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
