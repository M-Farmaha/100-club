import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "modern-normalize";

import App from "./App.jsx";
import { StateProvider } from "./state/stateContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </React.StrictMode>
);
