import { IconSvg, IconWrap, Section, Title } from "./TitleSection-styled";

import sprite from "../../sprite.svg";

export const TitleSection = ({ icon, title }) => {
  return (
    <>
      <Section>
        <Title>
          <IconWrap>
            <IconSvg>
              <use href={sprite + icon}></use>
            </IconSvg>
          </IconWrap>
          {title}
        </Title>
      </Section>
    </>
  );
};
