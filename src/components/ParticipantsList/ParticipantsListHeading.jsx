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
            <ButtonIconSvg color="#00b64c">
              <use href={sprite + "#icon-evil"}></use>
            </ButtonIconSvg>
          </HeadingText>

          <HeadingText>
            <ButtonIconSvg color="#b60000">
              <use href={sprite + "#icon-sad"}></use>
            </ButtonIconSvg>
          </HeadingText>

          <HeadingText>
            <ButtonIconSvg color="#000000">
              <use href={sprite + "#icon-star"}></use>
            </ButtonIconSvg>
          </HeadingText>
        </HeadingWrap>
      </Heading>
    </>
  );
};
