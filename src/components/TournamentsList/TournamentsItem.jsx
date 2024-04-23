import { useNavigate } from "react-router-dom";
import { TournamentLogo } from "../Logo/Logo";
import {
  Item,
  MembersItemText,
  MembersItemWrap,
} from "./TournamentsList-styled";

export const TournamentsItem = ({ el, index }) => {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(el.id, { state: { stages: el.stages } });
  };

  return (
    <>
      <Item id={el.id} onClick={handleItemClick}>
        <MembersItemWrap>
          <MembersItemText>{index + 1}.</MembersItemText>
          <TournamentLogo path={el.logo} />
          <MembersItemText>{el.name}</MembersItemText>
          <MembersItemText>{el.status}</MembersItemText>
        </MembersItemWrap>
      </Item>
    </>
  );
};
