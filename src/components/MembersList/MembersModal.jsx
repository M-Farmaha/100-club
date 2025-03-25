import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { differenceInYears } from "date-fns";

import { Avatar, AvatarWrap, DescriptionWrap, ModalContentWrap, Text } from "./Members-styled";

import { Modal } from "../Modal/Modal";
import { Portal } from "../../Routes/Portal/Portal";
import { useStateContext } from "../../state/stateContext";
import { getUkrLocaleDate } from "../../helpers/getUkrLocaleDate";
import { optionsByBackhand, optionsByForhand, optionsBySex, optionsByType } from "../../constants/constants";

export const MembersModal = () => {
  const { globalState } = useStateContext();
  const { members } = globalState;

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
    navigate("/members");
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
                    <span>{`Вперше ${sex === optionsBySex.male.id ? "спробував" : "спробувала"} теніс: `}</span>
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
                </DescriptionWrap>
              </ModalContentWrap>
            </>
          )}
        </Modal>
      </Portal>
    </>
  );
};
