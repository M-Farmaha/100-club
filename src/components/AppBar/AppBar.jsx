import { useState } from "react";
import { useSpring, a } from "@react-spring/web";

import { Logo } from "../Logo/Logo";
import {
  NavItem,
  NavLinkStyled,
  NavList,
  NavWrap,
  Header,
} from "./AppBar-styled";

export const AppBar = () => {
  const [flipped, setFlipped] = useState(false);
  const { transform } = useSpring({
    transform: `perspective(200px) rotateY(${flipped ? 360 : 0}deg)`,
    config: { mass: 10, tension: 200, friction: 40 },
  });
  return (
    <>
      <Header>
        <NavWrap>
          <a.div
            style={{
              transform,
              rotateY: "360deg",
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
