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
          Останнє оновлення: 08.02.2024
        </Text>
      </Section>
    </>
  );
};
