import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { format, differenceInYears } from "date-fns";
import ukLocale from "date-fns/locale/uk";

import {
  Avatar,
  AvatarWrap,
  DescriptionWrap,
  ModalContentWrap,
  Text,
} from "./Members-styled";

import { Modal } from "../Modal/Modal";
import { Portal } from "../../Routes/Portal/Portal";
import { membersApi } from "../../Api/ApiRequest";

export const MembersModal = () => {
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
  const experience = new Date().getFullYear() - joinTennisYear;

  window.onpopstate = () => {
    closeModal();
  };

  useEffect(() => {
    document.body.classList.add("modal-open");
    document.documentElement.classList.add("modal-open");

    const members = membersApi();
    const current = members.find((el) => String(el.id) === String(id));
    setCurrentMember(current);
  }, [id]);

  const closeModal = () => {
    document.body.classList.remove("modal-open");
    document.documentElement.classList.remove("modal-open");

    navigate("/members");
    window.scrollTo(0, scrollPosition);
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
              <ModalContentWrap>
                <AvatarWrap>
                  <Avatar sex={sex} src={avatar} alt={name} loading="lazy" />
                </AvatarWrap>

                <DescriptionWrap>
                  <Text>
                    <span>Ім'я:</span> {name}
                  </Text>
                  <Text>
                    <span>Категорія:</span> {type}
                  </Text>
                  <Text>
                    <span>Дата народження:</span>
                    {format(new Date(birthDate), " d MMMM yyyyр.", {
                      locale: ukLocale,
                    })}
                  </Text>
                  <Text>
                    <span>Вік:</span> {age} {getAgeSuffix(age)}
                  </Text>
                  <Text>
                    <span>Рідне місто:</span> {hometown}
                  </Text>
                  <Text>
                    <span>
                      {`Вперше ${
                        sex === "male" ? "спробував" : "спробувала"
                      } теніс: `}
                    </span>
                    {experience} р. тому
                  </Text>
                  <Text>
                    <span>Форхенд:</span> {forhand}
                  </Text>
                  <Text>
                    <span>Бекхенд:</span> {backhand}
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
