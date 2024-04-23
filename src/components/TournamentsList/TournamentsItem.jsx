import { TournamentLogo } from "../Logo/Logo";
import {
  Item,
  MembersItemText,
  MembersItemWrap,
} from "./TournamentsList-styled";

export const TournamentsItem = ({ el, index }) => {
  return (
    <>
      <Item id={el.id}>
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
