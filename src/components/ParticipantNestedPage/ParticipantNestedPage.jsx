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
import { getPlayerNameById } from "../../helpers/getPlayerNameById";
import { NotFound } from "../NotFound/NotFound";

export const ParticipantNestedPage = () => {
  const { globalState } = useStateContext();
  const { tournaments, members } = globalState;

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const parts = pathname.split("/");
  const tournamentId = parts[2];
  const year = parts[3];
  const stageId = parts[4];
  const playerId = parts[5];
  const playerIds = playerId?.split("-") || [];

  // Find tournament by tournament_id
  const currentTournament = tournaments?.find((t) => t.tournament_id === tournamentId);
  // Find season by year
  const currentSeason = currentTournament?.seasons?.find((s) => s.year === parseInt(year));
  // Find stage by date
  const currentStage = currentSeason?.stages?.find((s) => s.date === stageId);
  const players = currentStage?.players || [];

  const currentPlayer = players?.find((player) => {
    return playerIds.every((id) => player.member_id.includes(id));
  });

  const handleBack = () => {
    navigate(`/tournaments/${tournamentId}/${year}/${stageId}`);
  };

  // Show NotFound for invalid data
  if (!currentTournament || !currentSeason || !currentStage) {
    return (
      <Section>
        <NotFound
          title="Дані не знайдено"
          message="Турнір, сезон або етап не існує."
          backPath="/tournaments"
          backLabel="До турнірів"
        />
      </Section>
    );
  }

  if (!currentPlayer) {
    return (
      <Section>
        <NotFound
          title="Учасника не знайдено"
          message={`Учасник не знайдений в етапі ${stageId}.`}
          backPath={`/tournaments/${tournamentId}/${year}/${stageId}`}
          backLabel="До учасників"
        />
      </Section>
    );
  }

  const { position, win, defeat, member_id } = currentPlayer;

  const isComplexId = member_id?.length > 1;

  const name = getPlayerNameById(member_id, members);
  const total = win + defeat;
  const winPercentage = total > 0 ? ((win / total) * 100).toFixed(2) : "0.00";
  const defeatPercentage = total > 0 ? ((defeat / total) * 100).toFixed(2) : "0.00";
  const currentPlayerRank = defineRank(position);

  return (
    <>
      <Section>
        <TitleSection
          icon={isComplexId ? "#icon-users" : "#icon-user"}
          title={name}
          memberId={isComplexId ? null : member_id}
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
                <ButtonIconSvg color="var(--ball-color)">
                  <use href={sprite + "#icon-ball"}></use>
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
