import { IconSvg, IconWrap, Section, Text } from "./CounterSection-styled";

import sprite from "../../sprite.svg";

export const CounterSection = ({ visibleUsers }) => {
  return (
    <>
      <Section>
        <Text>
          <IconWrap>
            <IconSvg>
              <use href={sprite + "#icon-users"}></use>
            </IconSvg>
          </IconWrap>
          Кількість учасників: {visibleUsers}
        </Text>
      </Section>
    </>
  );
};
