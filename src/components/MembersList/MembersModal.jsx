import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { differenceInYears } from "date-fns";

import { Avatar, AvatarWrap, DescriptionWrap, ModalContentWrap, Table, Text } from "./Members-styled";

import { Modal } from "../Modal/Modal";
import { Portal } from "../../Routes/Portal/Portal";
import { useStateContext } from "../../state/stateContext";
import { getUkrLocaleDate } from "../../helpers/getUkrLocaleDate";
import { optionsByBackhand, optionsByForhand, optionsBySex, optionsByType } from "../../constants/constants";

export const MembersModal = () => {
  const { globalState } = useStateContext();
  const { members, tournaments } = globalState;

  const { id } = useParams();
  const navigate = useNavigate();

  const { state } = useLocation();
  const scrollPosition = state?.scrollPosition || 0;

  const [currentMember, setCurrentMember] = useState(null);

  const {
    birthDate = null,
    joinTennisYear = null,
    name = null,
    avatar = null,
    type = null,
    hometown = null,
    forhand = null,
    backhand = null,
    sex = null,
    category = null,
  } = currentMember || {};

  const age = differenceInYears(new Date(), new Date(birthDate));
  const experience = joinTennisYear ? `${new Date().getFullYear() - joinTennisYear} р. тому` : "Невідомо";

  const birth = new Date(birthDate);
  const today = new Date();
  const isTodayBirthDay = birth.getDate() === today.getDate() && birth.getMonth() === today.getMonth();

  const isMale = sex === optionsBySex.male.id;

  useEffect(() => {
    document.body.classList.add("modal-open");
    document.documentElement.classList.add("modal-open");

    const current = members?.find((el) => String(el.id) === String(id));
    setCurrentMember(current);

    return () => {
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
      window.scrollTo(0, scrollPosition);
    };
  }, [id, members, scrollPosition]);

  const closeModal = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/members", { replace: true });
    }
  };

  const getAgeSuffix = (age) => {
    if (age >= 11 && age <= 14) {
      return "років";
    } else {
      const lastDigit = age % 10;
      switch (lastDigit) {
        case 1:
          return "рік";
        case 2:
        case 3:
        case 4:
          return "роки";
        default:
          return "років";
      }
    }
  };

  const countMemberTournaments = () => {
    let singleParticipate = 0;
    let singleTournamentsWins = 0;
    let singleWins = 0;
    let singleDefeats = 0;

    let mixParticipate = 0;
    let mixTournamentsWins = 0;
    let mixWins = 0;
    let mixDefeats = 0;

    tournaments.forEach((tournament) => {
      tournament.stages.forEach((stage) => {
        let playedSingle = false;
        let playedMix = false;

        stage.players.forEach((player) => {
          if (player.member_id.includes(currentMember?.id)) {
            if (player.member_id.length === 1) {
              playedSingle = true;
              singleWins += player.win || 0;
              singleDefeats += player.defeat || 0;
              if (player.position === 1) singleTournamentsWins++;
            } else if (player.member_id.length === 2) {
              playedMix = true;
              mixWins += player.win || 0;
              mixDefeats += player.defeat || 0;
              if (player.position === 1) mixTournamentsWins++;
            }
          }
        });

        if (playedSingle) singleParticipate++;
        if (playedMix) mixParticipate++;
      });
    });

    const singleTotalGames = singleWins + singleDefeats;
    const mixTotalGames = mixWins + mixDefeats;

    const singleWinPercent = singleTotalGames ? ((singleWins / singleTotalGames) * 100).toFixed(1) : 0;
    const singleDefeatPercent = singleTotalGames ? ((singleDefeats / singleTotalGames) * 100).toFixed(1) : 0;

    const mixWinPercent = mixTotalGames ? ((mixWins / mixTotalGames) * 100).toFixed(1) : 0;
    const mixDefeatPercent = mixTotalGames ? ((mixDefeats / mixTotalGames) * 100).toFixed(1) : 0;

    const totalParticipate = singleParticipate + mixParticipate;
    const totalTournamentsWins = singleTournamentsWins + mixTournamentsWins;
    const totalWins = singleWins + mixWins;
    const totalDefeats = singleDefeats + mixDefeats;
    const totalGames = totalWins + totalDefeats;

    const totalWinPercent = totalGames ? ((totalWins / totalGames) * 100).toFixed(1) : 0;
    const totalDefeatPercent = totalGames ? ((totalDefeats / totalGames) * 100).toFixed(1) : 0;

    return {
      singleParticipate,
      mixParticipate,
      singleTournamentsWins,
      mixTournamentsWins,
      singleWins,
      singleDefeats,
      mixWins,
      mixDefeats,
      singleWinPercent,
      singleDefeatPercent,
      mixWinPercent,
      mixDefeatPercent,
      totalParticipate,
      totalTournamentsWins,
      totalWins,
      totalDefeats,
      totalWinPercent,
      totalDefeatPercent,
    };
  };
  const stats = countMemberTournaments();
  const showTable = Object.values(stats).some((value) => value > 0);

  const rows = [
    { label: "Одиночний", key: "single" },
    { label: "Парний", key: "mix" },
    { label: "Разом", key: "total" },
  ];
  const headers = [
    { id: "label", title: "Тип турніру" },
    { id: "Participate", title: "Кількість турнірів" },
    { id: "TournamentsWins", title: "Виграні турніри" },
    { id: "Wins", title: "Перемоги у матчах" },
    { id: "WinPercent", title: "Відсоток перемог" },
    { id: "Defeats", title: "Поразки у матчах" },
    { id: "DefeatPercent", title: "Відсоток поразок" },
  ];

  return (
    <>
      <Portal>
        <Modal closeModal={closeModal}>
          {currentMember && (
            <>
              <ModalContentWrap isTodayBirthDay={isTodayBirthDay}>
                <AvatarWrap>
                  <Avatar sex={sex} src={avatar} alt={name} loading="lazy" />
                </AvatarWrap>

                <DescriptionWrap>
                  <Text>
                    <span>Ім'я:</span> {name}
                  </Text>
                  <Text>
                    <span>Категорія:</span> {optionsByType[type].title}
                  </Text>
                  <Text>
                    <span>Дата народження:</span>
                    {getUkrLocaleDate(birthDate)}
                  </Text>
                  <Text>
                    <span>Вік:</span>
                    {birthDate ? ` ${age} ${getAgeSuffix(age)}` : " Heвідомо"}
                    {isTodayBirthDay && " (виповнилось сьогодні)"}
                  </Text>
                  <Text>
                    <span>Рідне місто:</span> {hometown || " Heвідомо"}
                  </Text>
                  <Text>
                    <span>{`Вперше ${isMale ? "спробував" : "спробувала"} теніс: `}</span>
                    {experience}
                  </Text>
                  <Text>
                    <span>Форхенд:</span> {optionsByForhand[forhand].title}
                  </Text>
                  <Text>
                    <span>Бекхенд:</span> {optionsByBackhand[backhand].title}
                  </Text>

                  {category && (
                    <Text>
                      <span>Спортивний розряд:</span> {category}
                    </Text>
                  )}

                  <br />

                  {showTable ? (
                    <>
                      <Text>Персональна турнірна статистика:</Text>
                      <Table>
                        <tbody>
                          {headers.map((header) => (
                            <tr key={header.id}>
                              <td style={{ textAlign: "left" }}>{header.title}</td>
                              {rows.map((row) => {
                                const value = header.id === "label" ? row.label : stats[`${row.key}${header.id}`];
                                return (
                                  <td key={row.key}>
                                    {value}
                                    {(header.id === "WinPercent" || header.id === "DefeatPercent") && "%"}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <Text>
                        <span>* Сформовано на основі даних турнірів клубу від 2023р.</span>
                      </Text>
                    </>
                  ) : (
                    <Text>
                      Не {isMale ? "приймав" : "приймала"} участь в турнірах клубу
                      <br />
                      <span>(за даними від 2023р.)</span>
                    </Text>
                  )}
                </DescriptionWrap>
              </ModalContentWrap>
            </>
          )}
        </Modal>
      </Portal>
    </>
  );
};
