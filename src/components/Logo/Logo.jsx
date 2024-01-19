import sprite from "../../sprite.svg";
import { LogoSvg } from "./Logo-styled";

export const Logo = () => {
  return (
    <>
      <LogoSvg>
        <use href={sprite + "#logo-full"}></use>
      </LogoSvg>
    </>
  );
};
