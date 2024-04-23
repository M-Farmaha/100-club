import { Heading, HeadingText, HeadingWrap } from "./StagesList-styled";

export const StagesListHeading = () => {
  return (
    <>
      <Heading style={{ height: "50px" }}>
        <HeadingWrap>
          <HeadingText>№</HeadingText>
          <HeadingText>Дата проведення</HeadingText>

          <HeadingText>Переможець</HeadingText>
        </HeadingWrap>
      </Heading>
    </>
  );
};
