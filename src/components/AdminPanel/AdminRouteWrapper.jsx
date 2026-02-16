import { Outlet } from "react-router-dom";

export const AdminRouteWrapper = ({ children }) => {
  // Auth clearing is handled in Layout.jsx when navigating away from /admin
  return children || <Outlet />;
};
