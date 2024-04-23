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
} from "./AppBar-styled";

import sprite from "../../sprite.svg";

export const AppBar = () => {
  const [flipped, setFlipped] = useState(false);
  const { transform } = useSpring({
    transform: `perspective(200px) rotateY(${flipped ? 360 : 0}deg)`,
    config: { mass: 10, tension: 200, friction: 40 },
  });
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
          <NavList>
            <NavItem>
              <NavLinkStyled to="/tournaments">
                <NavIconSvg>
                  <use href={sprite + "#icon-tournament"}></use>
                </NavIconSvg>
                Турніри
              </NavLinkStyled>
            </NavItem>

            <NavItem>
              <NavLinkStyled to="/members">
                <NavIconSvg>
                  <use href={sprite + "#icon-users"}></use>
                </NavIconSvg>
                Гравці
              </NavLinkStyled>
            </NavItem>

            <NavItem>
              <NavLinkStyled to="/gallery">
                <NavIconSvg>
                  <use href={sprite + "#icon-camera"}></use>
                </NavIconSvg>
                Галерея
              </NavLinkStyled>
            </NavItem>
          </NavList>
        </NavWrap>
      </Header>
    </>
  );
};
