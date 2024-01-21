import { useState } from "react";
import sprite from "../../sprite.svg";
import { LogoSvg, LogoWWrap } from "./Logo-styled";
import { useSpring, a } from "@react-spring/web";

export const Logo = () => {
  const [flipped, setFlipped] = useState(false);
  const { transform } = useSpring({
    transform: `perspective(200px) rotateX(${flipped ? 360 : 0}deg)`,
    config: { mass: 10, tension: 200, friction: 40 },
  });

  return (
    <>
      <a.div
        style={{
          transform,
          rotateX: "360deg",
          width: "80px",
          height: "80px",
          transformStyle: "preserve-3d",
        }}
      >
        <LogoWWrap onClick={() => setFlipped((state) => !state)}>
          <LogoSvg>
            <use href={sprite + "#logo-full"}></use>
          </LogoSvg>
        </LogoWWrap>
      </a.div>
    </>
  );
};
