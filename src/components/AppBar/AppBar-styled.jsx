import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Header = styled.header`
  height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 15px 0px;
  transition: var(--main-transition);
  display: flex;
  justify-content: center;
`;

export const NavWrap = styled.nav`
  padding-left: 24px;
  padding-right: 24px;
  max-width: 1200px;
  width: 1200px;
  min-width: 100px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;

export const NavList = styled.ul`
  height: 100%;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

export const NavItem = styled.li`
  height: 100%;
`;

export const NavLinkStyled = styled(NavLink)`
  font-family: "Manrope";
  font-size: 18px;
  font-style: normal;
  font-weight: 900;
  line-height: 24px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--primary-black-color);
  text-decoration: none;
  transition: var(--main-transition);

  &:hover {
    color: var(--accent-hover-color);
  }

  &.active {
    color: var(--accent-hover-color);
    cursor: default;
  }
`;
