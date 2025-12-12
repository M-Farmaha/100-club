import sprite from "../../sprite.svg";

import { useNavigate, useParams } from "react-router-dom";
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
import { Form, Section as FilterSection } from "../Filters/Filters-styled";
import { FilterSelect } from "../Filters/FilterSelect";
import { FILTERS, filterOptionsByTournamentType } from "../../constants/constants";

export const SuperStatsItemDetail = () => {
  const { globalState } = useStateContext();
  const { tournaments, members, filters } = globalState;

  const navigate = useNavigate();
  const { playerId } = useParams();
  const playerIds = playerId?.split("-") || [];

  // Get tournament type from global filters only
  const superStatsTournamentType = filters?.superStatsTournamentType || filterOptionsByTournamentType.all.id;

  // Get ALL stages from ALL tournaments and ALL seasons
  const allStages = tournaments?.flatMap((tournament) =>
    tournament.seasons?.flatMap((season) => season.stages) || []
  ) || [];

  // Get all players from all stages
  const allPlayers = allStages.flatMap((stage) => stage.players);

  // Filter by tournament type
  let filteredByType = allPlayers;
  if (superStatsTournamentType === filterOptionsByTournamentType.single.id) {
    filteredByType = allPlayers.filter((player) => player.member_id.length === 1);
  } else if (superStatsTournamentType === filterOptionsByTournamentType.pairs.id) {
    filteredByType = allPlayers.filter((player) => player.member_id.length === 2);
  }

  // Split pairs into individual players and filter for current player
  const playerStats = filteredByType
    .flatMap((player) => {
      if (player.member_id.length === 2) {
        // Split pair into two individual entries
        return player.member_id.map((id) => ({
          ...player,
          member_id: [id],
        }));
      }
      return [player];
    })
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
    navigate(`/tournaments/stats`);
  };

  // Show NotFound if player has no stats
  if (position.length === 0) {
    return (
      <Section>
        <NotFound
          title="Гравця не знайдено"
          message="Статистика для цього гравця відсутня."
          backPath="/tournaments/stats"
          backLabel="До суперстатистики"
        />
      </Section>
    );
  }

  const isComplexId = member_id.length > 1;

  const totalTournaments = position.length;

  // Count unique years (seasons) across all tournaments
  const uniqueYears = new Set();
  tournaments?.forEach((tournament) => {
    tournament.seasons?.forEach((season) => {
      uniqueYears.add(season.year);
    });
  });
  const seasonsCount = uniqueYears.size;

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

  // Get tournament type label
  const getTournamentTypeLabel = () => {
    if (superStatsTournamentType === filterOptionsByTournamentType.single.id) {
      return " (одиночні турніри)";
    } else if (superStatsTournamentType === filterOptionsByTournamentType.pairs.id) {
      return " (парні турніри)";
    }
    return "";
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
        Суперстатистика за {getSeasonText(seasonsCount)}{getTournamentTypeLabel()}
      </StatsInfoBar>

      <FilterSection>
        <Form onSubmit={(e) => e.preventDefault()}>
          <FilterSelect
            id={FILTERS.superStatsTournamentType.id}
            options={filterOptionsByTournamentType}
            label={FILTERS.superStatsTournamentType.label}
            placeholder={filterOptionsByTournamentType[superStatsTournamentType]?.title}
            icon={"#icon-cup"}
          />
        </Form>
      </FilterSection>

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
