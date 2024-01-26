import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const HeaderFilter = styled.div`
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -999;
  
  backdrop-filter: blur(8px);
  background-color: var(--primary-black-color);
`;

export const Header = styled.header`
  height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;

  display: flex;
  justify-content: center;

  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.5),
    rgba(18, 31, 64, 0.5),
    rgba(0, 0, 0, 0.5)
  );

  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 15px 0px;
  border-bottom: 1px solid;
  border-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.5),
      rgba(151, 211, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    )
    1;

  transition: var(--main-transition);
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
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const NavItem = styled.li`
  height: 100%;
`;

export const NavLinkStyled = styled(NavLink)`
  position: relative;
  font-family: "Manrope";
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--primary-white-color);

  transition: var(--main-transition);

  &:not(.logo):after {
    content: "";
    display: block;
    position: absolute;
    bottom: -1px;
    width: 100%;
    height: 5px;

    background-color: var(--accent-hover-color);

    transform-origin: left;
    transform: scaleX(0);
    transition: var(--main-transition);
  }

  &:hover {
    color: var(--accent-hover-color);

    &::after {
      transform: scaleX(1);
    }
  }

  &.active {
    color: var(--accent-hover-color);
    cursor: default;

    &:not(.logo):after {
      content: "";
      display: block;
      position: absolute;
      bottom: -1px;
      width: 100%;
      height: 5px;

      background-color: var(--accent-hover-color);
      transform: scaleX(1);
    }
  }
`;

export const NavIconSvg = styled.svg`
  width: 20px;
  height: 20px;
  fill: currentColor;
`;
