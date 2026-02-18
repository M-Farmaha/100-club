import sprite from "../../sprite.svg";

import { useLocation, useNavigate } from "react-router-dom";
import { TitleSection } from "../TitleSection/TitleSection";
import { Button, ButtonIconSvg, List, Section, StatsInfoBar } from "./StatsPage-styled";
import { StatsPageHeading } from "./StatsPageHeading";
import { StatsItem } from "./StatsItem";
import { useStateContext } from "../../state/stateContext";
import { defineRank } from "../../helpers/defineRank";
import { getPlayerNameById } from "../../helpers/getPlayerNameById";
import { useState, useMemo } from "react";
import { TournamentsMixtFilterBar } from "../Filters/TournamentsMixtFilterBar";
import { StatsRatingFilterBar } from "../Filters/StatsRatingFilterBar";
import { FilterSelect } from "../Filters/FilterSelect";
import { FILTERS, filterOptionsByRating } from "../../constants/constants";
import { NotFound } from "../NotFound/NotFound";

export const AllSeasonsStatsPage = () => {
  const { globalState } = useStateContext();
  const { tournaments, members, filters } = globalState;
  const mixSex = filters?.mixSex;
  const statsRating = filters?.statsRating || filterOptionsByRating.total.id;
  const rankKey = statsRating === "topFive" ? "topFiveRank" : "totalRank";

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const parts = pathname.split("/");
  const tournamentId = parts[2];

  // Find tournament by tournament_id
  const currentTournament = tournaments?.find((t) => t.tournament_id === tournamentId);

  const name = currentTournament?.name || "";

  // Get ALL stages from ALL seasons
  const allStages = useMemo(() => {
    return currentTournament?.seasons?.flatMap((season) => season.stages) || [];
  }, [currentTournament]);

  const flattenedArray = useMemo(() => {
    return allStages.flatMap((stage) => stage.players);
  }, [allStages]);

  const isMixt = flattenedArray[0]?.member_id.length === 2;

  const [filteredArray, setFilteredArray] = useState(flattenedArray);

  const playersStats = filteredArray.reduce((acc, player) => {
    const { member_id, win, defeat, position } = player;

    if (!acc[member_id]) {
      acc[member_id] = {
        member_id,
        win: 0,
        defeat: 0,
        position: [],
      };
    }

    acc[member_id].win += win;
    acc[member_id].defeat += defeat;
    acc[member_id].position.push(position);

    return acc;
  }, {});

  const structuredPlayersStats = Object.values(playersStats);

  const statsWithWins = structuredPlayersStats.map((el) => {
    const winCount = el.position.filter((pos) => pos === 1).length;
    const sortedPositions = el.position.sort((a, b) => a - b);
    const rankArray = sortedPositions.map((pos) => defineRank(pos));
    const totalRank = rankArray.reduce((acc, rank) => acc + rank, 0);

    const topFivePositions = sortedPositions.slice(0, 5);
    const topFiveRankArray = topFivePositions.map((pos) => defineRank(pos));
    const topFiveRank = topFiveRankArray.reduce((acc, rank) => acc + rank, 0);

    const name = getPlayerNameById(el.member_id, members);
    return { ...el, winCount, name, totalRank, topFiveRank };
  });

  const sortedPlayersStats = statsWithWins.sort((a, b) => {
    if (b[rankKey] === a[rankKey]) {
      if (b.winCount === a.winCount) {
        return a.name.localeCompare(b.name);
      }
      return b.winCount - a.winCount;
    }
    return b[rankKey] - a[rankKey];
  });

  let globalPosition = 1;
  let prevWinCount = sortedPlayersStats[0]?.winCount;
  let prevRank = sortedPlayersStats[0]?.[rankKey];

  sortedPlayersStats.forEach((player, index) => {
    if (player.winCount === prevWinCount && player[rankKey] === prevRank) {
      player.globalPosition = globalPosition;
    } else {
      globalPosition = index + 1;
      player.globalPosition = globalPosition;
    }

    prevWinCount = player.winCount;
    prevRank = player[rankKey];
  });

  const handleBack = () => {
    navigate(`/tournaments/${tournamentId}`);
  };

  // Get total seasons count for display
  const seasonsCount = currentTournament?.seasons?.length || 0;
  const stagesCount = allStages.length;

  // Show NotFound if tournament doesn't exist
  if (!currentTournament) {
    return (
      <Section>
        <NotFound title="Турнір не знайдено" message={`Турнір "${tournamentId}" не існує.`} backPath="/tournaments" backLabel="До списку турнірів" />
      </Section>
    );
  }

  return (
    <>
      <Section>
        <TitleSection icon={"#icon-cup"} title={`${name} - Статистика`}>
          <Button onClick={handleBack}>
            <ButtonIconSvg>
              <use href={sprite + "#icon-undo"}></use>
            </ButtonIconSvg>
            Назад
          </Button>
        </TitleSection>

        <StatsInfoBar>
          Сезонів: {seasonsCount} | Турнірів: {stagesCount} | {isMixt ? (mixSex === 'male' ? 'Чоловіків' : mixSex === 'female' ? 'Жінок' : 'Пар') : 'Учасників'}: {sortedPlayersStats.length}
        </StatsInfoBar>

        {isMixt ? (
          <TournamentsMixtFilterBar flattenedArray={flattenedArray} members={members} setFilteredArray={setFilteredArray}>
            <FilterSelect
              id={FILTERS.statsRating.id}
              options={filterOptionsByRating}
              label={FILTERS.statsRating.label}
              placeholder={filterOptionsByRating[statsRating]?.title}
              icon={"#icon-star"}
            />
          </TournamentsMixtFilterBar>
        ) : (
          <StatsRatingFilterBar />
        )}

        <List>
          <StatsPageHeading />
          {sortedPlayersStats?.map((el, index) => (
            <StatsItem key={index} el={el} index={index} />
          ))}
        </List>
      </Section>
    </>
  );
};
