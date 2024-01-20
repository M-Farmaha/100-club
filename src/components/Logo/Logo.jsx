import { useState } from "react";
import {  LogoWWrap } from "./Logo-styled";
import { useSpring, a } from "@react-spring/web";

export const Logo = () => {
  const [flipped, setFlipped] = useState(false);
  const { transform } = useSpring({
    transform: `perspective(200px) rotateY(${flipped ? 360 : 0}deg)`,
    config: { mass: 10, tension: 200, friction: 40 },
  });

  return (
    <>
      <a.div
        style={{
          transform,
          rotateY: "360deg",
          width: "80px",
          height: "80px",
        }}
      >
        <LogoWWrap onClick={() => setFlipped((state) => !state)}>
          <p>1</p>
        </LogoWWrap>
      </a.div>
    </>
  );
};
