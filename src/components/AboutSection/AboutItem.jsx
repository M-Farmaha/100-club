import { useEffect, useState } from "react";
// import { useSpring, a } from "@react-spring/web";

import { AboutIconSvg, Item, SubTitle, TitleH3 } from "./AboutSection-styled";
import sprite from "../../sprite.svg";

export const AboutItem = ({ item, index }) => {
  const { id, icon, title, text } = item;
  const [isVisible, setIsVisible] = useState(false);

  const even = index % 2 === 0;

//   const { transform } = useSpring({
//     transform: isVisible ? "translateX(0%)" : even ? "translateX(-100%)" : "translateX(100%)",
//   });

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(id);
      const rect = element.getBoundingClientRect();
      const visible = rect.top <= window.innerHeight && rect.bottom >= 0;

      setIsVisible(visible);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [id]);

  return (
    <>
      {/* <a.div style={{transform}}> */}
        <Item id={id} isVisible={isVisible} even={even}>
          <AboutIconSvg>
            <use href={sprite + icon}></use>
          </AboutIconSvg>
          <TitleH3>{title}</TitleH3>
          <SubTitle>{text}</SubTitle>
        </Item>
      {/* </a.div> */}
    </>
  );
};
