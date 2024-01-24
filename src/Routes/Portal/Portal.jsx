import { createPortal } from "react-dom";

const portal = document.getElementById("portal");

export const Portal = ({ children }) => {
  return createPortal(children, portal);
};
