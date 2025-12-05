import sprite from "../../sprite.svg";

import { useNavigate } from "react-router-dom";
import { TitleSection } from "../TitleSection/TitleSection";
import { Button, ButtonIconSvg, List, Section, StatsInfoBar } from "./StatsPage-styled";
import { StatsPageHeading } from "./StatsPageHeading";
import { StatsItem } from "./StatsItem";
import { useStateContext } from "../../state/stateContext";
import { defineRank } from "../../helpers/defineRank";
import { getPlayerNameById } from "../../helpers/getPlayerNameById";
import { SuperStatsFilterBar } from "../Filters/SuperStatsFilterBar";
import { filterOptionsBySex, filterOptionsByTournamentType } from "../../constants/constants";

export const SuperStatsPage = () => {
  const { globalState } = useStateContext();
  const { tournaments, members, filters } = globalState;
  
  // Use fallback values if filters not initialized in localStorage
  const superStatsSex = filters?.superStatsSex || filterOptionsBySex.all.id;
  const superStatsTournamentType = filters?.superStatsTournamentType || filterOptionsByTournamentType.all.id;

  const navigate = useNavigate();

  // Get ALL stages from ALL tournaments and ALL seasons
  const allStages = tournaments?.flatMap((tournament) =>
    tournament.seasons?.flatMap((season) => season.stages) || []
  ) || [];

  // Get all players from all stages
  const allPlayers = allStages.flatMap((stage) => stage.players);

  // Filter by tournament type FIRST
  // "Одиночний" = only single players (member_id.length === 1)
  // "Парний" = only pair tournaments (member_id.length === 2), split into individuals
  // "Усі" = include everything, but split pairs into individuals
  let filteredByType = allPlayers;
  if (superStatsTournamentType === filterOptionsByTournamentType.single.id) {
    filteredByType = allPlayers.filter((player) => player.member_id.length === 1);
  } else if (superStatsTournamentType === filterOptionsByTournamentType.pairs.id) {
    filteredByType = allPlayers.filter((player) => player.member_id.length === 2);
  }

  // Split ALL pairs into individual players (each player gets credited)
  // Never show pairs as "Player1 / Player2"
  const individualPlayers = filteredByType.flatMap((player) => {
    if (player.member_id.length === 2) {
      // Split pair into two individual entries
      return player.member_id.map((id) => ({
        ...player,
        member_id: [id],
      }));
    }
    return [player];
  });

  // Filter by sex
  const filteredBySex = individualPlayers.filter((player) => {
    if (superStatsSex === filterOptionsBySex.all.id) {
      return true;
    }
    const memberId = player.member_id[0];
    const member = members.find((m) => String(m.id) === String(memberId));
    return member?.sex === superStatsSex;
  });

  // Aggregate stats per individual player
  const playersStats = filteredBySex.reduce((acc, player) => {
    const { member_id, win, defeat, position } = player;
    const key = member_id[0]; // Always single ID now

    if (!acc[key]) {
      acc[key] = {
        member_id,
        win: 0,
        defeat: 0,
        position: [],
      };
    }

    acc[key].win += win;
    acc[key].defeat += defeat;
    acc[key].position.push(position);

    return acc;
  }, {});

  const structuredPlayersStats = Object.values(playersStats);

  const statsWithWins = structuredPlayersStats.map((el) => {
    const winCount = el.position.filter((pos) => pos === 1).length;
    const sortedPositions = el.position.sort((a, b) => a - b);
    const rankArray = sortedPositions.map((pos) => defineRank(pos));
    const totalRank = rankArray.reduce((acc, rank) => acc + rank, 0);

    const name = getPlayerNameById(el.member_id, members);
    return { ...el, winCount, name, totalRank };
  });

  // Sort by totalRank (highest first)
  const sortedPlayersStats = statsWithWins.sort((a, b) => {
    if (b.totalRank === a.totalRank) {
      if (b.winCount === a.winCount) {
        return a.name.localeCompare(b.name);
      }
      return b.winCount - a.winCount;
    }
    return b.totalRank - a.totalRank;
  });

  let globalPosition = 1;
  let prevWinCount = sortedPlayersStats[0]?.winCount;
  let prevTotalRank = sortedPlayersStats[0]?.totalRank;

  sortedPlayersStats.forEach((player, index) => {
    if (player.winCount === prevWinCount && player.totalRank === prevTotalRank) {
      player.globalPosition = globalPosition;
    } else {
      globalPosition = index + 1;
      player.globalPosition = globalPosition;
    }

    prevWinCount = player.winCount;
    prevTotalRank = player.totalRank;
  });

  const handleBack = () => {
    navigate(`/tournaments`);
  };

  // Count unique years (seasons) across all tournaments
  const uniqueYears = new Set();
  tournaments?.forEach((tournament) => {
    tournament.seasons?.forEach((season) => {
      uniqueYears.add(season.year);
    });
  });
  const seasonsCount = uniqueYears.size;

  // Count stages (tournaments/games)
  const stagesCount = allStages.length;

  return (
    <>
      <Section>
        <TitleSection
          icon={"#icon-cup"}
          title={"Суперстатистика"}
        >
          <Button onClick={handleBack}>
            <ButtonIconSvg>
              <use href={sprite + "#icon-undo"}></use>
            </ButtonIconSvg>
            Назад
          </Button>
        </TitleSection>

        <StatsInfoBar>
          Сезонів: {seasonsCount} | Турнірів: {stagesCount} | Учасників: {sortedPlayersStats.length}
        </StatsInfoBar>

        <SuperStatsFilterBar />

        <List>
          <StatsPageHeading />
          {sortedPlayersStats?.map((el, index) => (
            <StatsItem key={index} el={el} index={index} isAllSeasons />
          ))}
        </List>
      </Section>
    </>
  );
};
