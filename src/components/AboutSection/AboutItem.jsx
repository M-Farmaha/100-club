import { useEffect, useState } from "react";
import { useSpring, a } from "@react-spring/web";

import { AboutIconSvg, Item, SubTitle, TitleH3 } from "./AboutSection-styled";
import sprite from "../../sprite.svg";

export const AboutItem = ({ item }) => {
  const { id, icon, title, text } = item;
  const [isVisible, setIsVisible] = useState(false);

  const props = useSpring({
    transform: isVisible ? "translateX(0%)" : "translateX(-100%)",

  });

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
      <a.div style={props}>
        <Item id={id}>
          <AboutIconSvg>
            <use href={sprite + icon}></use>
          </AboutIconSvg>
          <TitleH3>{title}</TitleH3>
          <SubTitle>{text}</SubTitle>
        </Item>
      </a.div>
    </>
  );
};
