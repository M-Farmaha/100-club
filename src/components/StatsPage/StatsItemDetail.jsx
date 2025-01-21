import sprite from "../../sprite.svg";

import { useLocation, useNavigate } from "react-router-dom";
import { TitleSection } from "../TitleSection/TitleSection";
import { Button, ButtonIconSvg } from "./StatsPage-styled";
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
  const memberId = parts[4];

  const { stages = [] } = tournaments?.find((t) => t.id === tournamentId) || {};

  const playerStats = stages
    ?.flatMap((stage) => stage.players)
    .filter((player) => player.member_id === memberId)
    .reduce(
      (acc, player) => {
        const { win, defeat, position } = player;

        acc.win += win;
        acc.defeat += defeat;
        acc.position.push(position);

        return acc;
      },
      { member_id: memberId, win: 0, defeat: 0, position: [] }
    );

  const winCount = playerStats.position.filter((pos) => pos === 1).length;
  const rankArray = playerStats.position.map((pos) => defineRank(pos));
  const totalRank = rankArray.reduce((acc, rank) => acc + rank, 0);
  const averageRank = (totalRank / playerStats.position.length).toFixed(2);
  const name = getPlayerNameById(playerStats.member_id, members);

  const handleBack = () => {
    navigate(`/tournaments/${tournamentId}/stats`);
  };

  return (
    <>
      <TitleSection icon={"#icon-user"} title={name} memberId={memberId}>
        <Button onClick={handleBack}>
          <ButtonIconSvg>
            <use href={sprite + "#icon-undo"}></use>
          </ButtonIconSvg>
          Назад
        </Button>
      </TitleSection>
    </>
  );
};
