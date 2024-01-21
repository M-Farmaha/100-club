import sprite from "../../sprite.svg";
import { LogoSvg, LogoWWrap } from "./Logo-styled";

export const Logo = () => {
  return (
    <>
      <LogoWWrap>
        <LogoSvg>
          <use href={sprite + "#logo-full"}></use>
        </LogoSvg>
      </LogoWWrap>
    </>
  );
};
