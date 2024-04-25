import {
  IconSvg,
  IconWrap,
  Section,
  SectionWrap,
  Title,
} from "./TitleSection-styled";

import sprite from "../../sprite.svg";

export const TitleSection = ({ icon, title, children }) => {
  return (
    <>
      <Section>
        <SectionWrap>
          <Title>
            <IconWrap>
              <IconSvg>
                <use href={sprite + icon}></use>
              </IconSvg>
            </IconWrap>
            {title}
          </Title>
          {children}
        </SectionWrap>
      </Section>
    </>
  );
};
