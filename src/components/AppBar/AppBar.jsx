import { useState } from "react";
import { useSpring, a } from "@react-spring/web";

import { Logo } from "../Logo/Logo";
import {
  NavItem,
  NavLinkStyled,
  NavList,
  NavWrap,
  Header,
  NavIconSvg,
  HeaderBlurFilter,
  HeaderBaseBG,
  MobileBackdrop,
  MobileMenuButton,
  BurgerIconSvg,
} from "./AppBar-styled";

import sprite from "../../sprite.svg";

export const AppBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [flipped, setFlipped] = useState(false);
  const { transform } = useSpring({
    transform: `perspective(200px) rotateY(${flipped ? 360 : 0}deg)`,
    config: { mass: 10, tension: 200, friction: 40 },
  });

  const closeMobileMenu = () => {
    document.body.classList.remove("modal-open");
    setIsMobileMenuOpen(false);
  };

  const openMobileMenu = () => {
    document.body.classList.add("modal-open");
    setIsMobileMenuOpen(true);
  };

  return (
    <>
      <HeaderBaseBG />
      <HeaderBlurFilter />
      <Header>
        <NavWrap>
          <a.div
            style={{
              transform,
              rotateY: "360deg",
              width: "80px",
            }}
          >
            <NavLinkStyled
              to="/"
              className="logo"
              onClick={() => setFlipped((state) => !state)}
            >
              <Logo />
            </NavLinkStyled>
          </a.div>

          <NavList isMobileMenuOpen={isMobileMenuOpen}>
            <NavItem>
              <NavLinkStyled to="/tournaments" onClick={closeMobileMenu}>
                <NavIconSvg>
                  <use href={sprite + "#icon-cup"}></use>
                </NavIconSvg>
                Турніри
              </NavLinkStyled>
            </NavItem>

            <NavItem>
              <NavLinkStyled to="/members" onClick={closeMobileMenu}>
                <NavIconSvg>
                  <use href={sprite + "#icon-users"}></use>
                </NavIconSvg>
                Гравці
              </NavLinkStyled>
            </NavItem>

            <NavItem>
              <NavLinkStyled to="/gallery" onClick={closeMobileMenu}>
                <NavIconSvg>
                  <use href={sprite + "#icon-camera"}></use>
                </NavIconSvg>
                Галерея
              </NavLinkStyled>
            </NavItem>
          </NavList>

          <MobileMenuButton
            type="button"
            onClick={isMobileMenuOpen ? closeMobileMenu : openMobileMenu}
          >
            <BurgerIconSvg isMobileMenuOpen={isMobileMenuOpen}>
              <use
                href={
                  sprite + (isMobileMenuOpen ? "#icon-close" : "#icon-burger")
                }
              ></use>
            </BurgerIconSvg>
          </MobileMenuButton>

          <MobileBackdrop
            isMobileMenuOpen={isMobileMenuOpen}
            onClick={closeMobileMenu}
          />
        </NavWrap>
      </Header>
    </>
  );
};
