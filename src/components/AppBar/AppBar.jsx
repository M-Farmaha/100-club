import {
  NavItem,
  NavLinkStyled,
  NavList,
  NavWrap,
  Logo,
  Header,
} from "./AppBar-styled";

export const AppBar = () => {
  return (
    <>
      <Header>
        <NavWrap>
          <Logo>100 Club</Logo>
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
