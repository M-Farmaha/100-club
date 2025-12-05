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
  StatsInfoBar,
} from "./StatsPage-styled";
import { getPlayerNameById } from "../../helpers/getPlayerNameById";
import { defineRank } from "../../helpers/defineRank";
import { useStateContext } from "../../state/stateContext";
import { NotFound } from "../NotFound/NotFound";

export const AllSeasonsStatsItemDetail = () => {
  const { globalState } = useStateContext();
  const { tournaments, members } = globalState;

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const parts = pathname.split("/");
  const tournamentId = parts[2];
  const playerId = parts[4];
  const playerIds = playerId?.split("-") || [];

  // Find tournament by tournament_id
  const currentTournament = tournaments?.find((t) => t.tournament_id === tournamentId);
  
  // Get ALL stages from ALL seasons
  const allStages = currentTournament?.seasons?.flatMap((season) => season.stages) || [];

  const playerStats = allStages
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

  const handleBack = () => {
    navigate(`/tournaments/${tournamentId}/stats`);
  };

  // Show NotFound if tournament doesn't exist
  if (!currentTournament) {
    return (
      <Section>
        <NotFound
          title="Турнір не знайдено"
          message={`Турнір "${tournamentId}" не існує.`}
          backPath="/tournaments"
          backLabel="До списку турнірів"
        />
      </Section>
    );
  }

  // Show NotFound if player has no stats
  if (position.length === 0) {
    return (
      <Section>
        <NotFound
          title="Гравця не знайдено"
          message="Статистика для цього гравця відсутня."
          backPath={`/tournaments/${tournamentId}/stats`}
          backLabel="До статистики"
        />
      </Section>
    );
  }

  const isComplexId = member_id.length > 1;

  const totalTournaments = position.length;
  const seasonsCount = currentTournament?.seasons?.length || 0;

  // Ukrainian pluralization for "сезон"
  const getSeasonText = (count) => {
    if (count === 1) return `весь ${count} сезон`;
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return `всі ${count} сезонів`;
    if (lastDigit === 1) return `весь ${count} сезон`;
    if (lastDigit >= 2 && lastDigit <= 4) return `всі ${count} сезони`;
    return `всі ${count} сезонів`;
  };

  const gold = position.filter((pos) => pos === 1).length;
  const silver = position.filter((pos) => pos === 2).length;
  const bronze = position.filter((pos) => pos === 3).length;

  const totalWins = win;
  const totalDefeats = defeat;
  const totalGames = totalWins + totalDefeats;
  const winPercentage = totalGames > 0 ? ((totalWins / totalGames) * 100).toFixed(2) : "0.00";
  const defeatPercentage = totalGames > 0 ? ((totalDefeats / totalGames) * 100).toFixed(2) : "0.00";

  const rankArray = position.map((pos) => defineRank(pos));
  const totalRank = rankArray.reduce((acc, rank) => acc + rank, 0);
  const averageRank = (totalRank / position.length).toFixed(2);
  const sortedPositions = position.sort((a, b) => a - b);
  const topFivePositions = sortedPositions.slice(0, 5);
  const topFiveRankArray = topFivePositions.map((pos) => defineRank(pos));
  const topFiveRank = topFiveRankArray.reduce((acc, rank) => acc + rank, 0);

  const name = getPlayerNameById(member_id, members);

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

      <StatsInfoBar>
        Статистика за {getSeasonText(seasonsCount)} турніру "{currentTournament.name}"
      </StatsInfoBar>

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
