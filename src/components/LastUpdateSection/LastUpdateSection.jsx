import sprite from "../../sprite.svg";
import { IconSvg, IconWrap, Section, Text } from "./LastUpdateSection-styled";

export const LastUpdateSection = () => {
  // Use build date from environment variable, fallback to current date
  const buildDate = process.env.REACT_APP_BUILD_DATE || new Date().toLocaleDateString('uk-UA');

  return (
    <>
      <Section>
        <Text>
          <IconWrap>
            <IconSvg>
              <use href={sprite + "#icon-loop"}></use>
            </IconSvg>
          </IconWrap>
          Останнє оновлення: {buildDate}
        </Text>
      </Section>
    </>
  );
};
