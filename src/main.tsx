import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import AppContextProvider from "./AppContextProvider.tsx";
import MenuBar from "./MenuBar.tsx";
import "./App.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContextProvider>
      <MenuBar />
      <App />
    </AppContextProvider>
  </StrictMode>,
);
