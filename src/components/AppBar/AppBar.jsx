import { Logo } from "../Logo/Logo";
import {
  NavItem,
  NavLinkStyled,
  NavList,
  NavWrap,
  Header,
} from "./AppBar-styled";

export const AppBar = () => {
  return (
    <>
      <Header>
        <NavWrap>
          <NavLinkStyled to="/">
            <Logo />
          </NavLinkStyled>
          <NavList>
            <NavItem>
              <NavLinkStyled to="/members">Учасники</NavLinkStyled>
            </NavItem>

            <NavItem>
              <NavLinkStyled to="/gallery">Галерея</NavLinkStyled>
            </NavItem>
          </NavList>
        </NavWrap>
      </Header>
    </>
  );
};
