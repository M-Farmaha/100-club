import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const HeaderBaseBG = styled.div`
  height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: -999;
  background: linear-gradient(
    to right,
    var(--secondary-black-color),
    var(--primary-black-color),
    var(--secondary-black-color)
  );
`;

export const HeaderBlurFilter = styled.div`
  height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 998;
  backdrop-filter: blur(8px);
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
      rgba(0, 0, 0, 0.1),
      rgba(151, 211, 0, 0.6),
      rgba(0, 0, 0, 0.1)
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

export const MobileBackdrop = styled.div`
  display: none;

  @media screen and (max-width: 576px) {
    display: ${({ isMobileMenuOpen }) => (isMobileMenuOpen ? "block" : "none")};

    position: fixed;
    z-index: 999;
    background-color: transparent;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
`;

export const NavList = styled.ul`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  @media screen and (max-width: 576px) {
    transform: translateX(100%);

    position: fixed;
    z-index: 1000;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    max-width: 300px;

    padding: 100px 24px;

    flex-direction: column;
    justify-content: left;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);

    transition: var(--main-transition);

    transform: ${({ isMobileMenuOpen }) =>
      isMobileMenuOpen ? "translateX(0%)" : "translateX(100%)"};
  }
`;

export const NavItem = styled.li`
  height: 100%;

  @media screen and (max-width: 576px) {
    width: 100%;
    height: 50px;
  }
`;

export const NavLinkStyled = styled(NavLink)`
  position: relative;
  height: 100%;

  font-size: 18px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;

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

  @media screen and (max-width: 576px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;

    &:not(.logo):after {
      display: none;
    }

    &.active {
      &:not(.logo):after {
        display: none;
      }
    }
  }
`;

export const NavIconSvg = styled.svg`
  width: 20px;
  height: 20px;
  fill: currentColor;
`;

export const MobileMenuButton = styled.button`
  position: fixed;
  z-index: 1001;
  right: 0;
  top: 0;
  width: 72px;
  height: 100px;
  border: none;
  background-color: transparent;

  color: var(--primary-white-color);

  transition: var(--main-transition);

  &:hover {
    color: var(--accent-hover-color);
  }

  @media screen and (min-width: 576px) {
    display: none;
  }
`;

export const BurgerIconSvg = styled.svg`
  width: ${({ isMobileMenuOpen }) => (isMobileMenuOpen ? "24px" : "30px")};
  height: ${({ isMobileMenuOpen }) => (isMobileMenuOpen ? "24px" : "30px")};
  fill: currentColor;

  /* transition: var(--main-transition); */
`;
