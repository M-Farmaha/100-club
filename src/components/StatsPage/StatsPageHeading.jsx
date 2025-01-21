import {
  ButtonIconSvg,
  Heading,
  HeadingText,
  HeadingWrap,
} from "./StatsPage-styled";
import sprite from "../../sprite.svg";

export const StatsPageHeading = () => {
  return (
    <>
      <Heading style={{ height: "50px" }}>
        <HeadingWrap>
          <HeadingText>№</HeadingText>

          <HeadingText>Учасник</HeadingText>

          <HeadingText>
            <ButtonIconSvg color="var(--rank-color)">
              <use href={sprite + "#icon-cup"}></use>
            </ButtonIconSvg>
          </HeadingText>

          <HeadingText>
            <ButtonIconSvg color="var(--rank-color)">
              <use href={sprite + "#icon-star"}></use>
            </ButtonIconSvg>
          </HeadingText>
        </HeadingWrap>
      </Heading>
    </>
  );
};
