import sprite from "../../sprite.svg";

import { useLocation, useNavigate } from "react-router-dom";
import { TitleSection } from "../TitleSection/TitleSection";
import { Button, ButtonIconSvg, List, Section, StatsInfoBar } from "./StatsPage-styled";
import { StatsPageHeading } from "./StatsPageHeading";
import { StatsItem } from "./StatsItem";
import { useStateContext } from "../../state/stateContext";
import { defineRank } from "../../helpers/defineRank";
import { getPlayerNameById } from "../../helpers/getPlayerNameById";
import { useState, useEffect } from "react";
import { TournamentsMixtFilterBar } from "../Filters/TournamentsMixtFilterBar";
import { NotFound } from "../NotFound/NotFound";

export const AllSeasonsStatsPage = () => {
  const { globalState } = useStateContext();
  const { tournaments, members } = globalState;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const parts = pathname.split("/");
  const tournamentId = parts[2];

  // Find tournament by tournament_id
  const currentTournament = tournaments?.find((t) => t.tournament_id === tournamentId);
  
  const name = currentTournament?.name || "";
  
  // Get ALL stages from ALL seasons
  const allStages = currentTournament?.seasons?.flatMap((season) => season.stages) || [];

  const flattenedArray = allStages.flatMap((stage) => stage.players);

  const isMixt = flattenedArray[0]?.member_id.length === 2;

  const [filteredArray, setFilteredArray] = useState(flattenedArray);

  // Update filteredArray when flattenedArray changes
  useEffect(() => {
    setFilteredArray(flattenedArray);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tournaments, tournamentId]);

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

    const name = getPlayerNameById(el.member_id, members);
    return { ...el, winCount, name, totalRank };
  });

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
    navigate(`/tournaments/${tournamentId}`);
  };

  // Get total seasons count for display
  const seasonsCount = currentTournament?.seasons?.length || 0;
  const stagesCount = allStages.length;

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

  return (
    <>
      <Section>
        <TitleSection
          icon={"#icon-cup"}
          title={`${name} - Статистика`}
        >
          <Button onClick={handleBack}>
            <ButtonIconSvg>
              <use href={sprite + "#icon-undo"}></use>
            </ButtonIconSvg>
            Назад
          </Button>
        </TitleSection>

        <StatsInfoBar>
          Сезонів: {seasonsCount} | Турнірів: {stagesCount} | {isMixt ? "Пар" : "Учасників"}: {sortedPlayersStats.length}
        </StatsInfoBar>

        {isMixt && (
          <TournamentsMixtFilterBar
            flattenedArray={flattenedArray}
            members={members}
            setFilteredArray={setFilteredArray}
          />
        )}

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
