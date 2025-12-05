import sprite from "../../sprite.svg";
import { IconSvg, IconWrap, Section, Text } from "./LastUpdateSection-styled";

export const LastUpdateSection = () => {
  return (
    <>
      <Section>
        <Text>
          <IconWrap>
            <IconSvg>
              <use href={sprite + "#icon-loop"}></use>
            </IconSvg>
          </IconWrap>
          Останнє оновлення: 05.12.2025
        </Text>
      </Section>
    </>
  );
};
