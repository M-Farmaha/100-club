import { useLocation, useNavigate } from "react-router-dom";
import { TitleSection } from "../TitleSection/TitleSection";

import {
  Button,
  ButtonIconSvg,
  List,
  Section,
} from "./ParticipantsList-styled";
import { ParticipantsListHeading } from "./ParticipantsListHeading";
import sprite from "../../sprite.svg";
import { ParticipantsItem } from "./ParticipantsItem";

export const ParticipantsList = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Section>
        <TitleSection
          icon={"#icon-users"}
          title={"Кількість учасників: " + state?.players?.length}
        >
          <Button onClick={handleBack}>
            <ButtonIconSvg>
              <use href={sprite + "#icon-undo"}></use>
            </ButtonIconSvg>
            Назад
          </Button>
        </TitleSection>
        <List>
          <ParticipantsListHeading />
          {state?.players?.map((el, index) => (
            <ParticipantsItem key={el.member_id} el={el} index={index} />
          ))}
        </List>
      </Section>
    </>
  );
};
