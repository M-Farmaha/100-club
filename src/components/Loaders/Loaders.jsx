import { LoaderSvg, LoaderWWrap } from "./Loaders-styled";
import sprite from "../../sprite.svg";

export const Loader = () => {
  return (
    <>
      <LoaderWWrap>
        <LoaderSvg>
          <use href={sprite + "#logo-full"}></use>
        </LoaderSvg>
      </LoaderWWrap>
    </>
  );
};
