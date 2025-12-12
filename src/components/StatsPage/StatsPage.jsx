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

export const StatsPage = () => {
  const { globalState } = useStateContext();
  const { tournaments, members, filters } = globalState;
  const mixSex = filters?.mixSex;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const parts = pathname.split("/");
  const tournamentId = parts[2];
  const year = parts[3];

  // Find tournament by tournament_id
  const currentTournament = tournaments?.find((t) => t.tournament_id === tournamentId);
  // Find season by year
  const currentSeason = currentTournament?.seasons?.find((s) => s.year === parseInt(year));
  
  const name = currentTournament?.name || "";

  const flattenedArray = useMemo(() => {
    const stages = currentSeason?.stages || [];
    return stages.flatMap((stage) => stage.players);
  }, [currentSeason]);

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
    const topFivePositions = sortedPositions.slice(0, 5);
    const topFiveRankArray = topFivePositions.map((pos) => defineRank(pos));
    const topFiveRank = topFiveRankArray.reduce((acc, rank) => acc + rank, 0);

    const name = getPlayerNameById(el.member_id, members);
    return { ...el, winCount, name, topFiveRank };
  });

  const sortedPlayersStats = statsWithWins.sort((a, b) => {
    if (b.topFiveRank === a.topFiveRank) {
      if (b.winCount === a.winCount) {
        return a.name.localeCompare(b.name);
      }
      return b.winCount - a.winCount;
    }
    return b.topFiveRank - a.topFiveRank;
  });

  let globalPosition = 1;
  let prevWinCount = sortedPlayersStats[0]?.winCount;
  let prevTopFiveRank = sortedPlayersStats[0]?.topFiveRank;

  sortedPlayersStats.forEach((player, index) => {
    if (player.winCount === prevWinCount && player.topFiveRank === prevTopFiveRank) {
      player.globalPosition = globalPosition;
    } else {
      globalPosition = index + 1;
      player.globalPosition = globalPosition;
    }

    prevWinCount = player.winCount;
    prevTopFiveRank = player.topFiveRank;
  });

  const handleBack = () => {
    navigate(`/tournaments/${tournamentId}/${year}`);
  };

  return (
    <>
      <Section>
        <TitleSection icon={"#icon-cup"} title={`${name} ${year} - Статистика`}>
          <Button onClick={handleBack}>
            <ButtonIconSvg>
              <use href={sprite + "#icon-undo"}></use>
            </ButtonIconSvg>
            Назад
          </Button>
        </TitleSection>

        <StatsInfoBar>
          Турнірів: {currentSeason?.stages?.length || 0} | {isMixt ? (mixSex === 'male' ? 'Чоловіків' : mixSex === 'female' ? 'Жінок' : 'Пар') : 'Учасників'}: {sortedPlayersStats.length}
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
            <StatsItem key={index} el={el} index={index} />
          ))}
        </List>
      </Section>
    </>
  );
};
