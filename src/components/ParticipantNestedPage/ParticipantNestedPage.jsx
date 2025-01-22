import { useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../../state/stateContext";
import { defineRank } from "../../helpers/defineRank";
import {
  Button,
  ButtonIconSvg,
  Item,
  ItemText,
  ItemWrap,
  List,
  Section,
} from "./ParticipantNestedPage-styled";
import { TitleSection } from "../TitleSection/TitleSection";

import sprite from "../../sprite.svg";
import { getMedalColor } from "../../helpers/getMedalColor";
// import { isDateHidden } from "../../helpers/isDateHidden";

export const ParticipantNestedPage = () => {
  const { globalState } = useStateContext();
  const { tournaments, members } = globalState;

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const parts = pathname.split("/");
  const tournamentId = parts[2];
  const stageId = parts[3];
  const playerId = parts[4];

  const { stages } = tournaments?.find((t) => t.id === tournamentId);
  const { players } = stages?.find((s) => s.date === stageId);

  const currentPlayer = players?.find((p) => p.member_id === playerId);
  const { position, win, defeat } = currentPlayer;
  const total = win + defeat;
  const winPercentage = ((win / total) * 100).toFixed(2);
  const defeatPercentage = ((defeat / total) * 100).toFixed(2);

  const currentPlayerRank = defineRank(position);
  const member = members.find((member) => member.id === playerId);

  // const isHide = isDateHidden(stageId);

  const handleBack = () => {
    navigate(`/tournaments/${tournamentId}/${stageId}`);
  };

  return (
    <>
      <Section>
        <TitleSection
          icon={"#icon-user"}
          title={member?.name}
          memberId={member?.id}
        >
          <Button onClick={handleBack}>
            <ButtonIconSvg>
              <use href={sprite + "#icon-undo"}></use>
            </ButtonIconSvg>
            Назад
          </Button>
        </TitleSection>

        <List>
          <Item>
            <ItemWrap>
              <ItemText>
                <ButtonIconSvg
                  color={
                    getMedalColor(position) || "var(--player-default-color)"
                  }
                >
                  <use href={sprite + "#icon-medal"}></use>
                </ButtonIconSvg>
                Позиція
              </ItemText>
              <ItemText>{position}</ItemText>
            </ItemWrap>
          </Item>

          <Item>
            <ItemWrap>
              <ItemText>
                <ButtonIconSvg color="var(--rank-color)">
                  <use href={sprite + "#icon-star"}></use>
                </ButtonIconSvg>
                Рейтинг
              </ItemText>
              <ItemText>{currentPlayerRank}</ItemText>
            </ItemWrap>
          </Item>

          <Item>
            <ItemWrap>
              <ItemText>
                <ButtonIconSvg color="var(--power-color)">
                  <use href={sprite + "#icon-power"}></use>
                </ButtonIconSvg>
                Зіграно поєдинків
              </ItemText>
              <ItemText>{total}</ItemText>
            </ItemWrap>
          </Item>

          <Item>
            <ItemWrap>
              <ItemText>
                <ButtonIconSvg color="var(--accent-hover-color)">
                  <use href={sprite + "#icon-arrow-bold"}></use>
                </ButtonIconSvg>
                Kількість перемог
              </ItemText>
              <ItemText>{win}</ItemText>
            </ItemWrap>
          </Item>

          <Item>
            <ItemWrap>
              <ItemText>
                <ButtonIconSvg
                  color="var(--lose-color)"
                  style={{ transform: "rotate(180deg)" }}
                >
                  <use href={sprite + "#icon-arrow-bold"}></use>
                </ButtonIconSvg>
                Kількість поразок
              </ItemText>
              <ItemText>{defeat}</ItemText>
            </ItemWrap>
          </Item>

          <Item>
            <ItemWrap>
              <ItemText>
                <ButtonIconSvg color="var(--accent-hover-color)">
                  <use href={sprite + "#icon-chart"}></use>
                </ButtonIconSvg>
                Відсоток перемог
              </ItemText>
              <ItemText>{winPercentage} %</ItemText>
            </ItemWrap>
          </Item>

          <Item>
            <ItemWrap>
              <ItemText>
                <ButtonIconSvg
                  color="var(--lose-color)"
                  style={{ transform: "scaleX(-1)" }}
                >
                  <use href={sprite + "#icon-chart"}></use>
                </ButtonIconSvg>
                Відсоток поразок
              </ItemText>
              <ItemText>{defeatPercentage} %</ItemText>
            </ItemWrap>
          </Item>
        </List>
      </Section>
    </>
  );
};
