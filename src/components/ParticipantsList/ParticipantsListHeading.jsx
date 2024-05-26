import {
  ButtonIconSvg,
  Heading,
  HeadingText,
  HeadingWrap,
} from "./ParticipantsList-styled";
import sprite from "../../sprite.svg";

export const ParticipantsListHeading = () => {
  return (
    <>
      <Heading style={{ height: "50px" }}>
        <HeadingWrap>
          <HeadingText>№</HeadingText>

          <HeadingText>Учасник</HeadingText>

          <HeadingText>
            <ButtonIconSvg color="var(--win-color)">
              <use href={sprite + "#icon-arrow-bold"}></use>
            </ButtonIconSvg>
          </HeadingText>

          <HeadingText>
            <ButtonIconSvg
              color="var(--lose-color)"
              style={{ transform: "rotate(180deg)" }}
            >
              <use href={sprite + "#icon-arrow-bold"}></use>
            </ButtonIconSvg>
          </HeadingText>

          <HeadingText>
            <ButtonIconSvg color="var(--gold-color)">
              <use href={sprite + "#icon-star"}></use>
            </ButtonIconSvg>
          </HeadingText>
        </HeadingWrap>
      </Heading>
    </>
  );
};
