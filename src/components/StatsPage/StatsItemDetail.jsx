import sprite from "../../sprite.svg";

import { useLocation, useNavigate } from "react-router-dom";
import { TitleSection } from "../TitleSection/TitleSection";
import {
  Button,
  ButtonIconSvg,
  ItemDetail,
  ItemDetailText,
  ItemWrap,
  List,
  Section,
} from "./StatsPage-styled";
import { getPlayerNameById } from "../../helpers/getPlayerNameById";
import { defineRank } from "../../helpers/defineRank";
import { useStateContext } from "../../state/stateContext";

export const StatsItemDetail = () => {
  const { globalState } = useStateContext();
  const { tournaments, members } = globalState;

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const parts = pathname.split("/");
  const tournamentId = parts[2];
  const playerId = parts[4];
  const playerIds = playerId.split("-");

  const { stages = [] } = tournaments?.find((t) => t.id === tournamentId) || {};

  const playerStats = stages
    .flatMap((stage) => stage.players)
    .filter((player) => {
      return playerIds.every((id) => player.member_id.includes(id));
    })
    .reduce(
      (acc, player) => {
        const { win, defeat, position } = player;

        acc.win += win;
        acc.defeat += defeat;
        acc.position.push(position);

        return acc;
      },
      { member_id: playerIds, win: 0, defeat: 0, position: [] }
    );

  const { member_id, position, win, defeat } = playerStats;

  const isComplexId = member_id.length > 1;

  const totalTournaments = position.length;

  const gold = position.filter((pos) => pos === 1).length;
  const silver = position.filter((pos) => pos === 2).length;
  const bronze = position.filter((pos) => pos === 3).length;

  const totalWins = win;
  const totalDefeats = defeat;
  const totalGames = totalWins + totalDefeats;
  const winPercentage = ((totalWins / totalGames) * 100).toFixed(2);
  const defeatPercentage = ((totalDefeats / totalGames) * 100).toFixed(2);

  const rankArray = position.map((pos) => defineRank(pos));
  const totalRank = rankArray.reduce((acc, rank) => acc + rank, 0);
  const averageRank = (totalRank / position.length).toFixed(2);
  const sortedPositions = position.sort((a, b) => a - b);
  const topFivePositions = sortedPositions.slice(0, 5);
  const topFiveRankArray = topFivePositions.map((pos) => defineRank(pos));
  const topFiveRank = topFiveRankArray.reduce((acc, rank) => acc + rank, 0);

  const name = getPlayerNameById(member_id, members);

  const handleBack = () => {
    navigate(`/tournaments/${tournamentId}/stats`);
  };

  return (
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
        <ItemDetail>
          <ItemWrap>
            <ItemDetailText>
              <ButtonIconSvg color={"var(--player-gold-color)"}>
                <use href={sprite + "#icon-medal"}></use>
              </ButtonIconSvg>
              Золото (1 місце)
            </ItemDetailText>
            <ItemDetailText>{gold}</ItemDetailText>
          </ItemWrap>
        </ItemDetail>

        <ItemDetail>
          <ItemWrap>
            <ItemDetailText>
              <ButtonIconSvg color={"var(--player-silver-color)"}>
                <use href={sprite + "#icon-medal"}></use>
              </ButtonIconSvg>
              Срібло (2 місце)
            </ItemDetailText>
            <ItemDetailText>{silver}</ItemDetailText>
          </ItemWrap>
        </ItemDetail>

        <ItemDetail>
          <ItemWrap>
            <ItemDetailText>
              <ButtonIconSvg color={"var(--player-bronze-color)"}>
                <use href={sprite + "#icon-medal"}></use>
              </ButtonIconSvg>
              Бронза (3 місце)
            </ItemDetailText>
            <ItemDetailText>{bronze}</ItemDetailText>
          </ItemWrap>
        </ItemDetail>

        <ItemDetail>
          <ItemWrap>
            <ItemDetailText>
              <ButtonIconSvg color="var(--rank-color)">
                <use href={sprite + "#icon-star"}></use>
              </ButtonIconSvg>
              Сумарний рейтинг
            </ItemDetailText>
            <ItemDetailText>{totalRank}</ItemDetailText>
          </ItemWrap>
        </ItemDetail>

        <ItemDetail>
          <ItemWrap>
            <ItemDetailText>
              <ButtonIconSvg color="var(--rank-color)">
                <use href={sprite + "#icon-star"}></use>
              </ButtonIconSvg>
              Середній рейтинг
            </ItemDetailText>
            <ItemDetailText>{averageRank}</ItemDetailText>
          </ItemWrap>
        </ItemDetail>

        <ItemDetail>
          <ItemWrap>
            <ItemDetailText>
              <ButtonIconSvg color="var(--rank-color)">
                <use href={sprite + "#icon-star"}></use>
              </ButtonIconSvg>
              Pейтинг 5 кращих турнірів
            </ItemDetailText>
            <ItemDetailText>{topFiveRank}</ItemDetailText>
          </ItemWrap>
        </ItemDetail>

        <ItemDetail>
          <ItemWrap>
            <ItemDetailText>
              <ButtonIconSvg color="var(--power-color)">
                <use href={sprite + "#icon-cup"}></use>
              </ButtonIconSvg>
              Зіграно турнірів
            </ItemDetailText>
            <ItemDetailText>{totalTournaments}</ItemDetailText>
          </ItemWrap>
        </ItemDetail>

        <ItemDetail>
          <ItemWrap>
            <ItemDetailText>
              <ButtonIconSvg color="var(--ball-color)">
                <use href={sprite + "#icon-ball"}></use>
              </ButtonIconSvg>
              Зіграно поєдинків
            </ItemDetailText>
            <ItemDetailText>{totalGames}</ItemDetailText>
          </ItemWrap>
        </ItemDetail>

        <ItemDetail>
          <ItemWrap>
            <ItemDetailText>
              <ButtonIconSvg color="var(--accent-hover-color)">
                <use href={sprite + "#icon-arrow-bold"}></use>
              </ButtonIconSvg>
              Kількість перемог
            </ItemDetailText>
            <ItemDetailText>{totalWins}</ItemDetailText>
          </ItemWrap>
        </ItemDetail>

        <ItemDetail>
          <ItemWrap>
            <ItemDetailText>
              <ButtonIconSvg
                color="var(--lose-color)"
                style={{ transform: "rotate(180deg)" }}
              >
                <use href={sprite + "#icon-arrow-bold"}></use>
              </ButtonIconSvg>
              Kількість поразок
            </ItemDetailText>
            <ItemDetailText>{totalDefeats}</ItemDetailText>
          </ItemWrap>
        </ItemDetail>

        <ItemDetail>
          <ItemWrap>
            <ItemDetailText>
              <ButtonIconSvg color="var(--accent-hover-color)">
                <use href={sprite + "#icon-chart"}></use>
              </ButtonIconSvg>
              Відсоток перемог
            </ItemDetailText>
            <ItemDetailText>{winPercentage} %</ItemDetailText>
          </ItemWrap>
        </ItemDetail>

        <ItemDetail>
          <ItemWrap>
            <ItemDetailText>
              <ButtonIconSvg
                color="var(--lose-color)"
                style={{ transform: "scaleX(-1)" }}
              >
                <use href={sprite + "#icon-chart"}></use>
              </ButtonIconSvg>
              Відсоток поразок
            </ItemDetailText>
            <ItemDetailText>{defeatPercentage} %</ItemDetailText>
          </ItemWrap>
        </ItemDetail>
      </List>
    </Section>
  );
};
