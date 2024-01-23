import { useEffect, useState } from "react";
import { ArrowIconSvg, Button } from "./ScrollToTopButton-styled";

import sprite from "../../sprite.svg";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [buttonScrollBottom, setButtonScrollBottom] = useState(20);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    console.log(scrollTop);
    const scrollBottom =
      document.documentElement.scrollHeight -
      window.innerHeight -
      window.scrollY;

    if (scrollBottom < 100) {
      setButtonScrollBottom(120);
    } else {
      setButtonScrollBottom(20);
    }

    if (scrollTop > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <Button
        type="button"
        onClick={scrollToTop}
        buttonScrollBottom={buttonScrollBottom}
      >
        <ArrowIconSvg>
          <use href={sprite + "#icon-arrow"}></use>
        </ArrowIconSvg>
      </Button>
    )
  );
};
